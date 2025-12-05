-- =====================================================
-- 1️⃣ Insert Admin user (ID 1)
-- Password is 'password' (hashed via Laravel)
-- =====================================================
INSERT INTO users (id, name, email, password, email_verified_at, created_at, updated_at)
VALUES (1, 'Admin', 'admin@mail.com', '$2y$10$uD9yJqjPqx0g7V..x9dX/OzOXnwn8YfLxvFh7EZ4pY5uCq1X/D7Pq', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE email=email;

-- =====================================================
-- 2️⃣ Insert admin role
-- =====================================================
INSERT INTO roles (name, guard_name, created_at, updated_at)
VALUES ('admin', 'web', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=name;

SET @admin_role_id := (SELECT id FROM roles WHERE name='admin');

-- =====================================================
-- 3️⃣ Insert admin permissions
-- =====================================================
INSERT INTO permissions (name, guard_name, created_at, updated_at) VALUES
-- User
('view users','web', NOW(), NOW()),
('view user rate','web', NOW(), NOW()),
('create user','web', NOW(), NOW()),
('edit user','web', NOW(), NOW()),
('archive user','web', NOW(), NOW()),
('restore user','web', NOW(), NOW()),
-- Label
('view labels','web', NOW(), NOW()),
('create label','web', NOW(), NOW()),
('edit label','web', NOW(), NOW()),
('archive label','web', NOW(), NOW()),
('restore label','web', NOW(), NOW()),
-- Role
('view roles','web', NOW(), NOW()),
('create role','web', NOW(), NOW()),
('edit role','web', NOW(), NOW()),
('archive role','web', NOW(), NOW()),
('restore role','web', NOW(), NOW()),
-- Owner Company
('view owner company','web', NOW(), NOW()),
('edit owner company','web', NOW(), NOW()),
-- Client User
('view client users','web', NOW(), NOW()),
('create client user','web', NOW(), NOW()),
('edit client user','web', NOW(), NOW()),
('archive client user','web', NOW(), NOW()),
('restore client user','web', NOW(), NOW()),
-- Client Company
('view client companies','web', NOW(), NOW()),
('create client company','web', NOW(), NOW()),
('edit client company','web', NOW(), NOW()),
('archive client company','web', NOW(), NOW()),
('restore client company','web', NOW(), NOW()),
-- Project
('view projects','web', NOW(), NOW()),
('view project','web', NOW(), NOW()),
('create project','web', NOW(), NOW()),
('edit project','web', NOW(), NOW()),
('archive project','web', NOW(), NOW()),
('restore project','web', NOW(), NOW()),
('edit project user access','web', NOW(), NOW()),
-- TaskGroups
('create task group','web', NOW(), NOW()),
('edit task group','web', NOW(), NOW()),
('archive task group','web', NOW(), NOW()),
('restore task group','web', NOW(), NOW()),
('reorder task group','web', NOW(), NOW()),
-- Tasks
('view tasks','web', NOW(), NOW()),
('create task','web', NOW(), NOW()),
('edit task','web', NOW(), NOW()),
('archive task','web', NOW(), NOW()),
('restore task','web', NOW(), NOW()),
('reorder task','web', NOW(), NOW()),
('complete task','web', NOW(), NOW()),
('add time log','web', NOW(), NOW()),
('delete time log','web', NOW(), NOW()),
('view time logs','web', NOW(), NOW()),
('view comments','web', NOW(), NOW()),
-- Invoices
('view invoices','web', NOW(), NOW()),
('create invoice','web', NOW(), NOW()),
('edit invoice','web', NOW(), NOW()),
('archive invoice','web', NOW(), NOW()),
('restore invoice','web', NOW(), NOW()),
('change invoice status','web', NOW(), NOW()),
('download invoice','web', NOW(), NOW()),
('print invoice','web', NOW(), NOW()),
-- Reports
('view logged time sum report','web', NOW(), NOW()),
('view daily logged time report','web', NOW(), NOW()),
('view fixed price sum report','web', NOW(), NOW()),
-- Activities
('view activities','web', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=name;

-- =====================================================
-- 4️⃣ Assign all admin permissions to admin role
-- =====================================================
INSERT INTO role_has_permissions (role_id, permission_id)
SELECT @admin_role_id, id FROM permissions
ON DUPLICATE KEY UPDATE role_id=role_id;

-- =====================================================
-- 5️⃣ Assign admin role to Admin user (ID 1)
-- =====================================================
INSERT INTO model_has_roles (role_id, model_type, model_id)
VALUES (@admin_role_id, 'App\\Models\\User', 1)
ON DUPLICATE KEY UPDATE model_id=model_id;

-- =====================================================
-- 6️⃣ Insert client role
-- =====================================================
INSERT INTO roles (name, guard_name, created_at, updated_at)
VALUES ('client', 'web', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=name;

SET @client_role_id := (SELECT id FROM roles WHERE name='client');

-- =====================================================
-- 7️⃣ Insert client permissions
-- =====================================================
INSERT INTO permissions (name, guard_name, created_at, updated_at) VALUES
-- Project
('view projects','web', NOW(), NOW()),
('view project','web', NOW(), NOW()),
-- Tasks
('view tasks','web', NOW(), NOW()),
('create task','web', NOW(), NOW()),
('view time logs','web', NOW(), NOW()),
('view comments','web', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=name;

-- =====================================================
-- 8️⃣ Assign client permissions to client role
-- =====================================================
INSERT INTO role_has_permissions (role_id, permission_id)
SELECT @client_role_id, id FROM permissions
WHERE name IN (
    'view projects', 'view project', 
    'view tasks', 'create task', 
    'view time logs', 'view comments'
)
ON DUPLICATE KEY UPDATE role_id=role_id;

-- =====================================================
-- 9️⃣ Optional: Assign client role to a user
-- Replace USER_ID with actual client user ID (example: 3)
-- =====================================================
INSERT INTO model_has_roles (role_id, model_type, model_id)
VALUES (@client_role_id, 'App\\Models\\User', 3)
ON DUPLICATE KEY UPDATE model_id=model_id;
