document.addEventListener("DOMContentLoaded", function () {

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
    function (event) {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value;


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


        // Get users

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


        // Find account

        const user =
            users.find(function (account) {

                return (
                    String(account.username || "")
                        .trim()
                        .toLowerCase() ===
                    username.toLowerCase() &&

                    String(account.password || "") ===
                    password
                );

            });


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

        } else {

            alert(
                "Incorrect username or password ❌"
            );

        }

    }
);
```

});
