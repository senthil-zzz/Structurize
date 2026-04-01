var maxAttempts = 3;
var attempts = 0;

document.getElementById("log-into-acc").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Retrieve last login attempt timestamp from localStorage
    var lastAttemptTime = localStorage.getItem("lastAttemptTime");
    var currentTime = new Date().getTime();

    // Check if there's a time restriction and if it's expired
    if (lastAttemptTime && (currentTime - parseInt(lastAttemptTime)) < 60000) { // Restricting to 30 seconds (30000 milliseconds)
        alert("Please wait a moment before attempting to log in again.");
        // Disable form after maximum attempts reached
        document.getElementById("username").disabled = true;
        document.getElementById("password").disabled = true;
        document.querySelector("button[type='submit']").disabled = true;
        return;
    }

    attempts++;

    // Retrieve user credentials from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the entered username and password match any stored user
    var user = users.find(function(user) {
        return user.username === username && user.password === password;
    });

    if (user) {
        alert("Login successful!");
        // Redirect or perform other actions after successful login
        // Redirect to main.html
        window.location.href = "main.html";
        // Reset attempts on successful login
        // After successful login
        localStorage.setItem('isLoggedIn', 'true');
        attempts = 0;
    } else {
        if (attempts < maxAttempts) {
            alert("Invalid username or password. Please try again!");
        } else {
            alert("Maximum login attempts reached. Please try again later.");
            // Disable form after maximum attempts reached
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.querySelector("button[type='submit']").disabled = true;
        }
    }
    // Update last login attempt timestamp in localStorage
    localStorage.setItem("lastAttemptTime", currentTime.toString());
});
