function login() {


const username =
    document.getElementById("username").value.trim();

const password =
    document.getElementById("password").value;


// Check fields

if (
    username === "" ||
    password === ""
) {

    alert(
        "Please enter your username and password."
    );

    return;
}


// Get registered users

const users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];


// Find the matching account

const user =
    users.find(function(account) {

        return (
            account.username === username &&
            account.password === password
        );

    });


// Login successful

if (user) {

    // Save the currently logged-in user

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );


    alert(
        "Login successful! 🎉"
    );


    // Go to dashboard

    window.location.href =
        "dashboard.html";

} else {

    alert(
        "Incorrect username or password ❌"
    );

}
```

}

// Connect login form

document
.getElementById("loginForm")
.addEventListener(
"submit",
function(event) {

```
        event.preventDefault();

        login();

    }
);

