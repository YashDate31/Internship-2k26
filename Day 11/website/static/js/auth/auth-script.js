// Application State
let authState = {
    currentForm: 'login',
    isLoading: false,
    csrfToken: document.querySelector('input[name=csrfmiddlewaretoken]')?.value || ''
};

// API Endpoints
const API_ENDPOINTS = {
    login: '/auth/login/',
    register: '/auth/register/',
    logout: '/auth/logout/',
    checkAuth: '/auth/status/'
};

// DOM Elements
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginFormElement = document.getElementById('login-form-element');
const registerFormElement = document.getElementById('register-form-element');
const messageContainer = document.getElementById('message-container');

// Password strength elements
const passwordInput = document.getElementById('register-password');
const passwordStrengthFill = document.getElementById('password-strength-fill');
const passwordStrengthText = document.getElementById('password-strength-text');

// Utility Functions
function showMessage(message, type = 'info') {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'x-circle' : 'info';
    
    messageElement.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5 mr-2"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-auto">
            <i data-lucide="x" class="w-4 h-4"></i>
        </button>
    `;
    
    messageContainer.appendChild(messageElement);
    lucide.createIcons();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentElement) {
            messageElement.remove();
        }
    }, 5000);
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    
    lucide.createIcons();
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const score = [minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
        .reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
    
    return {
        score,
        isValid: score >= 3,
        strength: score <= 1 ? 'weak' : 
                 score <= 2 ? 'fair' : 
                 score <= 3 ? 'good' : 'strong'
    };
}

function updatePasswordStrength(password) {
    const validation = validatePassword(password);
    
    passwordStrengthFill.className = `password-strength-fill ${validation.strength}`;
    
    const strengthTexts = {
        weak: 'Weak password',
        fair: 'Fair password',
        good: 'Good password',
        strong: 'Strong password'
    };
    
    passwordStrengthText.textContent = password ? strengthTexts[validation.strength] : 'Password strength';
    passwordStrengthText.className = `text-xs mt-1 ${
        validation.strength === 'weak' ? 'text-red-500' :
        validation.strength === 'fair' ? 'text-yellow-500' :
        validation.strength === 'good' ? 'text-blue-500' : 'text-green-500'
    }`;
}

function validateForm(formData, isLogin = true) {
    const errors = [];
    
    // Email validation
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Password validation
    if (!formData.password || formData.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    
    if (!isLogin) {
        // Registration specific validations
        if (!formData.firstName || formData.firstName.trim().length < 2) {
            errors.push('First name must be at least 2 characters long');
        }
        
        if (!formData.lastName || formData.lastName.trim().length < 2) {
            errors.push('Last name must be at least 2 characters long');
        }
        
        if (!formData.branch) {
            errors.push('Please select your engineering branch');
        }
        
        if (!formData.semester) {
            errors.push('Please select your current semester');
        }
        
        if (formData.password !== formData.confirmPassword) {
            errors.push('Passwords do not match');
        }
        
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            errors.push('Password must contain at least 8 characters with uppercase, lowercase, and numbers');
        }
        
        if (!formData.terms) {
            errors.push('Please accept the terms and conditions');
        }
    }
    
    return errors;
}

function setLoading(isLoading) {
    authState.isLoading = isLoading;
    const forms = [loginFormElement, registerFormElement];
    const buttons = document.querySelectorAll('button[type="submit"]');
    
    forms.forEach(form => {
        if (isLoading) {
            form.classList.add('loading');
        } else {
            form.classList.remove('loading');
        }
    });
    
    buttons.forEach(button => {
        if (isLoading) {
            const originalText = button.textContent;
            button.innerHTML = `
                <span class="spinner mr-2"></span>
                Processing...
            `;
            button.disabled = true;
        } else {
            button.disabled = false;
            // Restore original text would need to be handled differently
        }
    });
}

// Tab Switching
function switchToLogin() {
    authState.currentForm = 'login';
    
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
}

function switchToRegister() {
    authState.currentForm = 'register';
    
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
}

// Form Handlers
async function handleLogin(formData) {
    try {
        // Basic validation
        if (!formData.email || !formData.password) {
            throw new Error('Please enter both email and password');
        }
        
        setLoading(true);
        
        // Get fresh CSRF token
        const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]')?.value || authState.csrfToken;
        
        const response = await fetch(API_ENDPOINTS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                username: formData.email,
                password: formData.password,
                remember: formData.remember || false
            })
        });
        
        // Handle non-JSON responses (like 403 CSRF failure)
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            if (response.status === 403) {
                throw new Error('Session expired. Please refresh the page and try again.');
            } else {
                throw new Error('Invalid response from server');
            }
        }
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Login successful! Redirecting...', 'success');
            // Small delay to show success message before redirect
            setTimeout(() => {
                window.location.href = data.redirect || '/';
            }, 1000);
        } else {
            throw new Error(data.error || 'Invalid email or password. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage(error.message || 'An error occurred. Please try again later.', 'error');
        throw error; // Re-throw to be handled by the caller
    } finally {
        setLoading(false);
    }
}

async function handleRegister(formData) {
    const errors = validateForm(formData, false);
    
    if (errors.length > 0) {
        errors.forEach(error => showMessage(error, 'error'));
        return;
    }
    
    setLoading(true);
    
    try {
        const response = await fetch(API_ENDPOINTS.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': authState.csrfToken,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                first_name: formData.firstName,
                last_name: formData.lastName,
                branch: formData.branch,
                semester: formData.semester
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Registration successful! Redirecting...', 'success');
            // Redirect to home page or the next URL if provided
            setTimeout(() => {
                window.location.href = data.redirect || '/';
            }, 1000);
        } else {
            const errorMessage = data.error || 'Registration failed. Please try again.';
            showMessage(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('An error occurred. Please try again later.', 'error');
    } finally {
        setLoading(false);
    }
}

// Social Login Handlers
async function loginWithGoogle() {
    try {
        // Get fresh CSRF token
        const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]')?.value || authState.csrfToken;
        
        // Redirect to Google OAuth URL with CSRF token
        const response = await fetch('/auth/google/login/', {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrfToken,
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        });
        
        const data = await response.json();
        
        if (data.redirect_url) {
            window.location.href = data.redirect_url;
        } else {
            throw new Error('Failed to initiate Google login');
        }
    } catch (error) {
        console.error('Google login error:', error);
        showMessage('Failed to initiate Google login. Please try again.', 'error');
    }
}

function loginWithGithub() {
    try {
        window.location.href = '/accounts/github/login/';
    } catch (error) {
        console.error('GitHub login error:', error);
        showMessage('Failed to initiate GitHub login', 'error');
    }
}

function loginWithFacebook() {
    try {
        window.location.href = '/accounts/facebook/login/';
    } catch (error) {
        console.error('Facebook login error:', error);
        showMessage('Failed to initiate Facebook login', 'error');
    }
}

function registerWithGoogle() {
    try {
        window.location.href = '/accounts/google/login/?process=signup';
    } catch (error) {
        console.error('Google signup error:', error);
        showMessage('Failed to initiate Google signup', 'error');
    }
}

function registerWithGithub() {
    try {
        window.location.href = '/accounts/github/login/?process=signup';
    } catch (error) {
        console.error('GitHub signup error:', error);
        showMessage('Failed to initiate GitHub signup', 'error');
    }
}

function registerWithFacebook() {
    try {
        window.location.href = '/accounts/facebook/login/?process=signup';
    } catch (error) {
        console.error('Facebook signup error:', error);
        showMessage('Failed to initiate Facebook signup', 'error');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    loginTab.addEventListener('click', switchToLogin);
    registerTab.addEventListener('click', switchToRegister);
    
    // Password strength monitoring
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
    
    // Login form submission
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (authState.isLoading) return;
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        handleLogin(data);
    });
    
    // Register form submission
    registerFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (authState.isLoading) return;
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        data.terms = formData.has('terms');
        
        handleRegister(data);
    });
    
    // Real-time validation
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
                this.classList.add('input-success');
            }
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('input-error', 'input-success');
        });
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('input-error');
            }
        });
    });
    
    // Password confirmation validation
    const confirmPasswordInput = document.getElementById('confirm-password');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            if (this.value && this.value !== password) {
                this.classList.add('input-error');
            } else if (this.value === password && password) {
                this.classList.remove('input-error');
                this.classList.add('input-success');
            }
        });
    }
    
    // Initialize Lucide icons
    lucide.createIcons();
});

// Global functions for inline event handlers
window.togglePassword = togglePassword;
window.loginWithGoogle = loginWithGoogle;
window.loginWithGithub = loginWithGithub;
window.loginWithFacebook = loginWithFacebook;
window.registerWithGoogle = registerWithGoogle;
window.registerWithGithub = registerWithGithub;
window.registerWithFacebook = registerWithFacebook;