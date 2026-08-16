/* firebase-config.js - Firebase initialization */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgdOizGoIbNBpJIz3_JDeRSXc3-oNAfZs",
  authDomain: "internship-d773f.firebaseapp.com",
  projectId: "internship-d773f",
  storageBucket: "internship-d773f.firebasestorage.app",
  messagingSenderId: "803795620520",
  appId: "1:803795620520:web:9ff3d253b709a24fa6289d",
  measurementId: "G-YEBBCKNPPV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
