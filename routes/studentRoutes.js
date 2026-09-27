const express = require("express");

const router = express.Router();

let students = require("../data/students");


// ========================================
// GET ALL STUDENTS
// ========================================

router.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });

});


// ========================================
// GET STUDENT BY ID
// ========================================

router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    res.status(200).json({
        success: true,
        data: student
    });

});


// ========================================
// CREATE STUDENT
// ========================================

router.post("/", (req, res) => {

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {

        return res.status(400).json({
            success: false,
            message: "Name, age, course and email are required"
        });

    }

    const newStudent = {

        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,

        name: name,
        age: age,
        course: course,
        email: email
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });

});


// ========================================
// UPDATE STUDENT
// ========================================

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {

        return res.status(400).json({
            success: false,
            message: "Name, age, course and email are required"
        });

    }

    students[studentIndex] = {

        id: id,
        name: name,
        age: age,
        course: course,
        email: email

    };

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: students[studentIndex]
    });

});


// ========================================
// DELETE STUDENT
// ========================================

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });

});


module.exports = router;
