function register() {


// Get the values from the form

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


// Clear old message

message.textContent = "";

message.style.color = "";


// Check that all fields are filled

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


// Check username length

if (username.length < 3) {

    message.textContent =
        "Username must be at least 3 characters.";

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


// Check that passwords match

if (password !== confirmPassword) {

    message.textContent =
        "Passwords do not match.";

    message.style.color = "red";

    return;
}


// Get existing accounts

const users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];


// Check whether username already exists

const usernameExists =
    users.some(function(user) {

        return (
            user.username.toLowerCase() ===
            username.toLowerCase()
        );

    });


if (usernameExists) {

    message.textContent =
        "That username is already taken.";

    message.style.color = "red";

    return;
}


// Check whether email already exists

const emailExists =
    users.some(function(user) {

        return (
            user.email.toLowerCase() ===
            email.toLowerCase()
        );

    });


if (emailExists) {

    message.textContent =
        "That email is already registered.";

    message.style.color = "red";

    return;
}


// Create the new account

const newUser = {

    username: username,

    email: email,

    password: password

};


// Add the new account to the users list

users.push(newUser);


// Save all accounts

localStorage.setItem(
    "users",
    JSON.stringify(users)
);


// Show success message

message.textContent =
    "Account created successfully! 🎉";

message.style.color = "green";


// Disable the button temporarily

const button =
    document.querySelector(".register-button");

button.disabled = true;

button.textContent =
    "Account Created ✓";


// Send user to the home page

setTimeout(function() {

    window.location.href =
        "home.html";

}, 1000);
```

}

// Connect the registration form

document
.getElementById("registerForm")
.addEventListener(
"submit",
function(event) {

```
        event.preventDefault();

        register();

    }
);

