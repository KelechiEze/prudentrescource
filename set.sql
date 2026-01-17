-- -- -- Create database if it doesn't exist
-- -- CREATE DATABASE IF NOT EXISTS `prudent_contact` 
-- -- CHARACTER SET utf8mb4 
-- -- COLLATE utf8mb4_unicode_ci;

-- -- USE `prudent_contact`;

-- -- -- Main contact submissions table
-- -- CREATE TABLE IF NOT EXISTS `contact_submissions` (
-- --   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
-- --   `full_name` VARCHAR(100) NOT NULL,
-- --   `email` VARCHAR(100) NOT NULL,
-- --   `phone_number` VARCHAR(20) DEFAULT NULL,
-- --   `message` TEXT NOT NULL,
-- --   `submitted_at` DATETIME NOT NULL,
-- --   `status` ENUM('pending', 'responded', 'archived') NOT NULL DEFAULT 'pending',
-- --   `response_notes` TEXT DEFAULT NULL,
-- --   `responded_at` DATETIME DEFAULT NULL,
-- --   `ip_address` VARCHAR(45) DEFAULT NULL,
-- --   `user_agent` TEXT DEFAULT NULL,
-- --   `email_sent` BOOLEAN DEFAULT false,
-- --   `admin_notified` BOOLEAN DEFAULT false,
-- --   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --   `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- --   PRIMARY KEY (`id`),
-- --   INDEX `idx_email` (`email`),
-- --   INDEX `idx_status` (`status`),
-- --   INDEX `idx_submitted_at` (`submitted_at`),
-- --   INDEX `idx_ip_address` (`ip_address`(20)),
-- --   INDEX `idx_created_at` (`created_at`),
-- --   INDEX `idx_email_status` (`email`, `status`),
-- --   FULLTEXT INDEX `idx_message` (`message`)
-- -- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
-- -- COMMENT='Contact form submissions from website';

-- -- -- Submission logs for audit and rate limiting
-- -- CREATE TABLE IF NOT EXISTS `submission_logs` (
-- --   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
-- --   `ip_address` VARCHAR(45) DEFAULT NULL,
-- --   `email` VARCHAR(100) DEFAULT NULL,
-- --   `success` BOOLEAN DEFAULT false,
-- --   `error_message` TEXT DEFAULT NULL,
-- --   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --   PRIMARY KEY (`id`),
-- --   INDEX `idx_ip_email` (`ip_address`(20), `email`),
-- --   INDEX `idx_created_at` (`created_at`),
-- --   INDEX `idx_success` (`success`)
-- -- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
-- -- COMMENT='Logs of all submission attempts';

-- -- -- Email logs for tracking
-- -- CREATE TABLE IF NOT EXISTS `email_logs` (
-- --   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
-- --   `submission_id` INT UNSIGNED DEFAULT NULL,
-- --   `recipient` VARCHAR(100) NOT NULL,
-- --   `subject` VARCHAR(200) NOT NULL,
-- --   `type` ENUM('confirmation', 'notification', 'response') NOT NULL,
-- --   `sent_at` DATETIME NOT NULL,
-- --   `message_id` VARCHAR(200) DEFAULT NULL,
-- --   `status` ENUM('sent', 'failed', 'delivered') DEFAULT 'sent',
-- --   `error_message` TEXT DEFAULT NULL,
-- --   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --   PRIMARY KEY (`id`),
-- --   INDEX `idx_submission_id` (`submission_id`),
-- --   INDEX `idx_recipient` (`recipient`),
-- --   INDEX `idx_sent_at` (`sent_at`),
-- --   INDEX `idx_type` (`type`),
-- --   FOREIGN KEY (`submission_id`) 
-- --     REFERENCES `contact_submissions`(`id`) 
-- --     ON DELETE SET NULL ON UPDATE CASCADE
-- -- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
-- -- COMMENT='Logs of all emails sent';

-- -- -- Update triggers for automatic status updates
-- -- DELIMITER $$

-- -- CREATE TRIGGER `after_submission_insert`
-- -- AFTER INSERT ON `contact_submissions`
-- -- FOR EACH ROW
-- -- BEGIN
-- --     -- Log the submission
-- --     INSERT INTO `submission_logs` (`ip_address`, `email`, `success`)
-- --     VALUES (NEW.ip_address, NEW.email, true);
-- -- END$$

-- -- CREATE TRIGGER `before_submission_update`
-- -- BEFORE UPDATE ON `contact_submissions`
-- -- FOR EACH ROW
-- -- BEGIN
-- --     -- Auto-set responded_at when status changes to 'responded'
-- --     IF NEW.status = 'responded' AND OLD.status != 'responded' THEN
-- --         SET NEW.responded_at = NOW();
-- --     END IF;
-- -- END$$

-- -- DELIMITER ;

-- -- -- Insert sample data for testing
-- -- INSERT INTO `contact_submissions` 
-- -- (`full_name`, `email`, `phone_number`, `message`, `submitted_at`, `status`, `ip_address`, `user_agent`, `email_sent`, `admin_notified`) 
-- -- VALUES
-- -- ('John Doe', 'john@example.com', '+1 (555) 123-4567', 'I am interested in your staffing services for our company. Can you provide more information about your process and pricing?', NOW() - INTERVAL 2 DAY, 'responded', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', true, true),
-- -- ('Jane Smith', 'jane.smith@example.com', NULL, 'Looking for information about your training programs for our HR department. We have about 50 employees who need professional development.', NOW() - INTERVAL 1 DAY, 'pending', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', true, true),
-- -- ('Robert Johnson', 'rob.j@business.com', '+1 (444) 555-6677', 'Quick question about your service areas. Do you provide staffing solutions nationwide or only in specific regions?', NOW() - INTERVAL 3 HOUR, 'pending', '192.168.1.102', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36', false, false);

-- -- -- Insert sample email logs
-- -- INSERT INTO `email_logs` 
-- -- (`submission_id`, `recipient`, `subject`, `type`, `sent_at`, `message_id`, `status`) 
-- -- VALUES
-- -- (1, 'john@example.com', 'Thank You for Contacting Prudent Resources', 'confirmation', NOW() - INTERVAL 2 DAY, '1234567890@mail.google.com', 'delivered'),
-- -- (1, 'info@prudentresources.com', 'New Contact Submission: John Doe', 'notification', NOW() - INTERVAL 2 DAY, '1234567891@mail.google.com', 'sent'),
-- -- (2, 'jane.smith@example.com', 'Thank You for Contacting Prudent Resources', 'confirmation', NOW() - INTERVAL 1 DAY, '1234567892@mail.google.com', 'delivered'),
-- -- (2, 'info@prudentresources.com', 'New Contact Submission: Jane Smith', 'notification', NOW() - INTERVAL 1 DAY, '1234567893@mail.google.com', 'sent');

-- -- -- Create a view for easy reporting
-- -- CREATE OR REPLACE VIEW `submission_summary` AS
-- -- SELECT 
-- --     DATE(submitted_at) as submission_date,
-- --     COUNT(*) as total_submissions,
-- --     SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
-- --     SUM(CASE WHEN status = 'responded' THEN 1 ELSE 0 END) as responded,
-- --     SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived,
-- --     AVG(LENGTH(message)) as avg_message_length
-- -- FROM `contact_submissions`
-- -- GROUP BY DATE(submitted_at)
-- -- ORDER BY submission_date DESC;

-- -- -- Create stored procedure for cleaning old data
-- -- DELIMITER $$

-- -- CREATE PROCEDURE `clean_old_submissions`(IN `days_to_keep` INT)
-- -- BEGIN
-- --     DECLARE `cutoff_date` DATE;
-- --     SET `cutoff_date` = DATE_SUB(CURDATE(), INTERVAL `days_to_keep` DAY);
    
-- --     -- Archive old submissions
-- --     UPDATE `contact_submissions`
-- --     SET `status` = 'archived'
-- --     WHERE `submitted_at` < `cutoff_date` 
-- --     AND `status` IN ('pending', 'responded');
    
-- --     -- Delete very old logs (older than 90 days by default)
-- --     DELETE FROM `submission_logs`
-- --     WHERE `created_at` < DATE_SUB(CURDATE(), INTERVAL 90 DAY);
    
-- --     -- Delete very old email logs (older than 90 days by default)
-- --     DELETE FROM `email_logs`
-- --     WHERE `created_at` < DATE_SUB(CURDATE(), INTERVAL 90 DAY);
    
-- --     SELECT 
-- --         ROW_COUNT() as rows_affected,
-- --         `cutoff_date` as cleanup_date;
-- -- END$$

-- -- DELIMITER ;

-- -- -- Create user-friendly functions
-- -- DELIMITER $$

-- -- CREATE FUNCTION `get_pending_count`() 
-- -- RETURNS INT
-- -- READS SQL DATA
-- -- BEGIN
-- --     DECLARE `count` INT;
-- --     SELECT COUNT(*) INTO `count` 
-- --     FROM `contact_submissions` 
-- --     WHERE `status` = 'pending';
-- --     RETURN `count`;
-- -- END$$

-- -- CREATE FUNCTION `get_today_submissions`() 
-- -- RETURNS INT
-- -- READS SQL DATA
-- -- BEGIN
-- --     DECLARE `count` INT;
-- --     SELECT COUNT(*) INTO `count` 
-- --     FROM `contact_submissions` 
-- --     WHERE DATE(`submitted_at`) = CURDATE();
-- --     RETURN `count`;
-- -- END$$

-- -- DELIMITER ;

-- -- -- Grant permissions (adjust as needed)
-- -- -- CREATE USER IF NOT EXISTS 'prudent_app'@'localhost' IDENTIFIED BY 'secure_password_here';
-- -- -- GRANT SELECT, INSERT, UPDATE ON `prudent_contact`.* TO 'prudent_app'@'localhost';
-- -- -- GRANT EXECUTE ON PROCEDURE `prudent_contact`.`clean_old_submissions` TO 'prudent_app'@'localhost';

-- -- -- Show table information
-- -- SELECT 
-- --     table_name,
-- --     table_rows,
-- --     avg_row_length,
-- --     data_length,
-- --     index_length,
-- --     (data_length + index_length) as total_size,
-- --     table_comment
-- -- FROM information_schema.tables 
-- -- WHERE table_schema = 'prudent_contact'
-- -- ORDER BY table_name;

-- -- -- Show initial data
-- -- SELECT 
-- --     'contact_submissions' as table_name,
-- --     COUNT(*) as row_count,
-- --     MIN(submitted_at) as earliest_submission,
-- --     MAX(submitted_at) as latest_submission
-- -- FROM contact_submissions
-- -- UNION ALL
-- -- SELECT 
-- --     'submission_logs',
-- --     COUNT(*),
-- --     MIN(created_at),
-- --     MAX(created_at)
-- -- FROM submission_logs
-- -- UNION ALL
-- -- SELECT 
-- --     'email_logs',
-- --     COUNT(*),
-- --     MIN(created_at),
-- --     MAX(created_at)
-- -- FROM email_logs;




-- -- -- Create resumes table with file content stored in database
-- -- CREATE TABLE IF NOT EXISTS resume_submissions (
-- --   id INT PRIMARY KEY AUTO_INCREMENT,
-- --   first_name VARCHAR(100) NOT NULL,
-- --   last_name VARCHAR(100) NOT NULL,
-- --   email VARCHAR(100) NOT NULL,
-- --   phone VARCHAR(20) NOT NULL,
-- --   city VARCHAR(100) NOT NULL,
-- --   state VARCHAR(100) NOT NULL,
-- --   position VARCHAR(200) NOT NULL,
-- --   has_cpr ENUM('yes', 'no') DEFAULT NULL,
  
-- --   -- Resume file stored in database
-- --   resume_file_name VARCHAR(255) NOT NULL,
-- --   resume_file_type VARCHAR(50) NOT NULL,
-- --   resume_file_size INT NOT NULL,
-- --   resume_file_content LONGBLOB NOT NULL, -- Stores the actual file
  
-- --   -- Certification file stored in database (optional)
-- --   cert_file_name VARCHAR(255) DEFAULT NULL,
-- --   cert_file_type VARCHAR(50) DEFAULT NULL,
-- --   cert_file_size INT DEFAULT NULL,
-- --   cert_file_content LONGBLOB DEFAULT NULL, -- Stores the actual file
  
-- --   comments TEXT,
-- --   ip_address VARCHAR(45),
-- --   user_agent TEXT,
-- --   submitted_at DATETIME NOT NULL,
-- --   status ENUM('pending', 'reviewed', 'contacted', 'rejected') DEFAULT 'pending',
-- --   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
-- --   INDEX idx_email (email),
-- --   INDEX idx_status (status),
-- --   INDEX idx_position (position(50)),
-- --   INDEX idx_submitted_at (submitted_at)
-- -- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- -- Create a view to check file sizes
-- -- CREATE OR REPLACE VIEW resume_file_stats AS
-- -- SELECT 
-- --   COUNT(*) as total_submissions,
-- --   SUM(resume_file_size) as total_resume_size_bytes,
-- --   ROUND(SUM(resume_file_size) / (1024*1024), 2) as total_resume_size_mb,
-- --   COALESCE(SUM(cert_file_size), 0) as total_cert_size_bytes,
-- --   ROUND(COALESCE(SUM(cert_file_size), 0) / (1024*1024), 2) as total_cert_size_mb,
-- --   AVG(resume_file_size) as avg_resume_size_bytes,
-- --   MAX(resume_file_size) as max_resume_size_bytes
-- -- FROM resume_submissions;

-- -- -- Create function to get file by ID
-- -- DELIMITER $$

-- -- CREATE FUNCTION get_resume_file(submission_id INT)
-- -- RETURNS LONGBLOB
-- -- READS SQL DATA
-- -- BEGIN
-- --     DECLARE file_content LONGBLOB;
-- --     SELECT resume_file_content INTO file_content
-- --     FROM resume_submissions 
-- --     WHERE id = submission_id;
-- --     RETURN file_content;
-- -- END$$

-- -- CREATE FUNCTION get_cert_file(submission_id INT)
-- -- RETURNS LONGBLOB
-- -- READS SQL DATA
-- -- BEGIN
-- --     DECLARE file_content LONGBLOB;
-- --     SELECT cert_file_content INTO file_content
-- --     FROM resume_submissions 
-- --     WHERE id = submission_id;
-- --     RETURN file_content;
-- -- END$$

-- -- DELIMITER ;

-- -- -- Sample insert with file content (you would use the API for real inserts)
-- -- -- Note: In practice, files are inserted via the API



-- CREATE TABLE IF NOT EXISTS resume_submissions (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   first_name VARCHAR(100) NOT NULL,
--   last_name VARCHAR(100) NOT NULL,
--   email VARCHAR(100) NOT NULL,
--   phone VARCHAR(20) NOT NULL,
--   city VARCHAR(100) NOT NULL,
--   state VARCHAR(100) NOT NULL,
--   `position` VARCHAR(200) NOT NULL,
--   has_cpr ENUM('yes', 'no') DEFAULT NULL,

--   resume_file_name VARCHAR(255) NOT NULL,
--   resume_file_type VARCHAR(50) NOT NULL,
--   resume_file_size INT NOT NULL,
--   resume_file_content LONGBLOB NOT NULL,

--   cert_file_name VARCHAR(255) DEFAULT NULL,
--   cert_file_type VARCHAR(50) DEFAULT NULL,
--   cert_file_size INT DEFAULT NULL,
--   cert_file_content LONGBLOB DEFAULT NULL,

--   comments TEXT,
--   ip_address VARCHAR(45),
--   user_agent TEXT,
--   submitted_at DATETIME NOT NULL,
--   status ENUM('pending', 'reviewed', 'contacted', 'rejected') DEFAULT 'pending',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

--   INDEX idx_email (email),
--   INDEX idx_status (status),
--   INDEX idx_position (`position`(50)),
--   INDEX idx_submitted_at (submitted_at)
-- ) ENGINE=InnoDB
-- DEFAULT CHARSET=utf8mb4
-- COLLATE=utf8mb4_unicode_ci;


-- CREATE OR REPLACE VIEW resume_file_stats AS
-- SELECT 
--   COUNT(*) AS total_submissions,
--   SUM(resume_file_size) AS total_resume_size_bytes,
--   ROUND(SUM(resume_file_size) / (1024*1024), 2) AS total_resume_size_mb,
--   COALESCE(SUM(cert_file_size), 0) AS total_cert_size_bytes,
--   ROUND(COALESCE(SUM(cert_file_size), 0) / (1024*1024), 2) AS total_cert_size_mb,
--   AVG(resume_file_size) AS avg_resume_size_bytes,
--   MAX(resume_file_size) AS max_resume_size_bytes
-- FROM resume_submissions;




-- Create staffing requests table
CREATE TABLE IF NOT EXISTS staffing_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- Company contact details
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  
  -- Job description file
  job_description_file_name VARCHAR(255) NOT NULL,
  job_description_file_type VARCHAR(50) NOT NULL,
  job_description_file_size INT NOT NULL,
  job_description_file_content LONGBLOB NOT NULL,
  
  -- Additional information
  comments TEXT,
  
  -- System fields
  ip_address VARCHAR(45),
  user_agent TEXT,
  submitted_at DATETIME NOT NULL,
  status ENUM('pending', 'reviewing', 'processing', 'filled', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_company (company_name(100)),
  INDEX idx_status (status),
  INDEX idx_submitted_at (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create position requests table (linked to staffing requests)
CREATE TABLE IF NOT EXISTS position_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  staffing_request_id INT NOT NULL,
  job_title VARCHAR(200) NOT NULL,
  hire_type ENUM('Contract role', 'Permanent Hire', 'Project-Based', 'Bulk Staffing') NOT NULL,
  position_order INT DEFAULT 0,
  
  FOREIGN KEY (staffing_request_id) 
    REFERENCES staffing_requests(id) 
    ON DELETE CASCADE ON UPDATE CASCADE,
  
  INDEX idx_staffing_request (staffing_request_id),
  INDEX idx_hire_type (hire_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create staffing request logs
CREATE TABLE IF NOT EXISTS staffing_request_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  staffing_request_id INT DEFAULT NULL,
  email VARCHAR(100),
  action VARCHAR(50) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_staffing_request (staffing_request_id),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (staffing_request_id) 
    REFERENCES staffing_requests(id) 
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create view for staffing request summary
CREATE OR REPLACE VIEW staffing_summary AS
SELECT 
  DATE(sr.submitted_at) as request_date,
  sr.company_name,
  COUNT(DISTINCT sr.id) as total_requests,
  COUNT(pr.id) as total_positions,
  SUM(CASE WHEN pr.hire_type = 'Contract role' THEN 1 ELSE 0 END) as contract_roles,
  SUM(CASE WHEN pr.hire_type = 'Permanent Hire' THEN 1 ELSE 0 END) as permanent_hires,
  SUM(CASE WHEN pr.hire_type = 'Project-Based' THEN 1 ELSE 0 END) as project_based,
  SUM(CASE WHEN pr.hire_type = 'Bulk Staffing' THEN 1 ELSE 0 END) as bulk_staffing,
  GROUP_CONCAT(DISTINCT pr.job_title SEPARATOR ', ') as positions_list
FROM staffing_requests sr
LEFT JOIN position_requests pr ON sr.id = pr.staffing_request_id
GROUP BY DATE(sr.submitted_at), sr.company_name
ORDER BY request_date DESC;

-- Sample data
INSERT INTO staffing_requests (
  first_name, last_name, company_name, email, phone, city, state,
  job_description_file_name, job_description_file_type, job_description_file_size,
  comments, submitted_at, status
) VALUES 
('John', 'Smith', 'Tech Corp Inc', 'john.smith@techcorp.com', '+1 (555) 123-4567', 
 'San Francisco', 'CA', 'jd_tech.pdf', 'application/pdf', 204800,
 'Looking for senior developers with React experience', NOW() - INTERVAL 2 DAY, 'processing'),
('Jane', 'Doe', 'Healthcare Solutions', 'jane.doe@healthcare.com', '+1 (444) 987-6543',
 'New York', 'NY', 'jd_nursing.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 153600,
 'Urgent need for registered nurses', NOW() - INTERVAL 1 DAY, 'reviewing');

INSERT INTO position_requests (staffing_request_id, job_title, hire_type, position_order) VALUES
(1, 'Senior React Developer', 'Permanent Hire', 1),
(1, 'Frontend Developer', 'Contract role', 2),
(2, 'Registered Nurse', 'Bulk Staffing', 1),
(2, 'Medical Assistant', 'Contract role', 2);