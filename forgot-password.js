import {
    getAuth,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

import { app } from "./firebase-config.js";

const auth = getAuth(app);

const resetForm = document.getElementById("resetForm");
const message = document.getElementById("message");

resetForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
        message.textContent = "Please enter your email address.";
        return;
    }

    try {

        await sendPasswordResetEmail(auth, email);

        message.textContent =
            "Password reset link sent! Check your email.";

        resetForm.reset();

    } catch (error) {

        console.error(error);

        if (error.code === "auth/user-not-found") {

            message.textContent =
                "No account was found with this email.";

        } else if (error.code === "auth/invalid-email") {

            message.textContent =
                "Please enter a valid email address.";

        } else {

            message.textContent =
                "Something went wrong. Please try again.";

        }

    }

});
