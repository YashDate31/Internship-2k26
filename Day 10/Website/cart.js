/* cart.js — Shopping Cart functionality & Drawer UI for ShopKing */

const CART_STORAGE_KEY = 'shopking_cart';

// Utility to fetch cart items from localStorage
export function getCart() {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading cart from localStorage', e);
    return [];
  }
}

// Utility to save cart items to localStorage
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
    renderCartDrawerContent();
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
}

// Get total count of items in cart
export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get subtotal price
export function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Add product to cart
export function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id || item.title === product.title);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += (product.quantity || 1);
  } else {
    cart.push({
      id: product.id || 'prod_' + Date.now() + Math.random().toString(36).substr(2, 4),
      title: product.title,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price.toString().replace(/[^0-9.]/g, '')),
      image: product.image,
      quantity: product.quantity || 1
    });
  }

  saveCart(cart);
  showToast(`🛒 "${product.title}" added to cart!`);
  openCartDrawer();
}

// Remove item from cart
export function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  showToast('Item removed from cart');
}

// Change item quantity
export function updateQuantity(id, change) {
  const cart = getCart();
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(cart);
  }
}

// Clear whole cart
export function clearCart() {
  saveCart([]);
}

// Toast notification helper
export function showToast(message) {
  let container = document.getElementById('sk-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'sk-toast-container';
    container.className = 'sk-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'sk-toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Update cart badge counter in navbar
export function updateCartBadge() {
  const count = getCartCount();
  const badges = document.querySelectorAll('.sn-cart-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.add('has-items');
    } else {
      badge.classList.remove('has-items');
    }
  });
}

// Render Cart Drawer HTML structure in body if not present
export function initCartDrawer() {
  if (document.getElementById('cart-drawer')) return;

  const drawerHTML = `
    <div id="cart-drawer-overlay" class="cart-drawer-overlay"></div>
    <div id="cart-drawer" class="cart-drawer">
      <div class="cart-drawer-header">
        <h3>🛒 Shopping Cart (<span id="cart-drawer-count">0</span>)</h3>
        <button id="cart-drawer-close" class="cart-close-btn">&times;</button>
      </div>

      <div class="free-shipping-progress" id="free-shipping-bar">
        <div class="shipping-msg" id="shipping-msg">Add items to get FREE Delivery!</div>
        <div class="progress-bar-bg"><div class="progress-bar-fill" id="shipping-progress"></div></div>
      </div>

      <div class="cart-drawer-body" id="cart-drawer-items">
        <!-- Dynamic items -->
      </div>

      <div class="cart-drawer-footer">
        <div class="cart-summary-row">
          <span>Subtotal</span>
          <strong id="cart-subtotal">₹0</strong>
        </div>
        <div class="cart-summary-row shipping-row">
          <span>Shipping</span>
          <span id="cart-shipping-fee" class="free-tag">Calculating...</span>
        </div>
        <div class="cart-summary-row total-row">
          <span>Total Payable</span>
          <strong id="cart-total-price">₹0</strong>
        </div>
        <button id="cart-checkout-btn" class="btn-checkout">Proceed to Checkout →</button>
        <button id="cart-clear-btn" class="btn-clear-cart">Clear Cart</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  // Attach drawer listeners
  document.getElementById('cart-drawer-close').addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-overlay').addEventListener('click', closeCartDrawer);

  document.getElementById('cart-clear-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  });

  document.getElementById('cart-checkout-btn').addEventListener('click', () => {
    const cart = getCart();
    if (cart.length === 0) {
      showToast('⚠️ Your cart is empty!');
      return;
    }
    alert('🎉 Order placed successfully! Thank you for shopping with ShopKing.');
    clearCart();
    closeCartDrawer();
  });

  renderCartDrawerContent();
  updateCartBadge();
}

// Open Cart Drawer
export function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// Close Cart Drawer
export function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Render dynamic contents inside Cart Drawer
function renderCartDrawerContent() {
  const itemsContainer = document.getElementById('cart-drawer-items');
  const countEl = document.getElementById('cart-drawer-count');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total-price');
  const shippingFeeEl = document.getElementById('cart-shipping-fee');
  const shippingMsgEl = document.getElementById('shipping-msg');
  const shippingProgressEl = document.getElementById('shipping-progress');

  if (!itemsContainer) return;

  const cart = getCart();
  const count = getCartCount();
  const subtotal = getCartSubtotal();

  if (countEl) countEl.textContent = count;
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  const FREE_SHIPPING_THRESHOLD = 999;
  let shippingCost = 0;

  if (subtotal === 0) {
    shippingCost = 0;
    if (shippingFeeEl) {
      shippingFeeEl.textContent = '₹0';
      shippingFeeEl.className = '';
    }
    if (shippingMsgEl) shippingMsgEl.textContent = 'Add items for Free Shipping above ₹999';
    if (shippingProgressEl) shippingProgressEl.style.width = '0%';
  } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    shippingCost = 0;
    if (shippingFeeEl) {
      shippingFeeEl.textContent = 'FREE';
      shippingFeeEl.className = 'free-tag';
    }
    if (shippingMsgEl) shippingMsgEl.textContent = '🎉 You qualify for FREE Delivery!';
    if (shippingProgressEl) shippingProgressEl.style.width = '100%';
  } else {
    shippingCost = 99;
    const diff = FREE_SHIPPING_THRESHOLD - subtotal;
    if (shippingFeeEl) {
      shippingFeeEl.textContent = '₹99';
      shippingFeeEl.className = '';
    }
    if (shippingMsgEl) shippingMsgEl.textContent = `Add ₹${diff.toLocaleString('en-IN')} more for FREE Delivery!`;
    const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    if (shippingProgressEl) shippingProgressEl.style.width = `${pct}%`;
  }

  const finalTotal = subtotal + shippingCost;
  if (totalEl) totalEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h4>Your cart is empty</h4>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <a href="shopping.html" class="btn-primary" style="margin-top:14px; font-size:0.85rem; padding:10px 20px;" onclick="window.closeCartDrawer && window.closeCartDrawer()">Start Shopping</a>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop&q=80'">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')} <span class="single-price">(₹${item.price.toLocaleString('en-IN')} each)</span></div>
        <div class="cart-qty-ctrl">
          <button class="qty-btn btn-minus" data-id="${item.id}">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn btn-plus" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" title="Remove Item">&times;</button>
    </div>
  `).join('');

  // Attach event handlers for dynamic buttons
  itemsContainer.querySelectorAll('.btn-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      updateQuantity(id, -1);
    });
  });

  itemsContainer.querySelectorAll('.btn-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      updateQuantity(id, 1);
    });
  });

  itemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}

// Make globally accessible helper for inline window calls if needed
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.addToCart = addToCart;
