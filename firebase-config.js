import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyA1gLtV-qmiGQC2hXMLnS2Vh3hfSABbjs8",
    authDomain: "learning-portal-8e073.firebaseapp.com",
    projectId: "learning-portal-8e073",
    storageBucket: "learning-portal-8e073.firebasestorage.app",
    messagingSenderId: "973204954784",
    appId: "1:973204954784:web:7248b52e796aab4313f3c5",
    measurementId: "G-DW3RX5QE62"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const analytics = getAnalytics(app);

export {
    app,
    auth
};
