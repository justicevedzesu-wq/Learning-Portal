function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;


    if (username === "" || password === "") {
        alert("Please enter your username and password.");
        return;
    }


    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    const user = users.find(
        account =>
            account.username === username &&
            account.password === password
    );


    if (user) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Login successful! 🎉");

        window.location.href = "dashboard.html";

    } else {

        alert("Incorrect username or password ❌");

    }
}


document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        login();

    });
