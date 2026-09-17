import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

import { auth } from "./firebase-config.js";

const db = getFirestore();

const registerForm =
    document.getElementById("registerForm");

const message =
    document.getElementById("message");


registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check passwords
    if (password !== confirmPassword) {

        message.textContent =
            "❌ Passwords do not match.";

        message.style.color = "red";

        return;
    }


    // Check minimum password length
    if (password.length < 6) {

        message.textContent =
            "❌ Password must be at least 6 characters.";

        message.style.color = "red";

        return;
    }


    // Show loading message
    message.textContent =
        "Creating your account...";

    message.style.color = "#2563eb";


    try {

        // Create Firebase account
        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        // Add username to Firebase profile
        await updateProfile(user, {
            displayName: username
        });


        // Save user information in Firestore
        await setDoc(
            doc(db, "users", user.uid),
            {
                username: username,
                email: email,
                uid: user.uid,
                emailVerified: false,
                createdAt: new Date()
            }
        );


        // Send verification email
        await sendEmailVerification(user);


        // Success message
        message.innerHTML =
            "✅ Account created!<br><br>" +
            "📧 A verification email has been sent to " +
            email +
            ".<br><br>" +
            "Please check your inbox and click the verification link.";

        message.style.color = "#16a34a";


        // Clear form
        registerForm.reset();


    } catch (error) {

        console.error("Registration error:", error);


        if (error.code === "auth/email-already-in-use") {

            message.textContent =
                "❌ This email is already registered.";

        } else if (error.code === "auth/invalid-email") {

            message.textContent =
                "❌ Please enter a valid email address.";

        } else if (error.code === "auth/weak-password") {

            message.textContent =
                "❌ Password is too weak.";

        } else {

            message.textContent =
                "❌ Registration failed. Please try again.";

        }

        message.style.color = "red";
    }

});
