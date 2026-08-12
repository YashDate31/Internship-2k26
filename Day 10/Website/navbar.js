/* navbar.js - Dynamically injects the shared navbar into all pages */
import { observeAuth, updateNavAuth, signOutUser } from "./auth.js";
import { initCartDrawer, openCartDrawer, updateCartBadge } from "./cart.js";

const navbarHTML = `
  <nav id="shared-navbar">
    <div class="sn-inner">
      <a href="index.html" class="sn-brand">
        <div class="sn-logo-badge">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <span class="brand-name">Shop<span>King</span></span>
      </a>
      
      <button class="sn-hamburger" id="sn-hamburger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div class="sn-links" id="sn-links">
        <button class="sn-close-btn" id="sn-close-btn" aria-label="Close menu">&times;</button>
        <a href="index.html" data-page="index.html">Home</a>
        <a href="shopping.html" data-page="shopping.html">Shopping</a>
        <a href="profile.html" data-page="profile.html">Profile</a>
        <a href="contact.html" data-page="contact.html">Contact</a>
        <a href="privacy.html" data-page="privacy.html">Privacy</a>
      </div>

      <div class="sn-actions">
        <!-- Cart Button -->
        <button id="sn-cart-btn" class="sn-cart-btn" aria-label="Shopping Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="sn-cart-badge">0</span>
        </button>

        <div class="sn-auth">
          <a href="login.html" id="nav-login" class="sn-btn-login">Login</a>
          <div id="nav-user" class="sn-user-pill" style="display:none"></div>
          <button id="nav-logout" class="sn-btn-logout" style="display:none">Logout</button>
        </div>
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
  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage || currentPage === "") currentPage = "index.html";

  const links = document.querySelectorAll('.sn-links a');
  links.forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('sn-active');
    }
  });

  // Initialize cart drawer
  initCartDrawer();
  updateCartBadge();

  const cartBtn = document.getElementById("sn-cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      openCartDrawer();
    });
  }

  // Mobile menu toggle
  const hamburger = document.getElementById("sn-hamburger");
  const closeBtn = document.getElementById("sn-close-btn");
  const navLinks = document.getElementById("sn-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.add("sn-open");
      if (closeBtn) closeBtn.style.display = "block";
    });
  }

  if (closeBtn && navLinks) {
    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("sn-open");
    });
  }

  // Close nav link on click in mobile
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks) navLinks.classList.remove("sn-open");
    });
  });

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
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavbar);
} else {
  initNavbar();
}
