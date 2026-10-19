require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DB_FILE = process.env.DB_FILE || './timetable.db';
const db = new Database(DB_FILE);

const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='timetable'").get();

if (!tableExists) {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);
  console.log('✅ Database initialised with sample records');
}

module.exports = db;