const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "campuscare"
});

// Test MySQL connection
db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
    } else {
        console.log("MySQL connected successfully!");
    }
});

// Home route
app.get("/", (req, res) => {
    res.send("CampusCare Backend is Running!");
});


// ========================================
// SUBMIT COMPLAINT
// ========================================

app.post("/complaints", (req, res) => {

    const {
        student_name,
        email,
        complaint_type,
        description
    } = req.body;

    const sql = `
        INSERT INTO complaints
        (student_name, email, complaint_type, description, status)
        VALUES (?, ?, ?, ?, 'Pending')
    `;

    db.query(
        sql,
        [student_name, email, complaint_type, description],
        (err, result) => {

            if (err) {
                console.log("Complaint insert error:", err);

                return res.status(500).json({
                    message: "Failed to submit complaint"
                });
            }

            res.json({
                message: "Complaint submitted successfully!"
            });
        }
    );
});


// ========================================
// UPDATE COMPLAINT STATUS
// ========================================

app.put("/complaints/:id", (req, res) => {

    const complaintId = req.params.id;

    const sql = `
        UPDATE complaints
        SET status = 'Resolved'
        WHERE id = ?
    `;

    db.query(sql, [complaintId], (err, result) => {

        if (err) {
            console.log("Status update error:", err);

            return res.status(500).json({
                message: "Failed to update complaint"
            });
        }

        res.json({
            message: "Complaint marked as Resolved"
        });
    });
});


// ========================================
// GET ALL COMPLAINTS
// ========================================

app.get("/complaints", (req, res) => {

    const sql = "SELECT * FROM complaints ORDER BY id DESC";

    db.query(sql, (err, results) => {

        if (err) {
            console.log("Error fetching complaints:", err);

            return res.status(500).json({
                message: "Failed to fetch complaints"
            });
        }

        res.json(results);
    });
});


// ========================================
// START SERVER
// ========================================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `CampusCare server running on http://localhost:${PORT}`
    );
});