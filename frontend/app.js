const API = window.location.origin + '/api/timetable';
const fields = ['course_code','course_name','lecturer','day_of_week','start_time','end_time','venue','goal'];
const tbody = document.getElementById('tableBody');
const form = document.getElementById('recordForm');
const recordId = document.getElementById('recordId');
const submitBtn = document.getElementById('submitBtn');

async function loadRecords() {
  const res = await fetch(API);
  const data = await res.json();
  tbody.innerHTML = data.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${r.course_code}</td>
      <td>${r.course_name}</td>
      <td>${r.lecturer || ''}</td>
      <td>${r.day_of_week || ''}</td>
      <td>${r.start_time || ''}</td>
      <td>${r.end_time || ''}</td>
      <td>${r.venue || ''}</td>
      <td>${r.goal || ''}</td>
      <td>
        <button class="btn-edit" onclick='editRecord(${JSON.stringify(r)})'>Edit</button>
        <button class="btn-del" onclick="deleteRecord(${r.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function editRecord(record) {
  recordId.value = record.id;
  fields.forEach(f => document.getElementById(f).value = record[f] || '');
  submitBtn.textContent = 'Update';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  form.reset();
  recordId.value = '';
  submitBtn.textContent = 'Create';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {};
  fields.forEach(f => payload[f] = document.getElementById(f).value || null);
  const id = recordId.value;
  const url = id ? `${API}/${id}` : API;
  const method = id ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json();
    alert(`Error: ${err.error}`);
    return;
  }
  resetForm();
  loadRecords();
});

async function deleteRecord(id) {
  if (!confirm('Delete this record?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadRecords();
}

loadRecords();