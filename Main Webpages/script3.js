document.getElementById("register-user").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("rusername").value;
    var password = document.getElementById("rpassword").value;
    var confirmPassword = document.getElementById("repassword").value;

    // Password length validation
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Password and confirm password match validation
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Password character validation (no invalid characters and at least 1 special character)
    var passwordPattern = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
    if (!passwordPattern.test(password)) {
        alert("Password must contain at least 1 special character (!@#$%^&*).");
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    var existingUser = users.find(function(user) {
        return user.username === username;
    });

    if (existingUser) {
        alert("Username already exists. Login instead.");
        window.location.href = "login.html";
        return;
    }
    
    // Add new user to the array
    var newUser = { username: username, password: password };
    users.push(newUser);

    // Save updated array to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
});
