document.addEventListener("DOMContentLoaded", function () {

```
const form = document.getElementById("registerForm");

const message = document.getElementById("message");


if (!form) {

    console.error("registerForm was not found.");

    return;
}


form.addEventListener("submit", function (event) {

    event.preventDefault();


    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check fields

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


    // Check username

    if (username.length < 3) {

        message.textContent =
            "Username must be at least 3 characters.";

        message.style.color = "red";

        return;
    }


    // Check password

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

    let users = [];

    try {

        users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];

    } catch (error) {

        users = [];

    }


    // Make sure users is an array

    if (!Array.isArray(users)) {

        users = [];

    }


    // Check username

    const usernameExists =
        users.some(function (user) {

            return (
                String(user.username || "")
                    .toLowerCase() ===
                username.toLowerCase()
            );

        });


    if (usernameExists) {

        message.textContent =
            "That username is already taken.";

        message.style.color = "red";

        return;
    }


    // Check email

    const emailExists =
        users.some(function (user) {

            return (
                String(user.email || "")
                    .toLowerCase() ===
                email.toLowerCase()
            );

        });


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


    // Save account

    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    // Save current user too

    localStorage.setItem(
        "currentUser",
        JSON.stringify(newUser)
    );


    // Show success

    message.textContent =
        "Account created successfully! 🎉";

    message.style.color = "green";


    // Go directly to home page

    setTimeout(function () {

        window.location.href =
            "home.html";

    }, 500);

});
```

});
