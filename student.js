// =========================
// CAMPUSCARE STUDENT DASHBOARD
// =========================


// Check Login

const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


// Get Student ID

const studentId = localStorage.getItem("studentId");


// Display Student ID

const studentName = document.getElementById("studentName");

if (studentName && studentId) {
    studentName.textContent = studentId;
}


// =========================
// LOAD COMPLAINTS
// =========================

const allComplaints =
    JSON.parse(localStorage.getItem("complaints")) || [];


// Only show complaints of current student

const myComplaints = allComplaints.filter(function(complaint) {

    return complaint.studentId === studentId;

});


// =========================
// COUNT COMPLAINTS
// =========================

const total = myComplaints.length;

const pending = myComplaints.filter(function(complaint) {

    return complaint.status === "Pending";

}).length;


const solved = myComplaints.filter(function(complaint) {

    return complaint.status === "Solved";

}).length;


// Display counts

document.getElementById("totalComplaints").textContent = total;

document.getElementById("pendingComplaints").textContent = pending;

document.getElementById("solvedComplaints").textContent = solved;


// =========================
// DISPLAY COMPLAINT LIST
// =========================

const complaintList =
    document.getElementById("complaintList");


if (myComplaints.length > 0) {

    complaintList.innerHTML = "";


    // Show latest complaints first

    myComplaints.reverse();


    myComplaints.forEach(function(complaint) {

        const complaintBox =
            document.createElement("div");

        complaintBox.className = "complaint-item";


        complaintBox.innerHTML = `

            <div class="complaint-info">

                <h3>
                    ${complaint.title}
                </h3>

                <p>
                    📂 Category: ${complaint.category}
                </p>

                <p>
                    📍 Location: ${complaint.location}
                </p>

                <p>
                    📝 ${complaint.description}
                </p>

                <small>
                    📅 ${complaint.date}
                </small>

            </div>

            <div class="complaint-status">

                <span class="status-badge">
                    ${complaint.status}
                </span>

            </div>

        `;


        complaintList.appendChild(complaintBox);

    });

}


// =========================
// GO TO COMPLAINT PAGE
// =========================

function goToComplaint() {

    window.location.href = "complaint.html";

}


// =========================
// SELECT CATEGORY
// =========================

function reportCategory(category) {

    localStorage.setItem(
        "selectedCategory",
        category
    );

    window.location.href = "complaint.html";

}


// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("studentId");

    window.location.href = "index.html";

}