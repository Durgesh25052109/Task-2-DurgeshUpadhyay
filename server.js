const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary data (stored in memory)
let students = [
  {
    id: 1,
    name: "Durgesh",
    course: "CSE"
  }
];

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Backend API is Working!"
  });
});

// Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Add a new student
app.post("/students", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      error: "Name and Course are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// Get student by ID
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  res.json(student);
});

// Delete student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  students = students.filter(s => s.id !== id);

  res.json({
    message: "Student deleted successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});