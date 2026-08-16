/* auth.js - Handles Google Sign-In, Sign-Out, and auth state */
import { auth } from "./firebase-config.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

/* -------- Sign in with Google -------- */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Sign-in error:", error.message);
    throw error;
  }
}

/* -------- Sign out -------- */
export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out error:", error.message);
    throw error;
  }
}

/* -------- Observe auth state -------- */
export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

/* -------- Update nav UI based on user -------- */
export function updateNavAuth(user) {
  const loginLink = document.getElementById("nav-login");
  const logoutBtn = document.getElementById("nav-logout");
  const userDisplay = document.getElementById("nav-user");

  if (user) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (userDisplay) {
      userDisplay.style.display = "flex";
      userDisplay.innerHTML = `<img src="${user.photoURL}" alt="avatar" class="nav-avatar"> ${user.displayName.split(" ")[0]}`;
    }
  } else {
    if (loginLink) loginLink.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (userDisplay) userDisplay.style.display = "none";
  }
}
