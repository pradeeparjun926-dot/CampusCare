// =========================
// CAMPUSCARE COMPLAINT SYSTEM
// =========================


// Check Login

const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn !== "true") {

    window.location.href = "login.html";

}


// Get Form

const complaintForm =
    document.getElementById("complaintForm");


// Get previously selected category

const selectedCategory =
    localStorage.getItem("selectedCategory");

if (selectedCategory) {

    document.getElementById("category").value =
        selectedCategory;

}


// Submit Complaint

complaintForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const category =
        document.getElementById("category").value;

    const location =
        document.getElementById("location").value.trim();

    const title =
        document.getElementById("title").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const studentId =
        localStorage.getItem("studentId");


    // Send complaint to MySQL through backend

    try {

        
            const response= await
            fetch("http://127.0.0.1:5000/complaints",{

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                student_name: studentId,
                email: "",
                complaint_type: category,
                description: `${title} - ${location} - ${description}`

            })

        });


        const result = await response.json();


        if (response.ok) {

            const message =
                document.getElementById("complaintMessage");

            message.textContent =
                "✅ Complaint submitted successfully!";

            message.style.color = "green";

            complaintForm.reset();

            localStorage.removeItem("selectedCategory");


            setTimeout(function() {

                window.location.href = "student.html";

            }, 1500);

        } else {

            alert("❌ Failed to submit complaint");

        }


    } catch (error) {

        console.error("Error:", error);

        alert("❌ Cannot connect to CampusCare server");

    }

});


// Logout

function logout() {

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("studentId");

    window.location.href = "index.html";

}


