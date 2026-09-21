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


    // Check all fields
    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.textContent =
            "Please fill in all fields.";

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
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    // Check username
    const usernameExists =
        users.some(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
        );


    if (usernameExists) {

        message.textContent =
            "That username is already taken.";

        message.style.color = "red";

        return;
    }


    // Check email
    const emailExists =
        users.some(
            user =>
                user.email.toLowerCase() ===
                email.toLowerCase()
        );


    if (emailExists) {

        message.textContent =
            "That email is already registered.";

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


    // Save account
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    // Success message
    message.textContent =
        "Account created successfully! 🎉";

    message.style.color = "green";


    // Send user to home page
    setTimeout(function () {

        window.location.href = "home.html";

    }, 1000);

}


// Connect registration form
document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            register();

        }
    );
