/* navbar.js - Dynamically injects the shared navbar into all pages */
import { observeAuth, updateNavAuth, signOutUser } from "./auth.js";

const navbarHTML = `
  <nav id="shared-navbar">
    <div class="sn-inner">
      <a href="index.html" class="sn-brand">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkQZwfIF1UdjlMBtjg4fmlfdGU0suXMgG5qA&s" alt="Amazon Logo">
        Amazon
      </a>
      
      <button class="sn-hamburger" id="sn-hamburger" aria-label="Open menu">&#9776;</button>
      
      <div class="sn-links" id="sn-links">
        <button class="sn-close-btn" id="sn-close-btn" style="display:none;">&times;</button>
        <a href="index.html" data-page="index.html">Home</a>
        <a href="shopping.html" data-page="shopping.html">Shopping</a>
        <a href="profile.html" data-page="profile.html">Profile</a>
        <a href="privacy.html" data-page="privacy.html">Privacy</a>
        <a href="contact.html" data-page="contact.html">Contact</a>
      </div>

      <div class="sn-auth">
        <a href="login.html" id="nav-login" class="sn-btn-login">Login</a>
        <div id="nav-user" class="sn-user-pill" style="display:none"></div>
        <button id="nav-logout" class="sn-btn-logout" style="display:none">Logout</button>
      </div>
    </div>
  </nav>
`;

export function initNavbar() {
  const placeholder = document.getElementById("nav-placeholder");
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  }

  // Highlight active link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll('.sn-links a');
  links.forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('sn-active');
    }
  });

  // Mobile menu toggle
  const hamburger = document.getElementById("sn-hamburger");
  const closeBtn = document.getElementById("sn-close-btn");
  const navLinks = document.getElementById("sn-links");

  if (hamburger && closeBtn && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.add("sn-open");
      closeBtn.style.display = "block";
    });
    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("sn-open");
      closeBtn.style.display = "none";
    });
  }

  // Auth observer
  observeAuth(user => {
    updateNavAuth(user);
  });

  // Logout functionality
  const logoutBtn = document.getElementById("nav-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOutUser();
      window.location.href = "login.html";
    });
  }
}

// Auto-init if the script is loaded directly in the browser
document.addEventListener("DOMContentLoaded", initNavbar);
