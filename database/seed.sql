-- ============================================
-- CAREER DISCOVERY PLATFORM SEED DATA
-- ============================================

-- ============================================
-- CATEGORIES
-- ============================================

INSERT INTO public.categories (name, slug, description, icon)
VALUES
  (
    'Software Development',
    'software-development',
    'Careers focused on building software applications, websites, and digital systems.',
    'Code'
  ),
  (
    'Healthcare',
    'healthcare',
    'Careers dedicated to medical care, wellness, and patient support.',
    'HeartPulse'
  ),
  (
    'Design & Creativity',
    'design-creativity',
    'Creative careers involving design, visual communication, and artistic problem solving.',
    'Palette'
  ),
  (
    'Business & Finance',
    'business-finance',
    'Careers involving business operations, management, and financial planning.',
    'Briefcase'
  ),
  (
    'Education & Psychology',
    'education-psychology',
    'Careers focused on teaching, learning, and mental well-being.',
    'BookOpen'
  );

-- ============================================
-- CAREERS
-- ============================================

INSERT INTO public.careers (
  title,
  slug,
  short_description,
  full_description,
  junior_salary_range,
  mid_salary_range,
  senior_salary_range,
  demand,
  difficulty_level,
  duration_estimate,
  image_url,
  featured,
  category_id
)
VALUES
  (
    'Frontend Developer',
    'frontend-developer',
    'Builds responsive and interactive user interfaces for websites and web applications.',
    'Frontend Developers create the visual and interactive parts of websites and applications using modern web technologies. They work closely with designers and backend developers to deliver smooth user experiences.',
    '₹3 LPA - ₹6 LPA',
    '₹7 LPA - ₹14 LPA',
    '₹15 LPA - ₹30 LPA',
    'high',
    'medium',
    '6-12 months',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    true,
    (SELECT id FROM public.categories WHERE slug = 'software-development')
  ),
  (
    'Backend Developer',
    'backend-developer',
    'Develops server-side logic, databases, and APIs for applications.',
    'Backend Developers build scalable server-side systems, manage databases, create APIs, and ensure application performance and security.',
    '₹4 LPA - ₹7 LPA',
    '₹8 LPA - ₹16 LPA',
    '₹18 LPA - ₹35 LPA',
    'high',
    'medium',
    '8-14 months',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    true,
    (SELECT id FROM public.categories WHERE slug = 'software-development')
  ),
  (
    'Registered Nurse',
    'registered-nurse',
    'Provides patient care, medical assistance, and healthcare support.',
    'Registered Nurses monitor patient health, assist doctors, administer medications, and provide emotional support to patients and families.',
    '₹2.5 LPA - ₹5 LPA',
    '₹5 LPA - ₹8 LPA',
    '₹9 LPA - ₹15 LPA',
    'high',
    'hard',
    '3-4 years',
    'https://images.unsplash.com/photo-1584515933487-779824d29309',
    false,
    (SELECT id FROM public.categories WHERE slug = 'healthcare')
  ),
  (
    'Physiotherapist',
    'physiotherapist',
    'Helps patients recover movement and physical function after injuries.',
    'Physiotherapists help patients improve mobility, reduce pain, and recover from physical injuries through therapy exercises and treatment plans.',
    '₹3 LPA - ₹5 LPA',
    '₹6 LPA - ₹10 LPA',
    '₹12 LPA - ₹20 LPA',
    'medium',
    'hard',
    '4-5 years',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514',
    false,
    (SELECT id FROM public.categories WHERE slug = 'healthcare')
  ),
  (
    'UI/UX Designer',
    'ui-ux-designer',
    'Designs user-friendly digital experiences and interfaces.',
    'UI/UX Designers research user behavior, create wireframes, and design interfaces that improve usability and customer satisfaction.',
    '₹3 LPA - ₹6 LPA',
    '₹7 LPA - ₹12 LPA',
    '₹14 LPA - ₹25 LPA',
    'high',
    'medium',
    '6-10 months',
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
    true,
    (SELECT id FROM public.categories WHERE slug = 'design-creativity')
  ),
  (
    'Graphic Designer',
    'graphic-designer',
    'Creates visual content for branding, marketing, and communication.',
    'Graphic Designers create logos, social media graphics, posters, and other visual assets for businesses and brands.',
    '₹2.5 LPA - ₹5 LPA',
    '₹5 LPA - ₹9 LPA',
    '₹10 LPA - ₹18 LPA',
    'medium',
    'easy',
    '4-8 months',
    'https://images.unsplash.com/photo-1523726491678-bf852e717f6a',
    false,
    (SELECT id FROM public.categories WHERE slug = 'design-creativity')
  ),
  (
    'Financial Analyst',
    'financial-analyst',
    'Analyzes financial data to support business decisions and investments.',
    'Financial Analysts evaluate financial reports, market trends, and investment opportunities to help organizations make informed decisions.',
    '₹4 LPA - ₹7 LPA',
    '₹8 LPA - ₹14 LPA',
    '₹15 LPA - ₹28 LPA',
    'high',
    'medium',
    '1-2 years',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
    true,
    (SELECT id FROM public.categories WHERE slug = 'business-finance')
  ),
  (
    'Human Resources Manager',
    'human-resources-manager',
    'Manages employee relations, hiring, and workplace policies.',
    'HR Managers oversee recruitment, employee engagement, workplace culture, and company policies.',
    '₹4 LPA - ₹6 LPA',
    '₹7 LPA - ₹12 LPA',
    '₹14 LPA - ₹24 LPA',
    'medium',
    'easy',
    '1-2 years',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    false,
    (SELECT id FROM public.categories WHERE slug = 'business-finance')
  ),
  (
    'School Teacher',
    'school-teacher',
    'Educates students and supports their academic development.',
    'School Teachers prepare lesson plans, teach subjects, assess student performance, and support classroom learning.',
    '₹2.5 LPA - ₹4.5 LPA',
    '₹5 LPA - ₹8 LPA',
    '₹9 LPA - ₹15 LPA',
    'medium',
    'medium',
    '2-4 years',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    false,
    (SELECT id FROM public.categories WHERE slug = 'education-psychology')
  ),
  (
    'Psychologist',
    'psychologist',
    'Helps individuals manage mental health and emotional well-being.',
    'Psychologists assess behavior, provide therapy, and support mental health treatment through counseling and psychological techniques.',
    '₹3 LPA - ₹5 LPA',
    '₹6 LPA - ₹10 LPA',
    '₹12 LPA - ₹20 LPA',
    'high',
    'hard',
    '4-6 years',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    true,
    (SELECT id FROM public.categories WHERE slug = 'education-psychology')
  );

-- ============================================
-- SKILLS
-- ============================================

INSERT INTO public.skills (name, slug, description)
VALUES
  ('HTML & CSS', 'html-css', 'Core technologies used to structure and style web pages.'),
  ('JavaScript', 'javascript', 'Programming language used to create interactive web applications.'),
  ('React', 'react', 'Frontend JavaScript library for building user interfaces.'),
  ('Responsive Design', 'responsive-design', 'Designing websites that work across devices and screen sizes.'),
  ('Git & GitHub', 'git-github', 'Version control and collaboration tools for developers.'),

  ('Node.js', 'nodejs', 'JavaScript runtime for backend application development.'),
  ('REST APIs', 'rest-apis', 'Building and integrating APIs for communication between systems.'),
  ('Database Management', 'database-management', 'Managing and querying databases efficiently.'),
  ('Authentication & Security', 'authentication-security', 'Securing applications and managing user access.'),
  ('System Design', 'system-design', 'Designing scalable and maintainable backend systems.'),

  ('Patient Care', 'patient-care', 'Providing support and care to patients in medical settings.'),
  ('Medical Terminology', 'medical-terminology', 'Understanding medical vocabulary and procedures.'),
  ('Vital Signs Monitoring', 'vital-signs-monitoring', 'Monitoring blood pressure, pulse, and temperature.'),
  ('Emergency Response', 'emergency-response', 'Responding quickly during medical emergencies.'),
  ('Communication Skills', 'communication-skills', 'Communicating effectively with patients and teams.'),

  ('Anatomy Knowledge', 'anatomy-knowledge', 'Understanding human body structure and movement.'),
  ('Rehabilitation Techniques', 'rehabilitation-techniques', 'Therapeutic exercises for patient recovery.'),
  ('Exercise Therapy', 'exercise-therapy', 'Using exercises to improve mobility and strength.'),
  ('Manual Therapy', 'manual-therapy', 'Hands-on treatment techniques for pain and mobility.'),
  ('Patient Assessment', 'patient-assessment', 'Evaluating patient conditions and treatment needs.'),

  ('Wireframing', 'wireframing', 'Creating low-fidelity layouts for applications and websites.'),
  ('Figma', 'figma', 'Collaborative design tool for UI and UX design.'),
  ('User Research', 'user-research', 'Studying user behavior and needs.'),
  ('Prototyping', 'prototyping', 'Building interactive mockups before development.'),
  ('Design Systems', 'design-systems', 'Reusable design components and standards.'),

  ('Typography', 'typography', 'Using fonts effectively in visual design.'),
  ('Adobe Photoshop', 'adobe-photoshop', 'Editing and creating visual graphics.'),
  ('Adobe Illustrator', 'adobe-illustrator', 'Creating vector graphics and illustrations.'),
  ('Branding', 'branding', 'Developing visual identity for brands.'),
  ('Color Theory', 'color-theory', 'Understanding color combinations and visual harmony.'),

  ('Financial Modeling', 'financial-modeling', 'Building models for financial analysis and forecasting.'),
  ('Excel', 'excel', 'Spreadsheet software used for analysis and reporting.'),
  ('Data Analysis', 'data-analysis', 'Analyzing and interpreting data for decision making.'),
  ('Market Research', 'market-research', 'Researching market trends and competitors.'),
  ('Accounting Basics', 'accounting-basics', 'Understanding financial statements and accounting principles.'),

  ('Recruitment', 'recruitment', 'Hiring and onboarding new employees.'),
  ('Employee Relations', 'employee-relations', 'Managing workplace relationships and employee concerns.'),
  ('Conflict Resolution', 'conflict-resolution', 'Handling and resolving workplace conflicts.'),
  ('Organizational Skills', 'organizational-skills', 'Managing tasks, schedules, and resources effectively.'),
  ('Leadership', 'leadership', 'Leading teams and making strategic decisions.'),

  ('Lesson Planning', 'lesson-planning', 'Preparing educational lessons and activities.'),
  ('Classroom Management', 'classroom-management', 'Maintaining discipline and engagement in classrooms.'),
  ('Public Speaking', 'public-speaking', 'Communicating confidently to groups and audiences.'),
  ('Subject Knowledge', 'subject-knowledge', 'Strong understanding of teaching subjects.'),
  ('Student Assessment', 'student-assessment', 'Evaluating student learning and performance.'),

  ('Counseling Skills', 'counseling-skills', 'Helping individuals through emotional and mental challenges.'),
  ('Behavioral Analysis', 'behavioral-analysis', 'Understanding human behavior patterns.'),
  ('Empathy', 'empathy', 'Understanding and sharing others emotions.'),
  ('Mental Health Assessment', 'mental-health-assessment', 'Evaluating psychological conditions.'),
  ('Therapy Techniques', 'therapy-techniques', 'Methods used during psychological therapy sessions.');

-- ============================================
-- CAREER SKILLS MAPPING
-- ============================================

INSERT INTO public.career_skills (career_id, skill_id, display_order)
VALUES

-- Frontend Developer
((SELECT id FROM careers WHERE slug = 'frontend-developer'), (SELECT id FROM skills WHERE slug = 'html-css'), 1),
((SELECT id FROM careers WHERE slug = 'frontend-developer'), (SELECT id FROM skills WHERE slug = 'javascript'), 2),
((SELECT id FROM careers WHERE slug = 'frontend-developer'), (SELECT id FROM skills WHERE slug = 'react'), 3),
((SELECT id FROM careers WHERE slug = 'frontend-developer'), (SELECT id FROM skills WHERE slug = 'responsive-design'), 4),
((SELECT id FROM careers WHERE slug = 'frontend-developer'), (SELECT id FROM skills WHERE slug = 'git-github'), 5),

-- Backend Developer
((SELECT id FROM careers WHERE slug = 'backend-developer'), (SELECT id FROM skills WHERE slug = 'nodejs'), 1),
((SELECT id FROM careers WHERE slug = 'backend-developer'), (SELECT id FROM skills WHERE slug = 'rest-apis'), 2),
((SELECT id FROM careers WHERE slug = 'backend-developer'), (SELECT id FROM skills WHERE slug = 'database-management'), 3),
((SELECT id FROM careers WHERE slug = 'backend-developer'), (SELECT id FROM skills WHERE slug = 'authentication-security'), 4),
((SELECT id FROM careers WHERE slug = 'backend-developer'), (SELECT id FROM skills WHERE slug = 'system-design'), 5),

-- Registered Nurse
((SELECT id FROM careers WHERE slug = 'registered-nurse'), (SELECT id FROM skills WHERE slug = 'patient-care'), 1),
((SELECT id FROM careers WHERE slug = 'registered-nurse'), (SELECT id FROM skills WHERE slug = 'medical-terminology'), 2),
((SELECT id FROM careers WHERE slug = 'registered-nurse'), (SELECT id FROM skills WHERE slug = 'vital-signs-monitoring'), 3),
((SELECT id FROM careers WHERE slug = 'registered-nurse'), (SELECT id FROM skills WHERE slug = 'emergency-response'), 4),
((SELECT id FROM careers WHERE slug = 'registered-nurse'), (SELECT id FROM skills WHERE slug = 'communication-skills'), 5),

-- Physiotherapist
((SELECT id FROM careers WHERE slug = 'physiotherapist'), (SELECT id FROM skills WHERE slug = 'anatomy-knowledge'), 1),
((SELECT id FROM careers WHERE slug = 'physiotherapist'), (SELECT id FROM skills WHERE slug = 'rehabilitation-techniques'), 2),
((SELECT id FROM careers WHERE slug = 'physiotherapist'), (SELECT id FROM skills WHERE slug = 'exercise-therapy'), 3),
((SELECT id FROM careers WHERE slug = 'physiotherapist'), (SELECT id FROM skills WHERE slug = 'manual-therapy'), 4),
((SELECT id FROM careers WHERE slug = 'physiotherapist'), (SELECT id FROM skills WHERE slug = 'patient-assessment'), 5),

-- UI/UX Designer
((SELECT id FROM careers WHERE slug = 'ui-ux-designer'), (SELECT id FROM skills WHERE slug = 'wireframing'), 1),
((SELECT id FROM careers WHERE slug = 'ui-ux-designer'), (SELECT id FROM skills WHERE slug = 'figma'), 2),
((SELECT id FROM careers WHERE slug = 'ui-ux-designer'), (SELECT id FROM skills WHERE slug = 'user-research'), 3),
((SELECT id FROM careers WHERE slug = 'ui-ux-designer'), (SELECT id FROM skills WHERE slug = 'prototyping'), 4),
((SELECT id FROM careers WHERE slug = 'ui-ux-designer'), (SELECT id FROM skills WHERE slug = 'design-systems'), 5),

-- Graphic Designer
((SELECT id FROM careers WHERE slug = 'graphic-designer'), (SELECT id FROM skills WHERE slug = 'typography'), 1),
((SELECT id FROM careers WHERE slug = 'graphic-designer'), (SELECT id FROM skills WHERE slug = 'adobe-photoshop'), 2),
((SELECT id FROM careers WHERE slug = 'graphic-designer'), (SELECT id FROM skills WHERE slug = 'adobe-illustrator'), 3),
((SELECT id FROM careers WHERE slug = 'graphic-designer'), (SELECT id FROM skills WHERE slug = 'branding'), 4),
((SELECT id FROM careers WHERE slug = 'graphic-designer'), (SELECT id FROM skills WHERE slug = 'color-theory'), 5),

-- Financial Analyst
((SELECT id FROM careers WHERE slug = 'financial-analyst'), (SELECT id FROM skills WHERE slug = 'financial-modeling'), 1),
((SELECT id FROM careers WHERE slug = 'financial-analyst'), (SELECT id FROM skills WHERE slug = 'excel'), 2),
((SELECT id FROM careers WHERE slug = 'financial-analyst'), (SELECT id FROM skills WHERE slug = 'data-analysis'), 3),
((SELECT id FROM careers WHERE slug = 'financial-analyst'), (SELECT id FROM skills WHERE slug = 'market-research'), 4),
((SELECT id FROM careers WHERE slug = 'financial-analyst'), (SELECT id FROM skills WHERE slug = 'accounting-basics'), 5),

-- Human Resources Manager
((SELECT id FROM careers WHERE slug = 'human-resources-manager'), (SELECT id FROM skills WHERE slug = 'recruitment'), 1),
((SELECT id FROM careers WHERE slug = 'human-resources-manager'), (SELECT id FROM skills WHERE slug = 'employee-relations'), 2),
((SELECT id FROM careers WHERE slug = 'human-resources-manager'), (SELECT id FROM skills WHERE slug = 'conflict-resolution'), 3),
((SELECT id FROM careers WHERE slug = 'human-resources-manager'), (SELECT id FROM skills WHERE slug = 'organizational-skills'), 4),
((SELECT id FROM careers WHERE slug = 'human-resources-manager'), (SELECT id FROM skills WHERE slug = 'leadership'), 5),

-- School Teacher
((SELECT id FROM careers WHERE slug = 'school-teacher'), (SELECT id FROM skills WHERE slug = 'lesson-planning'), 1),
((SELECT id FROM careers WHERE slug = 'school-teacher'), (SELECT id FROM skills WHERE slug = 'classroom-management'), 2),
((SELECT id FROM careers WHERE slug = 'school-teacher'), (SELECT id FROM skills WHERE slug = 'public-speaking'), 3),
((SELECT id FROM careers WHERE slug = 'school-teacher'), (SELECT id FROM skills WHERE slug = 'subject-knowledge'), 4),
((SELECT id FROM careers WHERE slug = 'school-teacher'), (SELECT id FROM skills WHERE slug = 'student-assessment'), 5),

-- Psychologist
((SELECT id FROM careers WHERE slug = 'psychologist'), (SELECT id FROM skills WHERE slug = 'counseling-skills'), 1),
((SELECT id FROM careers WHERE slug = 'psychologist'), (SELECT id FROM skills WHERE slug = 'behavioral-analysis'), 2),
((SELECT id FROM careers WHERE slug = 'psychologist'), (SELECT id FROM skills WHERE slug = 'empathy'), 3),
((SELECT id FROM careers WHERE slug = 'psychologist'), (SELECT id FROM skills WHERE slug = 'mental-health-assessment'), 4),
((SELECT id FROM careers WHERE slug = 'psychologist'), (SELECT id FROM skills WHERE slug = 'therapy-techniques'), 5);


-- ============================================
-- LEARNING RESOURCES
-- ============================================

INSERT INTO public.learning_resources (skill_id, title, resource_type, url)
VALUES
  ((SELECT id FROM public.skills WHERE slug = 'html-css'), 'HTML & CSS Crash Course', 'course', 'https://www.freecodecamp.org/learn/2022/responsive-web-design/'),
  ((SELECT id FROM public.skills WHERE slug = 'html-css'), 'MDN HTML & CSS Docs', 'documentation', 'https://developer.mozilla.org/en-US/docs/Learn'),

  ((SELECT id FROM public.skills WHERE slug = 'javascript'), 'JavaScript Algorithms and Data Structures', 'course', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/'),
  ((SELECT id FROM public.skills WHERE slug = 'javascript'), 'JavaScript.info', 'documentation', 'https://javascript.info/'),

  ((SELECT id FROM public.skills WHERE slug = 'react'), 'React Official Tutorial', 'documentation', 'https://react.dev/learn'),
  ((SELECT id FROM public.skills WHERE slug = 'react'), 'React Course for Beginners', 'course', 'https://scrimba.com/learn/learnreact'),

  ((SELECT id FROM public.skills WHERE slug = 'responsive-design'), 'Responsive Web Design Certification', 'course', 'https://www.freecodecamp.org/learn/2022/responsive-web-design/'),
  ((SELECT id FROM public.skills WHERE slug = 'responsive-design'), 'Responsive Design Basics', 'documentation', 'https://web.dev/responsive-web-design-basics/'),

  ((SELECT id FROM public.skills WHERE slug = 'git-github'), 'Git & GitHub Crash Course', 'course', 'https://www.youtube.com/watch?v=RGOj5yH7evk'),
  ((SELECT id FROM public.skills WHERE slug = 'git-github'), 'Pro Git Book', 'documentation', 'https://git-scm.com/book/en/v2'),

  ((SELECT id FROM public.skills WHERE slug = 'nodejs'), 'Node.js Full Course', 'course', 'https://www.youtube.com/watch?v=Oe421EPjeBE'),
  ((SELECT id FROM public.skills WHERE slug = 'nodejs'), 'Node.js Official Docs', 'documentation', 'https://nodejs.org/en/docs'),

  ((SELECT id FROM public.skills WHERE slug = 'rest-apis'), 'REST API Design Best Practices', 'course', 'https://restfulapi.net/'),
  ((SELECT id FROM public.skills WHERE slug = 'rest-apis'), 'Postman API Fundamentals', 'course', 'https://academy.postman.com/'),

  ((SELECT id FROM public.skills WHERE slug = 'database-management'), 'SQL for Beginners', 'course', 'https://www.khanacademy.org/computing/computer-programming/sql'),
  ((SELECT id FROM public.skills WHERE slug = 'database-management'), 'PostgreSQL Documentation', 'documentation', 'https://www.postgresql.org/docs/'),

  ((SELECT id FROM public.skills WHERE slug = 'authentication-security'), 'Web Security Fundamentals', 'course', 'https://portswigger.net/web-security'),
  ((SELECT id FROM public.skills WHERE slug = 'authentication-security'), 'OWASP Top 10', 'documentation', 'https://owasp.org/www-project-top-ten/'),

  ((SELECT id FROM public.skills WHERE slug = 'system-design'), 'System Design Primer', 'documentation', 'https://github.com/donnemartin/system-design-primer'),
  ((SELECT id FROM public.skills WHERE slug = 'system-design'), 'Grokking System Design', 'course', 'https://www.designgurus.io/course/grokking-the-system-design-interview'),

  ((SELECT id FROM public.skills WHERE slug = 'patient-care'), 'Fundamentals of Patient Care', 'course', 'https://www.coursera.org/learn/fundamentals-of-patient-care'),
  ((SELECT id FROM public.skills WHERE slug = 'patient-care'), 'Patient Care Basics Guide', 'documentation', 'https://medlineplus.gov/'),

  ((SELECT id FROM public.skills WHERE slug = 'medical-terminology'), 'Medical Terminology Course', 'course', 'https://www.coursera.org/learn/medical-terminology'),
  ((SELECT id FROM public.skills WHERE slug = 'medical-terminology'), 'Medical Dictionary', 'documentation', 'https://www.merriam-webster.com/medical'),

  ((SELECT id FROM public.skills WHERE slug = 'vital-signs-monitoring'), 'Vital Signs Training', 'course', 'https://www.coursera.org/learn/vital-signs'),
  ((SELECT id FROM public.skills WHERE slug = 'vital-signs-monitoring'), 'Vital Signs Overview', 'documentation', 'https://my.clevelandclinic.org/health/articles/10881-vital-signs'),

  ((SELECT id FROM public.skills WHERE slug = 'emergency-response'), 'Emergency Response Fundamentals', 'course', 'https://www.redcross.org/take-a-class'),
  ((SELECT id FROM public.skills WHERE slug = 'emergency-response'), 'Basic Life Support Guide', 'documentation', 'https://cpr.heart.org/'),

  ((SELECT id FROM public.skills WHERE slug = 'communication-skills'), 'Effective Communication Skills', 'course', 'https://www.coursera.org/learn/wharton-communication-skills'),
  ((SELECT id FROM public.skills WHERE slug = 'communication-skills'), 'Communication Skills Guide', 'documentation', 'https://www.mindtools.com/communication-skills'),

  ((SELECT id FROM public.skills WHERE slug = 'anatomy-knowledge'), 'Human Anatomy Course', 'course', 'https://www.coursera.org/specializations/anatomy'),
  ((SELECT id FROM public.skills WHERE slug = 'anatomy-knowledge'), 'Visible Body Anatomy Atlas', 'documentation', 'https://www.visiblebody.com/learn/anatomy'),

  ((SELECT id FROM public.skills WHERE slug = 'rehabilitation-techniques'), 'Rehabilitation Techniques Training', 'course', 'https://www.physio-pedia.com/'),
  ((SELECT id FROM public.skills WHERE slug = 'rehabilitation-techniques'), 'Rehabilitation Exercise Library', 'documentation', 'https://www.physio-pedia.com/Exercises'),

  ((SELECT id FROM public.skills WHERE slug = 'exercise-therapy'), 'Exercise Therapy Basics', 'course', 'https://www.futurelearn.com/courses/exercise-therapy'),
  ((SELECT id FROM public.skills WHERE slug = 'exercise-therapy'), 'Exercise Therapy Guide', 'documentation', 'https://www.physio-pedia.com/Exercise_Therapy'),

  ((SELECT id FROM public.skills WHERE slug = 'manual-therapy'), 'Manual Therapy Course', 'course', 'https://www.physio-pedia.com/Manual_Therapy'),
  ((SELECT id FROM public.skills WHERE slug = 'manual-therapy'), 'Manual Therapy Techniques', 'documentation', 'https://www.physio-network.com/blog/manual-therapy/'),

  ((SELECT id FROM public.skills WHERE slug = 'patient-assessment'), 'Patient Assessment Fundamentals', 'course', 'https://www.coursera.org/learn/patient-assessment'),
  ((SELECT id FROM public.skills WHERE slug = 'patient-assessment'), 'Patient Assessment Guide', 'documentation', 'https://www.ncbi.nlm.nih.gov/books/NBK553178/'),

  ((SELECT id FROM public.skills WHERE slug = 'wireframing'), 'Wireframing for Beginners', 'course', 'https://www.udemy.com/course/wireframing-for-beginners/'),
  ((SELECT id FROM public.skills WHERE slug = 'wireframing'), 'Wireframing Guide', 'documentation', 'https://www.interaction-design.org/literature/topics/wireframing'),

  ((SELECT id FROM public.skills WHERE slug = 'figma'), 'Learn Figma', 'course', 'https://help.figma.com/hc/en-us/categories/360002051613'),
  ((SELECT id FROM public.skills WHERE slug = 'figma'), 'Figma Official Docs', 'documentation', 'https://help.figma.com/'),

  ((SELECT id FROM public.skills WHERE slug = 'user-research'), 'User Research Methods', 'course', 'https://www.coursera.org/learn/user-research'),
  ((SELECT id FROM public.skills WHERE slug = 'user-research'), 'NNGroup User Research Articles', 'documentation', 'https://www.nngroup.com/topic/user-research/'),

  ((SELECT id FROM public.skills WHERE slug = 'prototyping'), 'Interactive Prototyping Course', 'course', 'https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/'),
  ((SELECT id FROM public.skills WHERE slug = 'prototyping'), 'Prototyping Basics', 'documentation', 'https://www.interaction-design.org/literature/topics/prototyping'),

  ((SELECT id FROM public.skills WHERE slug = 'design-systems'), 'Design Systems Course', 'course', 'https://www.designsystems.com/learn'),
  ((SELECT id FROM public.skills WHERE slug = 'design-systems'), 'Material Design System', 'documentation', 'https://m3.material.io/'),

  ((SELECT id FROM public.skills WHERE slug = 'typography'), 'Typography Fundamentals', 'course', 'https://www.coursera.org/learn/typography'),
  ((SELECT id FROM public.skills WHERE slug = 'typography'), 'Typography Guide', 'documentation', 'https://www.interaction-design.org/literature/topics/typography'),

  ((SELECT id FROM public.skills WHERE slug = 'adobe-photoshop'), 'Adobe Photoshop Essentials', 'course', 'https://www.udemy.com/course/adobe-photoshop-cc-essentials-training-course/'),
  ((SELECT id FROM public.skills WHERE slug = 'adobe-photoshop'), 'Photoshop Tutorials', 'documentation', 'https://helpx.adobe.com/photoshop/tutorials.html'),

  ((SELECT id FROM public.skills WHERE slug = 'adobe-illustrator'), 'Adobe Illustrator for Beginners', 'course', 'https://www.udemy.com/course/adobe-illustrator-course/'),
  ((SELECT id FROM public.skills WHERE slug = 'adobe-illustrator'), 'Illustrator Tutorials', 'documentation', 'https://helpx.adobe.com/illustrator/tutorials.html'),

  ((SELECT id FROM public.skills WHERE slug = 'branding'), 'Brand Strategy Course', 'course', 'https://www.coursera.org/learn/brand-management'),
  ((SELECT id FROM public.skills WHERE slug = 'branding'), 'Branding Basics', 'documentation', 'https://www.canva.com/learn/branding/'),

  ((SELECT id FROM public.skills WHERE slug = 'color-theory'), 'Color Theory for Designers', 'course', 'https://www.interaction-design.org/courses/color-theory-for-designers'),
  ((SELECT id FROM public.skills WHERE slug = 'color-theory'), 'Color Theory Guide', 'documentation', 'https://www.adobe.com/creativecloud/design/discover/color-theory.html'),

  ((SELECT id FROM public.skills WHERE slug = 'financial-modeling'), 'Financial Modeling Course', 'course', 'https://www.coursera.org/learn/financial-modeling'),
  ((SELECT id FROM public.skills WHERE slug = 'financial-modeling'), 'Financial Modeling Guide', 'documentation', 'https://corporatefinanceinstitute.com/resources/financial-modeling/'),

  ((SELECT id FROM public.skills WHERE slug = 'excel'), 'Excel Skills for Business', 'course', 'https://www.coursera.org/specializations/excel'),
  ((SELECT id FROM public.skills WHERE slug = 'excel'), 'Microsoft Excel Documentation', 'documentation', 'https://support.microsoft.com/excel'),

  ((SELECT id FROM public.skills WHERE slug = 'data-analysis'), 'Google Data Analytics Certificate', 'course', 'https://www.coursera.org/professional-certificates/google-data-analytics'),
  ((SELECT id FROM public.skills WHERE slug = 'data-analysis'), 'Data Analysis Basics', 'documentation', 'https://www.ibm.com/topics/data-analysis'),

  ((SELECT id FROM public.skills WHERE slug = 'market-research'), 'Market Research Foundations', 'course', 'https://www.coursera.org/learn/market-research'),
  ((SELECT id FROM public.skills WHERE slug = 'market-research'), 'Market Research Guide', 'documentation', 'https://www.qualtrics.com/experience-management/research/market-research/'),

  ((SELECT id FROM public.skills WHERE slug = 'accounting-basics'), 'Introduction to Accounting', 'course', 'https://www.coursera.org/learn/wharton-accounting'),
  ((SELECT id FROM public.skills WHERE slug = 'accounting-basics'), 'Accounting Basics Guide', 'documentation', 'https://www.accountingcoach.com/'),

  ((SELECT id FROM public.skills WHERE slug = 'recruitment'), 'Recruitment and Hiring Course', 'course', 'https://www.coursera.org/learn/recruiting-hiring-onboarding-employees'),
  ((SELECT id FROM public.skills WHERE slug = 'recruitment'), 'Recruitment Best Practices', 'documentation', 'https://resources.workable.com/tutorial/recruitment-strategies'),

  ((SELECT id FROM public.skills WHERE slug = 'employee-relations'), 'Employee Relations Fundamentals', 'course', 'https://www.udemy.com/course/employee-relations/'),
  ((SELECT id FROM public.skills WHERE slug = 'employee-relations'), 'Employee Relations Guide', 'documentation', 'https://www.shrm.org/resourcesandtools/tools-and-samples/toolkits/pages/managingemployeeissues.aspx'),

  ((SELECT id FROM public.skills WHERE slug = 'conflict-resolution'), 'Conflict Resolution Skills', 'course', 'https://www.coursera.org/learn/conflict-resolution-skills'),
  ((SELECT id FROM public.skills WHERE slug = 'conflict-resolution'), 'Conflict Management Guide', 'documentation', 'https://www.mindtools.com/conflict-resolution'),

  ((SELECT id FROM public.skills WHERE slug = 'organizational-skills'), 'Organizational Skills Course', 'course', 'https://www.linkedin.com/learning/organizational-skills-for-the-overwhelmed'),
  ((SELECT id FROM public.skills WHERE slug = 'organizational-skills'), 'Organization Skills Guide', 'documentation', 'https://www.indeed.com/career-advice/career-development/organizational-skills'),

  ((SELECT id FROM public.skills WHERE slug = 'leadership'), 'Leadership Foundations', 'course', 'https://www.coursera.org/learn/leadership-foundations'),
  ((SELECT id FROM public.skills WHERE slug = 'leadership'), 'Leadership Skills Guide', 'documentation', 'https://www.mindtools.com/pages/main/newMN_LDR.htm'),

  ((SELECT id FROM public.skills WHERE slug = 'lesson-planning'),
   'Lesson Planning for Teachers',
   'course',
   'https://www.coursera.org/learn/lesson-plans'),

  ((SELECT id FROM public.skills WHERE slug = 'lesson-planning'),
   'Lesson Planning Strategies Guide',
   'documentation',
   'https://www.teachhub.com/classroom-management/2020/07/lesson-planning-strategies-for-teachers/'),

  -- Classroom Management
  ((SELECT id FROM public.skills WHERE slug = 'classroom-management'),
   'Classroom Management Techniques',
   'course',
   'https://www.coursera.org/learn/classroom-management'),

  ((SELECT id FROM public.skills WHERE slug = 'classroom-management'),
   'Classroom Management Resources',
   'documentation',
   'https://www.edutopia.org/article/classroom-management-resources-new-teachers'),

  -- Public Speaking
  ((SELECT id FROM public.skills WHERE slug = 'public-speaking'),
   'Introduction to Public Speaking',
   'course',
   'https://www.coursera.org/learn/public-speaking'),

  ((SELECT id FROM public.skills WHERE slug = 'public-speaking'),
   'Public Speaking Tips',
   'documentation',
   'https://www.toastmasters.org/resources/public-speaking-tips'),

  -- Subject Knowledge
  ((SELECT id FROM public.skills WHERE slug = 'subject-knowledge'),
   'Learning How to Learn',
   'course',
   'https://www.coursera.org/learn/learning-how-to-learn'),

  ((SELECT id FROM public.skills WHERE slug = 'subject-knowledge'),
   'Study Skills Guide',
   'documentation',
   'https://www.futurelearn.com/courses/study-skills'),

  -- Student Assessment
  ((SELECT id FROM public.skills WHERE slug = 'student-assessment'),
   'Assessing Student Learning',
   'course',
   'https://www.coursera.org/learn/assessing-student-learning'),

  ((SELECT id FROM public.skills WHERE slug = 'student-assessment'),
   'Student Assessment Strategies',
   'documentation',
   'https://cft.vanderbilt.edu/student-assessment/'),

  -- Counseling Skills
  ((SELECT id FROM public.skills WHERE slug = 'counseling-skills'),
   'Counseling Skills Certificate',
   'course',
   'https://www.coursera.org/learn/counseling-skills'),

  ((SELECT id FROM public.skills WHERE slug = 'counseling-skills'),
   'Counseling Skills Guide',
   'documentation',
   'https://positivepsychology.com/counseling-skills/'),

  -- Behavioral Analysis
  ((SELECT id FROM public.skills WHERE slug = 'behavioral-analysis'),
   'Behavioral Analysis Basics',
   'course',
   'https://www.coursera.org/learn/behavioral-finance'),

  ((SELECT id FROM public.skills WHERE slug = 'behavioral-analysis'),
   'Behaviorism Overview',
   'documentation',
   'https://www.simplypsychology.org/behaviorism.html'),

  -- Empathy
  ((SELECT id FROM public.skills WHERE slug = 'empathy'),
   'Empathy and Emotional Intelligence',
   'course',
   'https://www.coursera.org/learn/emotional-intelligence-cultivating-immensely-human-interactions'),

  ((SELECT id FROM public.skills WHERE slug = 'empathy'),
   'What is Empathy?',
   'documentation',
   'https://www.verywellmind.com/what-is-empathy-2795562'),

  -- Mental Health Assessment
  ((SELECT id FROM public.skills WHERE slug = 'mental-health-assessment'),
   'Psychological First Aid',
   'course',
   'https://www.coursera.org/learn/psychological-first-aid'),

  ((SELECT id FROM public.skills WHERE slug = 'mental-health-assessment'),
   'Mental Health Information Guide',
   'documentation',
   'https://www.mentalhealth.gov/'),

  -- Therapy Techniques
  ((SELECT id FROM public.skills WHERE slug = 'therapy-techniques'),
   'Positive Psychiatry and Mental Health',
   'course',
   'https://www.coursera.org/learn/positive-psychiatry-and-mental-health'),

  ((SELECT id FROM public.skills WHERE slug = 'therapy-techniques'),
   'Therapy Techniques Overview',
   'documentation',
   'https://www.psychologytoday.com/us/therapy-types');


-- ============================================
--            CAREER INDUSTRIES 
-- ============================================


insert into public.career_industries (career_id, industry_id) values
-- Consulting & Professional Services
('dba6c672-4d54-44b2-9567-06b85a1a5f14', '1949463e-17ae-4089-8938-a226c9aa42ac'), -- Product Manager
('4938f881-caa9-48d6-9653-efe1a4d8b302', '1949463e-17ae-4089-8938-a226c9aa42ac'), -- Financial Analyst
('7c00eefd-fab5-49f4-9012-f7ae65dac6bf', '1949463e-17ae-4089-8938-a226c9aa42ac'), -- Human Resources Manager
('04b99042-b88b-4d05-868f-b1721b4e099a', '1949463e-17ae-4089-8938-a226c9aa42ac'), -- Digital Marketing Specialist
('99c98c37-f963-422a-828e-4defae33d0fb', '1949463e-17ae-4089-8938-a226c9aa42ac'), -- Clinical Psychologist

-- E-commerce & Retail
('6cc2529a-4538-4a7e-a46a-f711434f9c17', '61886bdb-878d-4261-9c72-f61f15858916'), -- Frontend Developer
('69e1b2fa-4a9e-4822-a747-ce24769e1a9d', '61886bdb-878d-4261-9c72-f61f15858916'), -- Backend Developer
('455aae5c-0498-4b8c-9614-1a819712f1fb', '61886bdb-878d-4261-9c72-f61f15858916'), -- Mobile App Developer
('04b99042-b88b-4d05-868f-b1721b4e099a', '61886bdb-878d-4261-9c72-f61f15858916'), -- Digital Marketing Specialist
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', '61886bdb-878d-4261-9c72-f61f15858916'), -- UI/UX Designer

-- Education & EdTech
('a0e101e7-ade3-42c9-9b78-0cae639a0f63', '593245e7-25ba-4fe1-8907-a552cf268a92'), -- AI Engineer
('6cc2529a-4538-4a7e-a46a-f711434f9c17', '593245e7-25ba-4fe1-8907-a552cf268a92'), -- Frontend Developer
('69e1b2fa-4a9e-4822-a747-ce24769e1a9d', '593245e7-25ba-4fe1-8907-a552cf268a92'), -- Backend Developer
('99c98c37-f963-422a-828e-4defae33d0fb', '593245e7-25ba-4fe1-8907-a552cf268a92'), -- Clinical Psychologist
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', '593245e7-25ba-4fe1-8907-a552cf268a92'), -- UI/UX Designer

-- Fintech
('a0e101e7-ade3-42c9-9b78-0cae639a0f63', '129e9a06-66c2-45cc-8145-18fdde0dd116'), -- AI Engineer
('69e1b2fa-4a9e-4822-a747-ce24769e1a9d', '129e9a06-66c2-45cc-8145-18fdde0dd116'), -- Backend Developer
('cefc3e38-5eba-42c7-b4c2-9896834f3b03', '129e9a06-66c2-45cc-8145-18fdde0dd116'), -- Cybersecurity Analyst
('4938f881-caa9-48d6-9653-efe1a4d8b302', '129e9a06-66c2-45cc-8145-18fdde0dd116'), -- Financial Analyst
('7152bde5-38cb-47ce-9249-73c74edf336f', '129e9a06-66c2-45cc-8145-18fdde0dd116'), -- DevOps Engineer

-- Government & Public Sector
('cefc3e38-5eba-42c7-b4c2-9896834f3b03', '523a30fb-9cf6-4ce2-8765-bcda99490071'), -- Cybersecurity Analyst
('f6adc954-8d15-4cff-b37f-94aefb58a427', '523a30fb-9cf6-4ce2-8765-bcda99490071'), -- Cloud Engineer
('4938f881-caa9-48d6-9653-efe1a4d8b302', '523a30fb-9cf6-4ce2-8765-bcda99490071'), -- Financial Analyst
('7c00eefd-fab5-49f4-9012-f7ae65dac6bf', '523a30fb-9cf6-4ce2-8765-bcda99490071'), -- Human Resources Manager
('faca38be-419c-41a1-8921-e03608d80dc4', '523a30fb-9cf6-4ce2-8765-bcda99490071'), -- Mechanical Engineer

-- Healthcare & Biotech
('a0e101e7-ade3-42c9-9b78-0cae639a0f63', 'e18bbb2c-bf2d-4730-995e-41b43833c9fc'), -- AI Engineer
('99c98c37-f963-422a-828e-4defae33d0fb', 'e18bbb2c-bf2d-4730-995e-41b43833c9fc'), -- Clinical Psychologist
('e2bb63ce-413e-4835-9b34-6b65cbaf41b7', 'e18bbb2c-bf2d-4730-995e-41b43833c9fc'), -- Data Analyst
('dba6c672-4d54-44b2-9567-06b85a1a5f14', 'e18bbb2c-bf2d-4730-995e-41b43833c9fc'), -- Product Manager
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', 'e18bbb2c-bf2d-4730-995e-41b43833c9fc'), -- UI/UX Designer

-- Logistics & Supply Chain
('69e1b2fa-4a9e-4822-a747-ce24769e1a9d', '45a27e34-2aea-48d2-81c9-c7d061eb2fbc'), -- Backend Developer
('f6adc954-8d15-4cff-b37f-94aefb58a427', '45a27e34-2aea-48d2-81c9-c7d061eb2fbc'), -- Cloud Engineer
('7152bde5-38cb-47ce-9249-73c74edf336f', '45a27e34-2aea-48d2-81c9-c7d061eb2fbc'), -- DevOps Engineer
('4938f881-caa9-48d6-9653-efe1a4d8b302', '45a27e34-2aea-48d2-81c9-c7d061eb2fbc'), -- Financial Analyst
('dba6c672-4d54-44b2-9567-06b85a1a5f14', '45a27e34-2aea-48d2-81c9-c7d061eb2fbc'), -- Product Manager

-- Manufacturing & Automotive
('f6adc954-8d15-4cff-b37f-94aefb58a427', '71a21ad2-648c-40f1-a622-45bf38d620b4'), -- Cloud Engineer
('7152bde5-38cb-47ce-9249-73c74edf336f', '71a21ad2-648c-40f1-a622-45bf38d620b4'), -- DevOps Engineer
('faca38be-419c-41a1-8921-e03608d80dc4', '71a21ad2-648c-40f1-a622-45bf38d620b4'), -- Mechanical Engineer
('dba6c672-4d54-44b2-9567-06b85a1a5f14', '71a21ad2-648c-40f1-a622-45bf38d620b4'), -- Product Manager
('a10800c5-36c3-4ebc-8ac7-272a88a44552', '71a21ad2-648c-40f1-a622-45bf38d620b4'), -- Interior Designer

-- Media & Entertainment
('a0e101e7-ade3-42c9-9b78-0cae639a0f63', '7e4053ef-7f8b-4326-836d-35d83520a840'), -- AI Engineer
('04b99042-b88b-4d05-868f-b1721b4e099a', '7e4053ef-7f8b-4326-836d-35d83520a840'), -- Digital Marketing Specialist
('5bd9eb7f-b41b-4590-853f-513221982b19', '7e4053ef-7f8b-4326-836d-35d83520a840'), -- Graphic Designer
('455aae5c-0498-4b8c-9614-1a819712f1fb', '7e4053ef-7f8b-4326-836d-35d83520a840'), -- Mobile App Developer
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', '7e4053ef-7f8b-4326-836d-35d83520a840'), -- UI/UX Designer

-- Real Estate & Construction
('f6adc954-8d15-4cff-b37f-94aefb58a427', 'b6fe4d28-ff9f-4678-bfb4-778c537d5f7f'), -- Cloud Engineer
('a10800c5-36c3-4ebc-8ac7-272a88a44552', 'b6fe4d28-ff9f-4678-bfb4-778c537d5f7f'), -- Interior Designer
('faca38be-419c-41a1-8921-e03608d80dc4', 'b6fe4d28-ff9f-4678-bfb4-778c537d5f7f'), -- Mechanical Engineer
('dba6c672-4d54-44b2-9567-06b85a1a5f14', 'b6fe4d28-ff9f-4678-bfb4-778c537d5f7f'), -- Product Manager
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', 'b6fe4d28-ff9f-4678-bfb4-778c537d5f7f'); -- UI/UX Designer

-- Consulting & Professional Services
('dba6c672-4d54-44b2-9567-06b85a1a5f14', '6ab96b22-6534-44c8-a18a-76ed19e09efd'), -- Product Manager
('4938f881-caa9-48d6-9653-efe1a4d8b302', '6ab96b22-6534-44c8-a18a-76ed19e09efd'), -- Financial Analyst
('7c00eefd-fab5-49f4-9012-f7ae65dac6bf', '6ab96b22-6534-44c8-a18a-76ed19e09efd'), -- HR Manager
('04b99042-b88b-4d05-868f-b1721b4e099a', '6ab96b22-6534-44c8-a18a-76ed19e09efd'), -- Digital Marketing Specialist
('99c98c37-f963-422a-828e-4defae33d0fb', '6ab96b22-6534-44c8-a18a-76ed19e09efd'), -- Clinical Psychologist

-- E-commerce & Retail
('6cc2529a-4538-4a7e-a46a-f711434f9c17', 'eb0ca936-f2a5-4458-8618-c429824cfa25'), -- Frontend Developer
('69e1b2fa-4a9e-4822-a747-ce24769e1a9d', 'eb0ca936-f2a5-4458-8618-c429824cfa25'), -- Backend Developer
('455aae5c-0498-4b8c-9614-1a819712f1fb', 'eb0ca936-f2a5-4458-8618-c429824cfa25'), -- Mobile App Developer
('04b99042-b88b-4d05-868f-b1721b4e099a', 'eb0ca936-f2a5-4458-8618-c429824cfa25'), -- Digital Marketing Specialist
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', 'eb0ca936-f2a5-4458-8618-c429824cfa25'), -- UI/UX Designer

-- Education & EdTech
('a0e101e7-ade3-42c9-9b78-0cae639a0f63', '22f03059-a8ba-4d32-966f-a7d8d84953b4'), -- AI Engineer
('6cc2529a-4538-4a7e-a46a-f711434f9c17', '22f03059-a8ba-4d32-966f-a7d8d84953b4'), -- Frontend Developer
('69e1b2fa-4a9e-4822-a747-ce24769e1a9d', '22f03059-a8ba-4d32-966f-a7d8d84953b4'), -- Backend Developer
('99c98c37-f963-422a-828e-4defae33d0fb', '22f03059-a8ba-4d32-966f-a7d8d84953b4'), -- Clinical Psychologist
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', '22f03059-a8ba-4d32-966f-a7d8d84953b4'), -- UI/UX Designer

-- Fintech
('a0e101e7-ade3-42c9-9b78-0cae639a0f63', 'f18b090c-61ca-400c-8603-e6273ab864ee'), -- AI Engineer
('69e1b2fa-4a9e-4822-a747-ce24769e1a9d', 'f18b090c-61ca-400c-8603-e6273ab864ee'), -- Backend Developer
('cefc3e38-5eba-42c7-b4c2-9896834f3b03', 'f18b090c-61ca-400c-8603-e6273ab864ee'), -- Cybersecurity Analyst
('4938f881-caa9-48d6-9653-efe1a4d8b302', 'f18b090c-61ca-400c-8603-e6273ab864ee'), -- Financial Analyst
('7152bde5-38cb-47ce-9249-73c74edf336f', 'f18b090c-61ca-400c-8603-e6273ab864ee'), -- DevOps Engineer

-- Government & Public Sector
('cefc3e38-5eba-42c7-b4c2-9896834f3b03', 'e2992332-8946-4b04-ad63-01e18a04762e'), -- Cybersecurity Analyst
('f6adc954-8d15-4cff-b37f-94aefb58a427', 'e2992332-8946-4b04-ad63-01e18a04762e'), -- Cloud Engineer
('4938f881-caa9-48d6-9653-efe1a4d8b302', 'e2992332-8946-4b04-ad63-01e18a04762e'), -- Financial Analyst
('7c00eefd-fab5-49f4-9012-f7ae65dac6bf', 'e2992332-8946-4b04-ad63-01e18a04762e'), -- HR Manager
('faca38be-419c-41a1-8921-e03608d80dc4', 'e2992332-8946-4b04-ad63-01e18a04762e'), -- Mechanical Engineer

-- Healthcare & Biotech
('a0e101e7-ade3-42c9-9b78-0cae639a0f63', 'b5064e2f-70e9-4879-b22e-62f05948f639'), -- AI Engineer
('99c98c37-f963-422a-828e-4defae33d0fb', 'b5064e2f-70e9-4879-b22e-62f05948f639'), -- Clinical Psychologist
('e2bb63ce-413e-4835-9b34-6b65cbaf41b7', 'b5064e2f-70e9-4879-b22e-62f05948f639'), -- Data Analyst
('dba6c672-4d54-44b2-9567-06b85a1a5f14', 'b5064e2f-70e9-4879-b22e-62f05948f639'), -- Product Manager
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', 'b5064e2f-70e9-4879-b22e-62f05948f639'), -- UI/UX Designer

-- Logistics & Supply Chain
('69e1b2fa-4a9e-4822-a747-ce24769e1a9d', 'c8d15784-92c5-42be-ae48-d0e4ab8949ea'), -- Backend Developer
('f6adc954-8d15-4cff-b37f-94aefb58a427', 'c8d15784-92c5-42be-ae48-d0e4ab8949ea'), -- Cloud Engineer
('7152bde5-38cb-47ce-9249-73c74edf336f', 'c8d15784-92c5-42be-ae48-d0e4ab8949ea'), -- DevOps Engineer
('4938f881-caa9-48d6-9653-efe1a4d8b302', 'c8d15784-92c5-42be-ae48-d0e4ab8949ea'), -- Financial Analyst
('dba6c672-4d54-44b2-9567-06b85a1a5f14', 'c8d15784-92c5-42be-ae48-d0e4ab8949ea'), -- Product Manager

-- Manufacturing & Automotive
('f6adc954-8d15-4cff-b37f-94aefb58a427', 'afbb5cd7-3e85-42dc-a219-51b2564ea046'), -- Cloud Engineer
('7152bde5-38cb-47ce-9249-73c74edf336f', 'afbb5cd7-3e85-42dc-a219-51b2564ea046'), -- DevOps Engineer
('faca38be-419c-41a1-8921-e03608d80dc4', 'afbb5cd7-3e85-42dc-a219-51b2564ea046'), -- Mechanical Engineer
('dba6c672-4d54-44b2-9567-06b85a1a5f14', 'afbb5cd7-3e85-42dc-a219-51b2564ea046'), -- Product Manager
('a10800c5-36c3-4ebc-8ac7-272a88a44552', 'afbb5cd7-3e85-42dc-a219-51b2564ea046'), -- Interior Designer

-- Media & Entertainment
('a0e101e7-ade3-42c9-9b78-0cae639a0f63', 'b6fe8c62-9807-460f-8a9e-a61c7076f5f7'), -- AI Engineer
('04b99042-b88b-4d05-868f-b1721b4e099a', 'b6fe8c62-9807-460f-8a9e-a61c7076f5f7'), -- Digital Marketing Specialist
('5bd9eb7f-b41b-4590-853f-513221982b19', 'b6fe8c62-9807-460f-8a9e-a61c7076f5f7'), -- Graphic Designer
('455aae5c-0498-4b8c-9614-1a819712f1fb', 'b6fe8c62-9807-460f-8a9e-a61c7076f5f7'), -- Mobile App Developer
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', 'b6fe8c62-9807-460f-8a9e-a61c7076f5f7'), -- UI/UX Designer

-- Real Estate & Construction
('f6adc954-8d15-4cff-b37f-94aefb58a427', '2881acf0-efd7-4dd6-b70b-d5725dc05838'), -- Cloud Engineer
('a10800c5-36c3-4ebc-8ac7-272a88a44552', '2881acf0-efd7-4dd6-b70b-d5725dc05838'), -- Interior Designer
('faca38be-419c-41a1-8921-e03608d80dc4', '2881acf0-efd7-4dd6-b70b-d5725dc05838'), -- Mechanical Engineer
('dba6c672-4d54-44b2-9567-06b85a1a5f14', '2881acf0-efd7-4dd6-b70b-d5725dc05838'), -- Product Manager
('5a5b989b-4ad5-4287-974c-ef6e4eddeef5', '2881acf0-efd7-4dd6-b70b-d5725dc05838'); -- UI/UX Designer

--------------- CAREER_PATHS TABLE------------------------

-- =====================================================
-- Data Analyst
-- Career ID:
-- e2bb63ce-413e-4835-9b34-6b65cbaf41b7
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  'e2bb63ce-413e-4835-9b34-6b65cbaf41b7',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Pursue a degree in Statistics, Mathematics, Computer Science, Economics, or a related field.',
  '3 to 4 years',
  '12th pass',
  'Strong analytical and quantitative foundation'
),
(
  'e2bb63ce-413e-4835-9b34-6b65cbaf41b7',
  2,
  'skill',
  'Learn Data Analysis Tools',
  'Master Excel, SQL, Python, data visualization, statistics, and dashboard tools like Power BI or Tableau.',
  '6 to 12 months',
  'Basic mathematics and computer skills',
  'Ability to analyze and visualize data'
),
(
  'e2bb63ce-413e-4835-9b34-6b65cbaf41b7',
  3,
  'project',
  'Build Data Analytics Projects',
  'Create projects involving business insights, dashboards, reporting, and real-world datasets.',
  '2 to 6 months',
  'Knowledge of SQL and analytics tools',
  'Portfolio showcasing analytical problem-solving'
),
(
  'e2bb63ce-413e-4835-9b34-6b65cbaf41b7',
  4,
  'internship',
  'Data Analyst Internship',
  'Work on reporting, KPI tracking, data cleaning, and business intelligence tasks.',
  '3 to 6 months',
  'Portfolio projects and analytics skills',
  'Industry experience with real datasets'
),
(
  'e2bb63ce-413e-4835-9b34-6b65cbaf41b7',
  5,
  'job',
  'Junior Data Analyst',
  'Analyze datasets, generate reports, and support business decision-making.',
  '0 to 2 years',
  'Internship or strong analytics portfolio',
  'Professional analytics experience'
),
(
  'e2bb63ce-413e-4835-9b34-6b65cbaf41b7',
  6,
  'senior_role',
  'Senior Data Analyst',
  'Lead analytical initiatives, build advanced dashboards, and mentor junior analysts.',
  '3 to 7 years',
  'Industry analytics experience',
  'Advanced business intelligence and analytics career growth'
);



-- =====================================================
-- UI/UX Designer
-- Career ID:
-- 5a5b989b-4ad5-4287-974c-ef6e4eddeef5
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  '5a5b989b-4ad5-4287-974c-ef6e4eddeef5',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Study design, computer applications, visual communication, psychology, or a related field.',
  '3 to 4 years',
  '12th pass',
  'Foundational understanding of design and user behavior'
),
(
  '5a5b989b-4ad5-4287-974c-ef6e4eddeef5',
  2,
  'skill',
  'Learn UI/UX Design Tools and Principles',
  'Master Figma, wireframing, prototyping, user research, typography, design systems, and usability principles.',
  '6 to 12 months',
  'Basic design or computer knowledge',
  'Ability to design user-centered digital products'
),
(
  '5a5b989b-4ad5-4287-974c-ef6e4eddeef5',
  3,
  'project',
  'Build UI/UX Portfolio Projects',
  'Create mobile apps, website redesigns, prototypes, and user experience case studies.',
  '2 to 6 months',
  'UI/UX fundamentals and design tools',
  'Professional design portfolio'
),
(
  '5a5b989b-4ad5-4287-974c-ef6e4eddeef5',
  4,
  'internship',
  'UI/UX Design Internship',
  'Collaborate with product and development teams on real product interfaces and user flows.',
  '3 to 6 months',
  'Portfolio and design tool proficiency',
  'Industry design experience'
),
(
  '5a5b989b-4ad5-4287-974c-ef6e4eddeef5',
  5,
  'job',
  'Junior UI/UX Designer',
  'Design interfaces, improve usability, and contribute to digital product experiences.',
  '0 to 2 years',
  'Internship or strong portfolio',
  'Professional product design experience'
),
(
  '5a5b989b-4ad5-4287-974c-ef6e4eddeef5',
  6,
  'senior_role',
  'Senior UI/UX Designer',
  'Lead product design strategy, conduct advanced UX research, and mentor designers.',
  '3 to 7 years',
  'Professional UI/UX experience',
  'Leadership in product and experience design'
);



-- =====================================================
-- Mechanical Engineer
-- Career ID:
-- faca38be-419c-41a1-8921-e03608d80dc4
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  'faca38be-419c-41a1-8921-e03608d80dc4',
  1,
  'education',
  'Complete 12th Standard with Science',
  'Study Physics, Chemistry, and Mathematics in higher secondary education.',
  '2 years',
  '10th pass',
  'Eligibility for engineering entrance and degree programs'
),
(
  'faca38be-419c-41a1-8921-e03608d80dc4',
  2,
  'degree',
  'Bachelor''s Degree in Mechanical Engineering',
  'Study mechanics, thermodynamics, manufacturing, machine design, and engineering systems.',
  '4 years',
  '12th pass with science',
  'Core mechanical engineering knowledge'
),
(
  'faca38be-419c-41a1-8921-e03608d80dc4',
  3,
  'skill',
  'Learn CAD and Engineering Software',
  'Develop skills in AutoCAD, SolidWorks, manufacturing processes, and technical drawing.',
  '6 to 12 months',
  'Mechanical engineering fundamentals',
  'Ability to design and analyze mechanical systems'
),
(
  'faca38be-419c-41a1-8921-e03608d80dc4',
  4,
  'training',
  'Industrial Training or Internship',
  'Gain hands-on exposure in manufacturing plants, production units, or engineering firms.',
  '3 to 6 months',
  'Engineering coursework completion',
  'Practical industrial experience'
),
(
  'faca38be-419c-41a1-8921-e03608d80dc4',
  5,
  'job',
  'Mechanical Engineer',
  'Work on product design, maintenance, manufacturing, quality control, or operations engineering.',
  '0 to 3 years',
  'Engineering degree and training',
  'Professional engineering experience'
),
(
  'faca38be-419c-41a1-8921-e03608d80dc4',
  6,
  'senior_role',
  'Senior Mechanical Engineer',
  'Lead engineering projects, optimize manufacturing systems, and supervise technical teams.',
  '4 to 8 years',
  'Professional engineering experience',
  'Advanced technical and leadership responsibilities'
);


-- =====================================================
-- Digital Marketing Specialist
-- Career ID:
-- 04b99042-b88b-4d05-868f-b1721b4e099a
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  '04b99042-b88b-4d05-868f-b1721b4e099a',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Study marketing, business, communications, media, or a related field.',
  '3 to 4 years',
  '12th pass',
  'Foundational business and marketing knowledge'
),
(
  '04b99042-b88b-4d05-868f-b1721b4e099a',
  2,
  'skill',
  'Learn Digital Marketing Skills',
  'Master SEO, social media marketing, content marketing, paid ads, analytics, email marketing, and branding.',
  '4 to 12 months',
  'Basic computer and internet skills',
  'Ability to plan and execute digital campaigns'
),
(
  '04b99042-b88b-4d05-868f-b1721b4e099a',
  3,
  'project',
  'Build Marketing Campaign Projects',
  'Run mock or real campaigns, analyze traffic data, and create digital marketing case studies.',
  '2 to 6 months',
  'Digital marketing fundamentals',
  'Portfolio demonstrating marketing skills'
),
(
  '04b99042-b88b-4d05-868f-b1721b4e099a',
  4,
  'internship',
  'Digital Marketing Internship',
  'Work on SEO optimization, social media management, advertising campaigns, and analytics reporting.',
  '3 to 6 months',
  'Marketing projects or certifications',
  'Practical industry experience'
),
(
  '04b99042-b88b-4d05-868f-b1721b4e099a',
  5,
  'job',
  'Digital Marketing Specialist',
  'Manage online campaigns, optimize digital presence, and improve customer engagement.',
  '0 to 3 years',
  'Internship or marketing portfolio',
  'Professional digital marketing experience'
),
(
  '04b99042-b88b-4d05-868f-b1721b4e099a',
  6,
  'senior_role',
  'Senior Digital Marketing Manager',
  'Lead digital strategy, oversee campaigns, and manage brand growth initiatives.',
  '4 to 8 years',
  'Professional digital marketing experience',
  'Leadership in marketing strategy and growth'
);



-- =====================================================
-- AI Engineer
-- Career ID:
-- a0e101e7-ade3-42c9-9b78-0cae639a0f63
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  'a0e101e7-ade3-42c9-9b78-0cae639a0f63',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Pursue a degree in Computer Science, Artificial Intelligence, Data Science, or a related field.',
  '3 to 4 years',
  '12th pass with science',
  'Strong programming and mathematical foundation'
),
(
  'a0e101e7-ade3-42c9-9b78-0cae639a0f63',
  2,
  'skill',
  'Learn AI and Machine Learning Fundamentals',
  'Study Python, machine learning, deep learning, neural networks, data processing, and model evaluation.',
  '6 to 12 months',
  'Programming and mathematics basics',
  'Ability to build and train AI models'
),
(
  'a0e101e7-ade3-42c9-9b78-0cae639a0f63',
  3,
  'project',
  'Build AI Projects',
  'Develop projects involving chatbots, computer vision, recommendation systems, or predictive analytics.',
  '3 to 6 months',
  'Machine learning knowledge',
  'Practical AI portfolio'
),
(
  'a0e101e7-ade3-42c9-9b78-0cae639a0f63',
  4,
  'internship',
  'AI or Machine Learning Internship',
  'Work with datasets, train models, and assist in deploying AI solutions.',
  '3 to 6 months',
  'AI projects and Python proficiency',
  'Real-world AI development experience'
),
(
  'a0e101e7-ade3-42c9-9b78-0cae639a0f63',
  5,
  'job',
  'AI Engineer',
  'Build, optimize, and deploy machine learning and artificial intelligence systems.',
  '0 to 3 years',
  'Internship or AI portfolio',
  'Professional AI engineering experience'
),
(
  'a0e101e7-ade3-42c9-9b78-0cae639a0f63',
  6,
  'senior_role',
  'Senior AI Engineer',
  'Lead AI architecture, research advanced models, and guide AI product development.',
  '4 to 8 years',
  'Professional AI engineering experience',
  'Leadership in artificial intelligence systems'
);



-- =====================================================
-- Cybersecurity Analyst
-- Career ID:
-- cefc3e38-5eba-42c7-b4c2-9896834f3b03
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  'cefc3e38-5eba-42c7-b4c2-9896834f3b03',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Study Computer Science, Information Technology, Cybersecurity, or a related discipline.',
  '3 to 4 years',
  '12th pass with science',
  'Strong networking and computer fundamentals'
),
(
  'cefc3e38-5eba-42c7-b4c2-9896834f3b03',
  2,
  'skill',
  'Learn Cybersecurity Fundamentals',
  'Study networking, operating systems, ethical hacking, security tools, risk assessment, and incident response.',
  '6 to 12 months',
  'Basic computer and networking knowledge',
  'Ability to identify and mitigate security threats'
),
(
  'cefc3e38-5eba-42c7-b4c2-9896834f3b03',
  3,
  'project',
  'Practice Security Labs and Projects',
  'Work on penetration testing labs, vulnerability analysis, and security monitoring projects.',
  '2 to 6 months',
  'Cybersecurity fundamentals',
  'Hands-on security analysis experience'
),
(
  'cefc3e38-5eba-42c7-b4c2-9896834f3b03',
  4,
  'internship',
  'Cybersecurity Internship',
  'Assist security teams with monitoring, auditing, incident handling, and compliance activities.',
  '3 to 6 months',
  'Security projects or certifications',
  'Industry cybersecurity exposure'
),
(
  'cefc3e38-5eba-42c7-b4c2-9896834f3b03',
  5,
  'job',
  'Cybersecurity Analyst',
  'Monitor systems, investigate threats, and improve organizational security posture.',
  '0 to 3 years',
  'Internship or cybersecurity skills',
  'Professional security operations experience'
),
(
  'cefc3e38-5eba-42c7-b4c2-9896834f3b03',
  6,
  'senior_role',
  'Senior Cybersecurity Engineer',
  'Lead security strategy, manage threat detection systems, and guide incident response efforts.',
  '4 to 8 years',
  'Professional cybersecurity experience',
  'Advanced cybersecurity leadership responsibilities'
);



-- =====================================================
-- Cloud Engineer
-- Career ID:
-- f6adc954-8d15-4cff-b37f-94aefb58a427
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  'f6adc954-8d15-4cff-b37f-94aefb58a427',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Study Computer Science, Information Technology, Software Engineering, or a related field.',
  '3 to 4 years',
  '12th pass with science',
  'Strong computing and networking fundamentals'
),
(
  'f6adc954-8d15-4cff-b37f-94aefb58a427',
  2,
  'skill',
  'Learn Cloud Computing Technologies',
  'Master AWS, Azure, Google Cloud, Linux, networking, virtualization, containers, and DevOps basics.',
  '6 to 12 months',
  'Basic programming and networking knowledge',
  'Ability to deploy and manage cloud infrastructure'
),
(
  'f6adc954-8d15-4cff-b37f-94aefb58a427',
  3,
  'project',
  'Build Cloud Infrastructure Projects',
  'Create projects involving cloud deployments, CI/CD pipelines, scalable applications, and infrastructure automation.',
  '2 to 6 months',
  'Cloud computing fundamentals',
  'Practical cloud engineering portfolio'
),
(
  'f6adc954-8d15-4cff-b37f-94aefb58a427',
  4,
  'internship',
  'Cloud Engineering Internship',
  'Assist teams with cloud deployment, monitoring, automation, and infrastructure management.',
  '3 to 6 months',
  'Cloud projects or certifications',
  'Hands-on cloud operations experience'
),
(
  'f6adc954-8d15-4cff-b37f-94aefb58a427',
  5,
  'job',
  'Cloud Engineer',
  'Manage cloud systems, optimize infrastructure, and support scalable cloud applications.',
  '0 to 3 years',
  'Internship or cloud skills',
  'Professional cloud engineering experience'
),
(
  'f6adc954-8d15-4cff-b37f-94aefb58a427',
  6,
  'senior_role',
  'Senior Cloud Architect',
  'Design enterprise cloud architecture, lead migrations, and optimize cloud security and scalability.',
  '4 to 8 years',
  'Professional cloud engineering experience',
  'Leadership in cloud infrastructure and architecture'
);

-- =====================================================
-- DevOps Engineer
-- Career ID:
-- 7152bde5-38cb-47ce-9249-73c74edf336f
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  '7152bde5-38cb-47ce-9249-73c74edf336f',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Study Computer Science, Information Technology, Software Engineering, or a related field.',
  '3 to 4 years',
  '12th pass with science',
  'Strong software and infrastructure fundamentals'
),
(
  '7152bde5-38cb-47ce-9249-73c74edf336f',
  2,
  'skill',
  'Learn DevOps and Infrastructure Tools',
  'Master Linux, Git, Docker, Kubernetes, CI/CD pipelines, cloud platforms, scripting, and monitoring tools.',
  '6 to 12 months',
  'Basic programming and networking knowledge',
  'Ability to automate and manage software delivery pipelines'
),
(
  '7152bde5-38cb-47ce-9249-73c74edf336f',
  3,
  'project',
  'Build DevOps Automation Projects',
  'Create CI/CD workflows, containerized applications, cloud deployments, and infrastructure automation projects.',
  '2 to 6 months',
  'DevOps fundamentals and cloud basics',
  'Practical DevOps engineering portfolio'
),
(
  '7152bde5-38cb-47ce-9249-73c74edf336f',
  4,
  'internship',
  'DevOps Internship',
  'Assist engineering teams with deployment automation, monitoring, infrastructure management, and cloud operations.',
  '3 to 6 months',
  'Projects or DevOps certifications',
  'Hands-on DevOps experience'
),
(
  '7152bde5-38cb-47ce-9249-73c74edf336f',
  5,
  'job',
  'DevOps Engineer',
  'Manage deployment pipelines, cloud infrastructure, automation systems, and operational reliability.',
  '0 to 3 years',
  'Internship or DevOps portfolio',
  'Professional DevOps engineering experience'
),
(
  '7152bde5-38cb-47ce-9249-73c74edf336f',
  6,
  'senior_role',
  'Senior DevOps Architect',
  'Lead infrastructure automation strategy, scalability planning, and cloud operations optimization.',
  '4 to 8 years',
  'Professional DevOps experience',
  'Leadership in infrastructure and automation engineering'
);



-- =====================================================
-- Mobile App Developer
-- Career ID:
-- 455aae5c-0498-4b8c-9614-1a819712f1fb
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  '455aae5c-0498-4b8c-9614-1a819712f1fb',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Study Computer Science, Information Technology, Software Engineering, or a related field.',
  '3 to 4 years',
  '12th pass with science',
  'Strong programming and software development foundation'
),
(
  '455aae5c-0498-4b8c-9614-1a819712f1fb',
  2,
  'skill',
  'Learn Mobile App Development',
  'Master Android, iOS, Flutter, React Native, APIs, databases, and mobile UI principles.',
  '6 to 12 months',
  'Basic programming knowledge',
  'Ability to build mobile applications'
),
(
  '455aae5c-0498-4b8c-9614-1a819712f1fb',
  3,
  'project',
  'Build Mobile Application Projects',
  'Create real-world apps such as productivity tools, social apps, or e-commerce applications.',
  '2 to 6 months',
  'Mobile development fundamentals',
  'Professional mobile app portfolio'
),
(
  '455aae5c-0498-4b8c-9614-1a819712f1fb',
  4,
  'internship',
  'Mobile App Development Internship',
  'Work with teams on app features, testing, deployment, and performance optimization.',
  '3 to 6 months',
  'Portfolio projects and programming skills',
  'Industry mobile development experience'
),
(
  '455aae5c-0498-4b8c-9614-1a819712f1fb',
  5,
  'job',
  'Mobile App Developer',
  'Build, maintain, and optimize applications for Android, iOS, or cross-platform environments.',
  '0 to 3 years',
  'Internship or app portfolio',
  'Professional mobile engineering experience'
),
(
  '455aae5c-0498-4b8c-9614-1a819712f1fb',
  6,
  'senior_role',
  'Senior Mobile Engineer',
  'Lead mobile architecture, mentor developers, and optimize application scalability and performance.',
  '4 to 8 years',
  'Professional mobile development experience',
  'Advanced mobile engineering leadership'
);



-- =====================================================
-- Graphic Designer
-- Career ID:
-- 5bd9eb7f-b41b-4590-853f-513221982b19
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  '5bd9eb7f-b41b-4590-853f-513221982b19',
  1,
  'education',
  'Complete Bachelor''s Degree or Design Course',
  'Study graphic design, visual communication, fine arts, multimedia, or a related field.',
  '1 to 4 years',
  '12th pass',
  'Foundational design and visual communication knowledge'
),
(
  '5bd9eb7f-b41b-4590-853f-513221982b19',
  2,
  'skill',
  'Learn Graphic Design Tools and Principles',
  'Master Photoshop, Illustrator, typography, color theory, branding, and layout design.',
  '4 to 12 months',
  'Basic computer and creativity skills',
  'Ability to create professional visual designs'
),
(
  '5bd9eb7f-b41b-4590-853f-513221982b19',
  3,
  'project',
  'Build Graphic Design Portfolio',
  'Create branding projects, posters, social media creatives, packaging, and marketing materials.',
  '2 to 6 months',
  'Graphic design fundamentals',
  'Professional design portfolio'
),
(
  '5bd9eb7f-b41b-4590-853f-513221982b19',
  4,
  'internship',
  'Graphic Design Internship',
  'Work with creative teams on branding, advertisements, digital media, and visual campaigns.',
  '3 to 6 months',
  'Portfolio and design software proficiency',
  'Practical design industry experience'
),
(
  '5bd9eb7f-b41b-4590-853f-513221982b19',
  5,
  'job',
  'Graphic Designer',
  'Create digital and print visual content for brands, marketing campaigns, and media platforms.',
  '0 to 3 years',
  'Internship or design portfolio',
  'Professional graphic design experience'
),
(
  '5bd9eb7f-b41b-4590-853f-513221982b19',
  6,
  'senior_role',
  'Senior Graphic Designer',
  'Lead branding projects, mentor junior designers, and manage creative direction.',
  '4 to 8 years',
  'Professional design experience',
  'Leadership in creative and visual design'
);

-- =====================================================
-- Interior Designer
-- Career ID:
-- a10800c5-36c3-4ebc-8ac7-272a88a44552
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  'a10800c5-36c3-4ebc-8ac7-272a88a44552',
  1,
  'education',
  'Complete Bachelor''s Degree or Design Course',
  'Study interior design, architecture, spatial planning, or a related field.',
  '3 to 4 years',
  '12th pass',
  'Foundational knowledge of interior and spatial design'
),
(
  'a10800c5-36c3-4ebc-8ac7-272a88a44552',
  2,
  'skill',
  'Learn Interior Design Tools and Concepts',
  'Master AutoCAD, SketchUp, space planning, lighting, materials, color theory, and furniture design.',
  '6 to 12 months',
  'Basic design understanding',
  'Ability to create functional and aesthetic interior spaces'
),
(
  'a10800c5-36c3-4ebc-8ac7-272a88a44552',
  3,
  'project',
  'Build Interior Design Portfolio',
  'Create residential, office, retail, or commercial interior design concepts and 3D visualizations.',
  '2 to 6 months',
  'Interior design fundamentals',
  'Professional interior design portfolio'
),
(
  'a10800c5-36c3-4ebc-8ac7-272a88a44552',
  4,
  'internship',
  'Interior Design Internship',
  'Assist senior designers with site visits, client presentations, layouts, and material selection.',
  '3 to 6 months',
  'Portfolio and design software proficiency',
  'Practical industry experience'
),
(
  'a10800c5-36c3-4ebc-8ac7-272a88a44552',
  5,
  'job',
  'Interior Designer',
  'Design and execute interior spaces for residential, commercial, and hospitality projects.',
  '0 to 3 years',
  'Internship or design portfolio',
  'Professional interior design experience'
),
(
  'a10800c5-36c3-4ebc-8ac7-272a88a44552',
  6,
  'senior_role',
  'Senior Interior Designer',
  'Lead design projects, manage client relationships, and oversee complete interior execution.',
  '4 to 8 years',
  'Professional interior design experience',
  'Leadership in interior and spatial design'
);



-- =====================================================
-- Financial Analyst
-- Career ID:
-- 4938f881-caa9-48d6-9653-efe1a4d8b302
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  '4938f881-caa9-48d6-9653-efe1a4d8b302',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Study finance, accounting, economics, commerce, or a related field.',
  '3 to 4 years',
  '12th pass',
  'Strong financial and analytical foundation'
),
(
  '4938f881-caa9-48d6-9653-efe1a4d8b302',
  2,
  'skill',
  'Learn Financial Analysis Skills',
  'Master Excel, financial modeling, accounting principles, budgeting, forecasting, and market analysis.',
  '6 to 12 months',
  'Basic mathematics and finance understanding',
  'Ability to analyze financial performance and trends'
),
(
  '4938f881-caa9-48d6-9653-efe1a4d8b302',
  3,
  'project',
  'Build Financial Case Studies',
  'Work on company valuation, investment analysis, forecasting models, and financial reports.',
  '2 to 6 months',
  'Financial analysis fundamentals',
  'Portfolio demonstrating financial problem-solving'
),
(
  '4938f881-caa9-48d6-9653-efe1a4d8b302',
  4,
  'internship',
  'Financial Analyst Internship',
  'Assist finance teams with budgeting, reporting, forecasting, and market research activities.',
  '3 to 6 months',
  'Finance coursework or projects',
  'Industry financial analysis exposure'
),
(
  '4938f881-caa9-48d6-9653-efe1a4d8b302',
  5,
  'job',
  'Financial Analyst',
  'Analyze financial data, prepare reports, and support business and investment decisions.',
  '0 to 3 years',
  'Internship or finance portfolio',
  'Professional finance and analytics experience'
),
(
  '4938f881-caa9-48d6-9653-efe1a4d8b302',
  6,
  'senior_role',
  'Senior Financial Analyst',
  'Lead financial planning, investment analysis, and strategic business forecasting.',
  '4 to 8 years',
  'Professional finance experience',
  'Leadership in corporate finance and analytics'
);



-- =====================================================
-- Human Resources Manager
-- Career ID:
-- 7c00eefd-fab5-49f4-9012-f7ae65dac6bf
-- =====================================================

insert into public.career_paths (
  career_id,
  step_order,
  stage_type,
  title,
  description,
  duration,
  requirements,
  outcome
)
values
(
  '7c00eefd-fab5-49f4-9012-f7ae65dac6bf',
  1,
  'education',
  'Complete Bachelor''s Degree',
  'Study human resources, business administration, psychology, or a related field.',
  '3 to 4 years',
  '12th pass',
  'Foundational understanding of business and people management'
),
(
  '7c00eefd-fab5-49f4-9012-f7ae65dac6bf',
  2,
  'skill',
  'Learn Human Resources Fundamentals',
  'Study recruitment, employee relations, labor laws, payroll, performance management, and communication skills.',
  '4 to 12 months',
  'Basic business understanding',
  'Ability to manage HR operations and employee processes'
),
(
  '7c00eefd-fab5-49f4-9012-f7ae65dac6bf',
  3,
  'project',
  'Work on HR Case Studies and Processes',
  'Practice hiring workflows, employee engagement plans, policy drafting, and conflict resolution scenarios.',
  '2 to 6 months',
  'HR fundamentals',
  'Practical understanding of HR operations'
),
(
  '7c00eefd-fab5-49f4-9012-f7ae65dac6bf',
  4,
  'internship',
  'Human Resources Internship',
  'Assist HR teams with recruitment, onboarding, employee records, and workplace coordination.',
  '3 to 6 months',
  'HR coursework or projects',
  'Hands-on HR industry experience'
),
(
  '7c00eefd-fab5-49f4-9012-f7ae65dac6bf',
  5,
  'job',
  'Human Resources Executive',
  'Handle recruitment, employee engagement, policy implementation, and HR administration tasks.',
  '0 to 3 years',
  'Internship or HR skills',
  'Professional human resources experience'
),
(
  '7c00eefd-fab5-49f4-9012-f7ae65dac6bf',
  6,
  'senior_role',
  'Human Resources Manager',
  'Lead HR strategy, talent acquisition, employee development, and organizational culture initiatives.',
  '4 to 8 years',
  'Professional HR experience',
  'Leadership in human resources management'
);


INSERT INTO bookmarked_resources (user_id, resource_id)
VALUES
    ('b5730fd4-673f-4d98-8a4d-9d9ae8c32701', '09402cdd-d3b2-4d15-99fb-2a442dae74dc'),
    ('b5730fd4-673f-4d98-8a4d-9d9ae8c32701', '0c585be9-6c46-4709-8344-8b63395ce79e'),
    ('b5730fd4-673f-4d98-8a4d-9d9ae8c32701', '0cad1566-27e0-4da7-98cd-600483a110d6'),
    ('ec22a829-1057-43e3-ad27-fb528318ddea', '0ec31850-023c-4364-9fd3-b9f390d86e47'),
    ('ec22a829-1057-43e3-ad27-fb528318ddea', '0ef86871-bb02-406a-a72e-91a7c0016788'),
    ('ec22a829-1057-43e3-ad27-fb528318ddea', '1069c2b1-60ea-4bc5-9e6e-e685122d56bf');