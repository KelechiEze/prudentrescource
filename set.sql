-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `prudent_contact` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `prudent_contact`;

-- Main contact submissions table
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone_number` VARCHAR(20) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `submitted_at` DATETIME NOT NULL,
  `status` ENUM('pending', 'responded', 'archived') NOT NULL DEFAULT 'pending',
  `response_notes` TEXT DEFAULT NULL,
  `responded_at` DATETIME DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `email_sent` BOOLEAN DEFAULT false,
  `admin_notified` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_submitted_at` (`submitted_at`),
  INDEX `idx_ip_address` (`ip_address`(20)),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_email_status` (`email`, `status`),
  FULLTEXT INDEX `idx_message` (`message`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Contact form submissions from website';

-- Submission logs for audit and rate limiting
CREATE TABLE IF NOT EXISTS `submission_logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `success` BOOLEAN DEFAULT false,
  `error_message` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_ip_email` (`ip_address`(20), `email`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_success` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Logs of all submission attempts';

-- Email logs for tracking
CREATE TABLE IF NOT EXISTS `email_logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `submission_id` INT UNSIGNED DEFAULT NULL,
  `recipient` VARCHAR(100) NOT NULL,
  `subject` VARCHAR(200) NOT NULL,
  `type` ENUM('confirmation', 'notification', 'response') NOT NULL,
  `sent_at` DATETIME NOT NULL,
  `message_id` VARCHAR(200) DEFAULT NULL,
  `status` ENUM('sent', 'failed', 'delivered') DEFAULT 'sent',
  `error_message` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_submission_id` (`submission_id`),
  INDEX `idx_recipient` (`recipient`),
  INDEX `idx_sent_at` (`sent_at`),
  INDEX `idx_type` (`type`),
  FOREIGN KEY (`submission_id`) 
    REFERENCES `contact_submissions`(`id`) 
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Logs of all emails sent';

-- Update triggers for automatic status updates
DELIMITER $$

CREATE TRIGGER `after_submission_insert`
AFTER INSERT ON `contact_submissions`
FOR EACH ROW
BEGIN
    -- Log the submission
    INSERT INTO `submission_logs` (`ip_address`, `email`, `success`)
    VALUES (NEW.ip_address, NEW.email, true);
END$$

CREATE TRIGGER `before_submission_update`
BEFORE UPDATE ON `contact_submissions`
FOR EACH ROW
BEGIN
    -- Auto-set responded_at when status changes to 'responded'
    IF NEW.status = 'responded' AND OLD.status != 'responded' THEN
        SET NEW.responded_at = NOW();
    END IF;
END$$

DELIMITER ;

-- Insert sample data for testing
INSERT INTO `contact_submissions` 
(`full_name`, `email`, `phone_number`, `message`, `submitted_at`, `status`, `ip_address`, `user_agent`, `email_sent`, `admin_notified`) 
VALUES
('John Doe', 'john@example.com', '+1 (555) 123-4567', 'I am interested in your staffing services for our company. Can you provide more information about your process and pricing?', NOW() - INTERVAL 2 DAY, 'responded', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', true, true),
('Jane Smith', 'jane.smith@example.com', NULL, 'Looking for information about your training programs for our HR department. We have about 50 employees who need professional development.', NOW() - INTERVAL 1 DAY, 'pending', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', true, true),
('Robert Johnson', 'rob.j@business.com', '+1 (444) 555-6677', 'Quick question about your service areas. Do you provide staffing solutions nationwide or only in specific regions?', NOW() - INTERVAL 3 HOUR, 'pending', '192.168.1.102', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36', false, false);

-- Insert sample email logs
INSERT INTO `email_logs` 
(`submission_id`, `recipient`, `subject`, `type`, `sent_at`, `message_id`, `status`) 
VALUES
(1, 'john@example.com', 'Thank You for Contacting Prudent Resources', 'confirmation', NOW() - INTERVAL 2 DAY, '1234567890@mail.google.com', 'delivered'),
(1, 'info@prudentresources.com', 'New Contact Submission: John Doe', 'notification', NOW() - INTERVAL 2 DAY, '1234567891@mail.google.com', 'sent'),
(2, 'jane.smith@example.com', 'Thank You for Contacting Prudent Resources', 'confirmation', NOW() - INTERVAL 1 DAY, '1234567892@mail.google.com', 'delivered'),
(2, 'info@prudentresources.com', 'New Contact Submission: Jane Smith', 'notification', NOW() - INTERVAL 1 DAY, '1234567893@mail.google.com', 'sent');

-- Create a view for easy reporting
CREATE OR REPLACE VIEW `submission_summary` AS
SELECT 
    DATE(submitted_at) as submission_date,
    COUNT(*) as total_submissions,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
    SUM(CASE WHEN status = 'responded' THEN 1 ELSE 0 END) as responded,
    SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived,
    AVG(LENGTH(message)) as avg_message_length
FROM `contact_submissions`
GROUP BY DATE(submitted_at)
ORDER BY submission_date DESC;

-- Create stored procedure for cleaning old data
DELIMITER $$

CREATE PROCEDURE `clean_old_submissions`(IN `days_to_keep` INT)
BEGIN
    DECLARE `cutoff_date` DATE;
    SET `cutoff_date` = DATE_SUB(CURDATE(), INTERVAL `days_to_keep` DAY);
    
    -- Archive old submissions
    UPDATE `contact_submissions`
    SET `status` = 'archived'
    WHERE `submitted_at` < `cutoff_date` 
    AND `status` IN ('pending', 'responded');
    
    -- Delete very old logs (older than 90 days by default)
    DELETE FROM `submission_logs`
    WHERE `created_at` < DATE_SUB(CURDATE(), INTERVAL 90 DAY);
    
    -- Delete very old email logs (older than 90 days by default)
    DELETE FROM `email_logs`
    WHERE `created_at` < DATE_SUB(CURDATE(), INTERVAL 90 DAY);
    
    SELECT 
        ROW_COUNT() as rows_affected,
        `cutoff_date` as cleanup_date;
END$$

DELIMITER ;

-- Create user-friendly functions
DELIMITER $$

CREATE FUNCTION `get_pending_count`() 
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE `count` INT;
    SELECT COUNT(*) INTO `count` 
    FROM `contact_submissions` 
    WHERE `status` = 'pending';
    RETURN `count`;
END$$

CREATE FUNCTION `get_today_submissions`() 
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE `count` INT;
    SELECT COUNT(*) INTO `count` 
    FROM `contact_submissions` 
    WHERE DATE(`submitted_at`) = CURDATE();
    RETURN `count`;
END$$

DELIMITER ;

-- Grant permissions (adjust as needed)
-- CREATE USER IF NOT EXISTS 'prudent_app'@'localhost' IDENTIFIED BY 'secure_password_here';
-- GRANT SELECT, INSERT, UPDATE ON `prudent_contact`.* TO 'prudent_app'@'localhost';
-- GRANT EXECUTE ON PROCEDURE `prudent_contact`.`clean_old_submissions` TO 'prudent_app'@'localhost';

-- Show table information
SELECT 
    table_name,
    table_rows,
    avg_row_length,
    data_length,
    index_length,
    (data_length + index_length) as total_size,
    table_comment
FROM information_schema.tables 
WHERE table_schema = 'prudent_contact'
ORDER BY table_name;

-- Show initial data
SELECT 
    'contact_submissions' as table_name,
    COUNT(*) as row_count,
    MIN(submitted_at) as earliest_submission,
    MAX(submitted_at) as latest_submission
FROM contact_submissions
UNION ALL
SELECT 
    'submission_logs',
    COUNT(*),
    MIN(created_at),
    MAX(created_at)
FROM submission_logs
UNION ALL
SELECT 
    'email_logs',
    COUNT(*),
    MIN(created_at),
    MAX(created_at)
FROM email_logs;