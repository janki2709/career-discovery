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