CREATE TABLE IF NOT EXISTS timetable (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  course_code  VARCHAR(20)  NOT NULL,
  course_name  VARCHAR(150) NOT NULL,
  lecturer     VARCHAR(120),
  day_of_week  VARCHAR(15),
  start_time   VARCHAR(10),
  end_time     VARCHAR(10),
  venue        VARCHAR(100),
  goal         VARCHAR(255),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO timetable (course_code, course_name, lecturer, day_of_week, start_time, end_time, venue, goal) VALUES
('ICT251', 'Web Application Development', 'Mr. Banda',  'Monday',    '08:00', '10:00', 'Lab A',  'Score 80% in final exam'),
('ICT210', 'Database Systems',            'Dr. Phiri',  'Monday',    '10:30', '12:30', 'Room 12','Master SQL joins'),
('ICT231', 'Operating Systems',           'Ms. Zulu',   'Tuesday',   '08:00', '10:00', 'Room 5', 'Understand process scheduling'),
('MAT101', 'Discrete Mathematics',        'Mr. Mwale',  'Tuesday',   '14:00', '16:00', 'LT 2',   'Complete all assignments'),
('ICT205', 'Computer Networks',           'Dr. Tembo',  'Wednesday', '08:00', '10:00', 'Lab B',  'Build a LAN project'),
('ICT240', 'Software Engineering',        'Ms. Chanda', 'Wednesday', '10:30', '12:30', 'Room 8', 'Ace the group project'),
('ICT260', 'Mobile Application Dev',      'Mr. Sakala', 'Thursday',  '08:00', '10:00', 'Lab C',  'Publish a sample app'),
('ENG102', 'Technical Communication',     'Mrs. Nkosi', 'Thursday',  '14:00', '15:30', 'LT 1',   'Improve report writing'),
('ICT270', 'Cyber Security Basics',       'Dr. Mulenga','Friday',    '08:00', '10:00', 'Lab D',  'Pass a security quiz'),
('ICT280', 'Data Structures & Algorithms','Mr. Nyirenda','Friday',   '10:30', '12:30', 'Room 10','Solve 50 practice problems');