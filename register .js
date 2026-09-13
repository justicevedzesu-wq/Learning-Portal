import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

import { app } from "./firebase-config.js";


const auth = getAuth(app);
const db = getFirestore(app);


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


    // Show loading message
    message.textContent =
        "Creating your account...";

    message.style.color = "#0879a8";


    // Create Firebase account
    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then(async function (userCredential) {

        const user = userCredential.user;


        // Save username to Firebase Authentication
        await updateProfile(user, {

            displayName: username

        });


        // Save additional user information
        await setDoc(
            doc(db, "users", user.uid),
            {
                username: username,
                email: email,
                createdAt: new Date()
            }
        );


        // Success message
        message.textContent =
            "Account created successfully! 🎉";

        message.style.color = "green";


        // Go to login page
        setTimeout(function () {

            window.location.href = "home.html";

        }, 1200);

    })

    .catch(function (error) {

        console.error(error);


        if (error.code === "auth/email-already-in-use") {

            message.textContent =
                "This email is already registered.";

        }

        else if (error.code === "auth/invalid-email") {

            message.textContent =
                "Please enter a valid email address.";

        }

        else if (error.code === "auth/weak-password") {

            message.textContent =
                "Password is too weak. Use at least 6 characters.";

        }

        else {

            message.textContent =
                "Registration failed. Please try again.";

        }


        message.style.color = "red";

    });

}


// Connect form
document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        register();

    });
