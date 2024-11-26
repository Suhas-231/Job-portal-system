// Registration functionality
document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const userType = document.getElementById("user-type").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const formData = new FormData();
        formData.append("user_type", userType);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        fetch("/register", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registration successful! Please login to continue.");
                window.location.href = "/login";
            } else {
                alert("Registration failed. Please try again.");
            }
        })
        .catch(error => console.error(error));
    });
});

// Login functionality
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        fetch("/login", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (data.user_type === "applicant") {
                    window.location.href = "/applicant-dashboard";
                } else if (data.user_type === "company") {
                    window.location.href = "/company-dashboard";
                }
            } else {
                alert("Login failed. Please try again.");
            }
        })
        .catch(error => console.error(error));
    });
});

// Logout functionality
document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", function() {
        fetch("/logout", {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "/login";
            } else {
                alert("Logout failed. Please try again.");
            }
        })
        .catch(error => console.error(error));
    });
});

// Applicant Dashboard functionality
document.addEventListener("DOMContentLoaded", function() {
    const applicantDashboardForm = document.getElementById("applicant-dashboard-form");
    applicantDashboardForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(applicantDashboardForm);
        fetch("/applicant-dashboard", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Details saved successfully!");

                const jobPostingsContainer = document.getElementById("job-postings");
                jobPostingsContainer.innerHTML = "<h3>Matched Job Postings:</h3>";

                data.job_postings.forEach(job => {
                    const jobElement = document.createElement("div");
                    jobElement.innerHTML = `
                        <h1><strong>Job Title:</strong> ${job[2]}</h1>
                        <p><strong>Job Description:</strong> ${job[3]}</p>
                        <p><strong>Job Domain:</strong> ${job[4]}</p>
                        <p><strong>Qualifications:</strong> ${job[5]}</p>
                        <p><strong>Vacancies:</strong> ${job[6]}</p>
                    `;
                    jobPostingsContainer.appendChild(jobElement);
                });
            } else {
                alert("Failed to save details. Please try again.");
            }
        })
        .catch(error => console.error(error));
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const companyForm = document.getElementById("company-dashboard-form");
    const jobPostingsContainer = document.getElementById("job-postings");

    companyForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(companyForm);

        fetch("/company-dashboard", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Display success message
                alert("Job posted successfully!");

                // Clear previous job postings
                jobPostingsContainer.innerHTML = "";

                // Display job postings
                if (data.job_postings.length > 0) {
                    let html = "<h2>All Job Postings:</h2>";
                    data.job_postings.forEach(posting => {
                        html += `
                            <div class="job-posting">
                                <h1>${posting.job_title}</h1>
                                <p><strong>Description:</strong> ${posting.job_description}</p>
                                <p><strong>Domain:</strong> ${posting.job_domain}</p>
                                <p><strong>Qualifications:</strong> ${posting.qualifications}</p>
                                <p><strong>Vacancies:</strong> ${posting.vacancies}</p>
                            </div>
                        `;
                    });
                    jobPostingsContainer.innerHTML = html;
                } else {
                    jobPostingsContainer.innerHTML = "<p>No job postings available.</p>";
                }
            } else {
                alert("Failed to post job.");
            }
        })
        .catch(error => console.error(error));
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("register-form");
    
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const userType = document.getElementById("userType").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        const formData = new FormData();
        formData.append("user_type", userType);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        
        fetch("/register", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showPopup("Registration successful!");
            } else {
                showPopup("Registration failed: " + data.error);
            }
        })
        .catch(error => {
            console.error(error);
            showPopup("An error occurred. Please try again.");
        });
    });

    function showPopup(message) {
        const popupMessage = document.getElementById("popupMessage");
        popupMessage.textContent = message;
        const popup = document.getElementById("popup");
        const overlay = document.getElementById("overlay");
        popup.style.display = "block";
        overlay.style.display = "block";
    }

    function hidePopup() {
        const popup = document.getElementById("popup");
        const overlay = document.getElementById("overlay");
        popup.style.display = "none";
        overlay.style.display = "none";
    }

    document.getElementById("popupCloseButton").addEventListener("click", hidePopup);
});

