
import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

import { app } from "./firebase-config.js";


// Connect to Firebase Authentication
const auth = getAuth(app);


// Get login form
const loginForm =
    document.getElementById("loginForm");


// Handle login
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    // Check fields
    if (email === "" || password === "") {

        alert("Please enter your email and password.");

        return;
    }


    // Login with Firebase
    signInWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then(function (userCredential) {

        const user =
            userCredential.user;


        // Save current user information
        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                uid: user.uid,
                email: user.email,
                username: user.displayName
            })
        );


        alert("Login successful! 🎉");


        // Open dashboard
        window.location.href =
            "dashboard.html";

    })

    .catch(function (error) {

        console.error(
            "Firebase login error:",
            error
        );


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            alert(
                "Incorrect email or password ❌"
            );

        }

        else if (
            error.code ===
            "auth/user-not-found"
        ) {

            alert(
                "No account was found with this email ❌"
            );

        }

        else if (
            error.code ===
            "auth/wrong-password"
        ) {

            alert(
                "Incorrect password ❌"
            );

        }

        else if (
            error.code ===
            "auth/invalid-email"
        ) {

            alert(
                "Please enter a valid email address."
            );

        }

        else {

            alert(
                "Login failed: " +
                error.message
            );

        }

    });

});

