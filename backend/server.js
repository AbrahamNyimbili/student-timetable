require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

app.get('/api/timetable', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM timetable ORDER BY id').all();
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/timetable/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM timetable WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Record not found' });
    res.json(row);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/timetable', (req, res) => {
  try {
    const { course_code, course_name, lecturer, day_of_week, start_time, end_time, venue, goal } = req.body;
    if (!course_code || !course_name) return res.status(400).json({ error: 'course_code and course_name are required' });
    
    const info = db.prepare(`
      INSERT INTO timetable (course_code, course_name, lecturer, day_of_week, start_time, end_time, venue, goal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(course_code, course_name, lecturer, day_of_week, start_time, end_time, venue, goal);
    
    const newRow = db.prepare('SELECT * FROM timetable WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newRow);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/timetable/:id', (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM timetable WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Record not found' });

    const { course_code = existing.course_code, course_name = existing.course_name, lecturer = existing.lecturer, day_of_week = existing.day_of_week, start_time = existing.start_time, end_time = existing.end_time, venue = existing.venue, goal = existing.goal } = req.body;

    db.prepare(`
      UPDATE timetable SET course_code = ?, course_name = ?, lecturer = ?, day_of_week = ?, start_time = ?, end_time = ?, venue = ?, goal = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(course_code, course_name, lecturer, day_of_week, start_time, end_time, venue, goal, req.params.id);

    const updated = db.prepare('SELECT * FROM timetable WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/timetable/:id', (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM timetable WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Record not found' });
    db.prepare('DELETE FROM timetable WHERE id = ?').run(req.params.id);
    res.json({ message: 'Deleted successfully', id: Number(req.params.id) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});