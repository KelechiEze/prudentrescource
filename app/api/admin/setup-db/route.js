// app/api/admin/setup-database/route.js
import { NextResponse } from "next/server";
import { db } from "@/app/api/lib/mysql";
import fs from 'fs';
import path from 'path';

export async function POST() {
  let connection;
  try {
    console.log("🚀 Starting database setup from set.sql file...");

    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'set.sql');
    
    if (!fs.existsSync(sqlFilePath)) {
      return NextResponse.json(
        { 
          message: "SQL file not found at: " + sqlFilePath,
          currentDirectory: process.cwd()
        },
        { status: 404 }
      );
    }

    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log("📄 SQL file read successfully, length:", sqlContent.length);

    // Get a connection from the pool
    connection = await db.getConnection();
    console.log("🔗 Database connection established");

    // Parse SQL content properly - handle multi-line statements
    const sqlStatements = parseSQLStatements(sqlContent);
    console.log(`📊 Found ${sqlStatements.length} SQL statements to execute`);

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    // Execute each SQL statement sequentially
    for (let i = 0; i < sqlStatements.length; i++) {
      const sql = sqlStatements[i];
      
      try {
        console.log(`🔄 Executing statement ${i + 1}/${sqlStatements.length}`);
        console.log(`   Type: ${getStatementType(sql)}`);
        
        // Skip SELECT statements for verification (they'll fail if tables don't exist)
        if (sql.trim().toUpperCase().startsWith('SELECT')) {
          console.log(`⏭️  Skipping SELECT statement`);
          continue;
        }

        // Skip USE statements (database is already selected in connection)
        if (sql.trim().toUpperCase().startsWith('USE ')) {
          console.log(`⏭️  Skipping USE statement`);
          continue;
        }
        
        // Execute the statement
        const [result] = await connection.execute(sql);
        
        results.push({
          statement: i + 1,
          type: getStatementType(sql),
          status: 'success'
        });
        successCount++;
        
        console.log(`✅ Statement ${i + 1} executed successfully`);
        
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message);
        results.push({
          statement: i + 1,
          type: getStatementType(sql),
          status: 'error',
          error: error.message,
          sqlPreview: sql.substring(0, 100) + '...'
        });
        errorCount++;
        
        // If it's a foreign key error due to missing parent table, continue
        if (error.message.includes('referenced table') || error.message.includes('foreign key constraint')) {
          console.log("⚠️ Foreign key error - continuing with next statements...");
        } else {
          console.log("⚠️ Continuing with next statements...");
        }
      }
    }

    connection.release();
    console.log("🔓 Database connection released");

    // Verify the setup
    const verificationResults = await verifyDatabaseSetup();

    return NextResponse.json({
      message: "Database setup completed!",
      summary: {
        totalStatements: sqlStatements.length,
        success: successCount,
        errors: errorCount,
        successRate: `${((successCount / sqlStatements.length) * 100).toFixed(1)}%`
      },
      verification: verificationResults,
      executedStatements: results
    });

  } catch (error) {
    console.error("💥 Database setup error:", error);
    
    if (connection) {
      try {
        connection.release();
      } catch (releaseError) {
        console.error("Error releasing connection:", releaseError);
      }
    }

    return NextResponse.json(
      { 
        message: "Database setup failed",
        error: error.message
      },
      { status: 500 }
    );
  }
}

// Proper SQL statement parser that handles multi-line statements
function parseSQLStatements(sqlContent) {
  const statements = [];
  let currentStatement = '';
  let inString = false;
  let stringChar = '';
  let inComment = false;
  let commentType = ''; // '--' or '/*'

  for (let i = 0; i < sqlContent.length; i++) {
    const char = sqlContent[i];
    const nextChar = sqlContent[i + 1] || '';

    // Handle comments
    if (!inString && !inComment) {
      if (char === '-' && nextChar === '-') {
        inComment = true;
        commentType = '--';
        i++; // Skip next dash
        continue;
      } else if (char === '/' && nextChar === '*') {
        inComment = true;
        commentType = '/*';
        i++; // Skip next star
        continue;
      }
    }

    // Handle string literals
    if (!inComment && (char === "'" || char === '"' || char === '`')) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        // Check if it's escaped
        if (sqlContent[i - 1] !== '\\') {
          inString = false;
          stringChar = '';
        }
      }
    }

    // Handle comment endings
    if (inComment) {
      if (commentType === '--' && char === '\n') {
        inComment = false;
        commentType = '';
      } else if (commentType === '/*' && char === '*' && nextChar === '/') {
        inComment = false;
        commentType = '';
        i++; // Skip next slash
      }
      continue;
    }

    // If we're in a string or comment, just add the character
    if (inString || inComment) {
      currentStatement += char;
      continue;
    }

    // Check for statement end (semicolon not in string/comment)
    if (char === ';' && !inString && !inComment) {
      const trimmed = currentStatement.trim();
      if (trimmed.length > 0) {
        statements.push(trimmed);
      }
      currentStatement = '';
    } else {
      currentStatement += char;
    }
  }

  // Add the last statement if there is one
  const lastStatement = currentStatement.trim();
  if (lastStatement.length > 0) {
    statements.push(lastStatement);
  }

  return statements;
}

// Helper function to determine statement type
function getStatementType(sql) {
  const upperSql = sql.toUpperCase().trim();
  if (upperSql.startsWith('CREATE')) return 'CREATE';
  if (upperSql.startsWith('INSERT')) return 'INSERT';
  if (upperSql.startsWith('DROP')) return 'DROP';
  if (upperSql.startsWith('ALTER')) return 'ALTER';
  if (upperSql.startsWith('SELECT')) return 'SELECT';
  if (upperSql.startsWith('USE')) return 'USE';
  return 'OTHER';
}

// Helper function to verify database setup
async function verifyDatabaseSetup() {
  const tables = [
    'tracks', 'categories', 'facilitator_tracks', 'courses', 
    'lessons', 'learner_tracks', 'lesson_progress', 'quizzes', 
    'resources', 'assignments'
  ];

  const verification = [];
  let totalRecords = 0;

  for (const table of tables) {
    try {
      const [rows] = await db.execute(`SELECT COUNT(*) as count FROM ${table}`);
      const count = parseInt(rows[0].count);
      totalRecords += count;
      verification.push({
        table,
        recordCount: count,
        status: 'success'
      });
    } catch (error) {
      verification.push({
        table,
        recordCount: 0,
        status: 'error',
        error: error.message
      });
    }
  }

  return { tables: verification, totalRecords };
}

// GET endpoint to check current database status
export async function GET() {
  try {
    const { tables, totalRecords } = await verifyDatabaseSetup();
    
    const existingTables = tables.filter(t => t.status === 'success');
    const missingTables = tables.filter(t => t.status === 'error');
    
    return NextResponse.json({
      message: "Database status check completed",
      summary: {
        totalTables: tables.length,
        existingTables: existingTables.length,
        missingTables: missingTables.length,
        totalRecords
      },
      tables,
      existingTables: existingTables.map(t => t.table),
      missingTables: missingTables.map(t => t.table)
    });
  } catch (error) {
    console.error("Database status check error:", error);
    return NextResponse.json(
      { 
        message: "Error checking database status",
        error: error.message 
      },
      { status: 500 }
    );
  }
}