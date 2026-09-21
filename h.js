function login() {

```
const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");


// Make sure the inputs exist

if (!usernameInput || !passwordInput) {

    alert("Login form could not be found.");

    return;
}


const username =
    usernameInput.value.trim();

const password =
    passwordInput.value;


// Check empty fields

if (
    username === "" ||
    password === ""
) {

    alert(
        "Please enter your username and password."
    );

    return;
}


// Get saved users

let savedUsers =
    localStorage.getItem("users");


let users = [];


try {

    users =
        savedUsers
            ? JSON.parse(savedUsers)
            : [];

} catch (error) {

    users = [];

}


// Make sure users is an array

if (!Array.isArray(users)) {

    users = [users];

}


// Find matching user

const user =
    users.find(function(account) {

        if (!account) {
            return false;
        }

        const savedUsername =
            String(account.username || "").trim();

        const savedPassword =
            String(account.password || "");

        return (
            savedUsername.toLowerCase() ===
            username.toLowerCase() &&
            savedPassword === password
        );

    });


// Successful login

if (user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );


    alert(
        "Login successful! 🎉"
    );


    window.location.href =
        "dashboard.html";


    return;
}


// Login failed

alert(
    "Incorrect username or password ❌"
);
```

}

// Connect the login form

document.addEventListener(
"DOMContentLoaded",
function() {

```
    const loginForm =
        document.getElementById("loginForm");


    if (!loginForm) {

        console.error(
            "loginForm was not found."
        );

        return;
    }


    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            login();

        }
    );

}
```

);
