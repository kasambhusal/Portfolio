-- Seed initial data for the portfolio site
-- This includes sample data and the admin user

-- Insert admin user (password: 'admin123' - hashed with bcrypt)
INSERT INTO admin_users (username, password_hash, email) VALUES 
('admin', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'developerkasam@gmail.com')
ON CONFLICT (username) DO NOTHING;

-- Insert sample companies
INSERT INTO companies (name, image_url, website_link) VALUES 
('TechCorp', '/placeholder.svg?height=60&width=120', 'https://techcorp.com'),
('InnovateLab', '/placeholder.svg?height=60&width=120', 'https://innovatelab.com'),
('StartupHub', '/placeholder.svg?height=60&width=120', 'https://startuphub.com'),
('DevStudio', '/placeholder.svg?height=60&width=120', 'https://devstudio.com')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, image_url, project_link) VALUES 
('E-Commerce Platform', 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.', '/placeholder.svg?height=300&width=400', 'https://github.com/kasam'),
('ML Prediction Model', 'Machine learning model for predicting customer behavior using Python, scikit-learn, and TensorFlow. Achieved 94% accuracy on test data.', '/placeholder.svg?height=300&width=400', 'https://github.com/kasam'),
('Mobile Task Manager', 'React Native mobile app for task management with offline sync, push notifications, and collaborative features.', '/placeholder.svg?height=300&width=400', 'https://github.com/kasam')
ON CONFLICT DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, category, proficiency_level) VALUES 
('React', 'Frontend', 9),
('Next.js', 'Frontend', 9),
('TypeScript', 'Frontend', 8),
('Node.js', 'Backend', 8),
('PostgreSQL', 'Database', 8),
('Python', 'ML/AI', 9),
('TensorFlow', 'ML/AI', 7),
('Docker', 'DevOps', 7),
('AWS', 'Cloud', 6)
ON CONFLICT DO NOTHING;

-- Insert sample awards
INSERT INTO awards (title, description, date_received, organization) VALUES 
('Best Innovation Award', 'Awarded for developing an AI-powered solution that improved efficiency by 40%', '2023-12-15', 'Tech Innovation Summit'),
('Hackathon Winner', 'First place in 48-hour hackathon for building a social impact application', '2023-08-20', 'Code for Good Hackathon'),
('Outstanding Developer', 'Recognition for exceptional contribution to open-source projects', '2023-06-10', 'Open Source Foundation')
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, designation, company, image_url, description, rating) VALUES 
('Sarah Johnson', 'Product Manager', 'TechCorp', '/placeholder.svg?height=80&width=80', 'Kasam delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success.', 5),
('Michael Chen', 'CTO', 'StartupHub', '/placeholder.svg?height=80&width=80', 'Working with Kasam was a game-changer for our startup. He not only built our MVP but also provided valuable insights on scalability.', 5),
('Emily Rodriguez', 'Data Scientist', 'InnovateLab', '/placeholder.svg?height=80&width=80', 'Kasam''s ML expertise helped us achieve breakthrough results in our prediction models. Highly recommend his services!', 5)
ON CONFLICT DO NOTHING;

-- Insert sample blogs/events
INSERT INTO blogs (title, description, content, image_urls, tags, slug) VALUES 
('Winning the Code for Good Hackathon', 'An incredible 48-hour journey building a social impact application that won first place.', 'The Code for Good Hackathon was an amazing experience where I teamed up with talented developers to build an application that addresses food waste in our community...', ARRAY['/placeholder.svg?height=400&width=600'], ARRAY['hackathon', 'social-impact', 'teamwork'], 'winning-code-for-good-hackathon'),
('My Journey into Machine Learning', 'How I transitioned from web development to ML and the lessons learned along the way.', 'Machine Learning has always fascinated me, but making the transition from traditional web development required dedication and continuous learning...', ARRAY['/placeholder.svg?height=400&width=600'], ARRAY['machine-learning', 'career', 'learning'], 'journey-into-machine-learning'),
('Building Scalable Applications', 'Key principles and practices for developing applications that can handle growth.', 'Scalability is not just about handling more users; it''s about building systems that can evolve with your business needs...', ARRAY['/placeholder.svg?height=400&width=600'], ARRAY['development', 'scalability', 'architecture'], 'building-scalable-applications')
ON CONFLICT DO NOTHING;
