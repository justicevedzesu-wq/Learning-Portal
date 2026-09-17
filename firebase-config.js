import {
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

import { auth } from "./firebase-config.js";

const resetForm = document.getElementById("resetForm");
const message = document.getElementById("message");

resetForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    if (!email) {
        message.textContent =
            "Please enter your email address.";
        return;
    }

    try {

        await sendPasswordResetEmail(auth, email);

        message.textContent =
            "✅ Password reset link sent! Check your email.";

        message.style.color = "green";

        resetForm.reset();

    } catch (error) {

        console.error("Password reset error:", error);

        message.textContent =
            "❌ " + error.message;

        message.style.color = "red";
    }

});
