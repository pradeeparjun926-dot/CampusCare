const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const password = document.getElementById("password").value.trim();

    const message = document.getElementById("loginMessage");

    if (studentId === "student01" && password === "12345") {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("studentId", studentId);

        message.textContent = "Login successful!";
        message.style.color = "green";

        setTimeout(function() {
            window.location.href = "student.html";
        }, 500);

    } else {

        message.textContent = "Invalid Student ID or Password!";
        message.style.color = "red";

    }

});