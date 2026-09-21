
import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

import { app } from "./firebase-config.js";


// Firebase
const auth = getAuth(app);
const db = getFirestore(app);


// Login form
const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Get username and password
    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;


    // Check fields
    if (username === "" || password === "") {

        alert("Please enter your username and password.");

        return;
    }


    try {

        // Find the username in Firestore
        const usersRef = collection(db, "users");

        const usernameQuery = query(
            usersRef,
            where("username", "==", username)
        );

        const querySnapshot =
            await getDocs(usernameQuery);


        // Username doesn't exist
        if (querySnapshot.empty) {

            alert("Username not found ❌");

            return;
        }


        // Get the user's Firestore information
        const userDocument =
            querySnapshot.docs[0];

        const userData =
            userDocument.data();


        // Get the email connected to that username
        const email =
            userData.email;


        // Login through Firebase Authentication
        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        // Save current user
        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                uid: user.uid,
                username: username,
                email: user.email
            })
        );


        // Successful login
        alert("Login successful! 🎉");


        // Go to dashboard
        window.location.href =
            "dashboard.html";


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            alert(
                "Incorrect username or password ❌"
            );

        }

        else if (
            error.code ===
            "auth/wrong-password"
        ) {

            alert(
                "Incorrect username or password ❌"
            );

        }

        else if (
            error.code ===
            "auth/user-not-found"
        ) {

            alert(
                "This account could not be found ❌"
            );

        }

        else {

            alert(
                "Login failed. Please try again."
            );

        }

    }

});

