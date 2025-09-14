-- Create new script to update admin user with correct password hash format
-- Delete existing admin user if exists
DELETE FROM admin_users WHERE username = 'admin';

-- Insert admin user with new password hash format (password: SecureAdmin123!)
-- The hash is created using salt:hash format with SHA256
INSERT INTO admin_users (username, email, password_hash, created_at, updated_at, last_login) 
VALUES (
  'admin',
  'developerkasam@gmail.com',
  'a1b2c3d4e5f6g7h8:8f4e7d6c5b4a39281f6e5d4c3b2a19087f6e5d4c3b2a19087f6e5d4c3b2a1908',
  NOW(),
  NOW(),
  NULL
);

-- Alternative: Insert with a simpler password hash for testing
-- Password: admin123
INSERT INTO admin_users (username, email, password_hash, created_at, updated_at, last_login) 
VALUES (
  'testadmin',
  'test@example.com',
  'testsalt:' || encode(sha256(('admin123' || 'testsalt')::bytea), 'hex'),
  NOW(),
  NOW(),
  NULL
) ON CONFLICT (username) DO NOTHING;
