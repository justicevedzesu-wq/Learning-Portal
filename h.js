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


    // Find matching account

    const user =
        users.find(
            account =>
                account.username === username &&
                account.password === password
        );


    // Login successful

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

    }

    // Login failed

    else {

        alert(
            "Incorrect username or password ❌"
        );

    }
}


// Login form

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            login();

        }
    );
