function register() {

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("message");


    // Check required fields
    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }


    // Check password length
    if (password.length < 6) {
        message.textContent =
            "Password must be at least 6 characters.";
        message.style.color = "red";
        return;
    }


    // Check passwords
    if (password !== confirmPassword) {
        message.textContent =
            "Passwords do not match.";
        message.style.color = "red";
        return;
    }


    // Get existing users
    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    // Check username
    const usernameExists =
        users.some(function (account) {
            return account.username.toLowerCase() ===
                   username.toLowerCase();
        });

    if (usernameExists) {
        message.textContent =
            "Username already exists!";
        message.style.color = "red";
        return;
    }


    // Check email
    const emailExists =
        users.some(function (account) {
            return account.email.toLowerCase() ===
                   email.toLowerCase();
        });

    if (emailExists) {
        message.textContent =
            "Email is already registered!";
        message.style.color = "red";
        return;
    }


    // Create account
    const newUser = {

        username: username,

        email: email,

        password: password

    };


    // Add user
    users.push(newUser);


    // Save users
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    // Success message
    message.textContent =
        "Account created successfully! 🎉";

    message.style.color = "green";


    // Go to login page
    setTimeout(function () {

        window.location.href = "home.html";

    }, 1200);

}


// Connect form to registration function

document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        register();

    });
