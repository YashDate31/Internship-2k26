/**
 * Forgot Password Form Handling
 * Handles form submission, validation, and UI feedback for the forgot password flow
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgot-password-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailErrorIcon = document.getElementById('email-error-icon');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const buttonSpinner = document.getElementById('button-spinner');
    const formMessages = document.getElementById('form-messages');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

    // Initialize Lucide icons
    lucide.createIcons();

    // Validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Show error message
    function showError(input, message) {
        input.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        input.classList.remove('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
        
        if (input === emailInput) {
            emailError.textContent = message;
            emailError.classList.remove('hidden');
            emailErrorIcon.classList.remove('hidden');
        }
    }

    // Clear error
    function clearError(input) {
        input.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        input.classList.add('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
        
        if (input === emailInput) {
            emailError.classList.add('hidden');
            emailErrorIcon.classList.add('hidden');
        }
    }

    // Show form message (success/error)
    function showMessage(message, type = 'error') {
        formMessages.innerHTML = `
            <div class="p-4 mb-4 rounded-lg ${type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}">
                <div class="flex items-center">
                    <i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle'}" class="w-5 h-5 mr-2"></i>
                    <span>${message}</span>
                </div>
            </div>
        `;
        formMessages.classList.remove('hidden');
        lucide.createIcons();

        // Scroll to message
        formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Toggle loading state
    function setLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            buttonText.textContent = 'Sending...';
            buttonSpinner.classList.remove('hidden');
        } else {
            submitButton.disabled = false;
            buttonText.textContent = 'Send Reset Link';
            buttonSpinner.classList.add('hidden');
        }
    }

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        
        // Reset previous errors
        clearError(emailInput);
        formMessages.classList.add('hidden');
        
        // Get form data
        const email = emailInput.value.trim();
        
        // Validate form
        let isValid = true;
        
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Submit form
        try {
            setLoading(true);
            
            const response = await fetch('/auth/forgot-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showMessage('Password reset link has been sent to your email.', 'success');
                emailInput.value = '';
                
                // Redirect to login after delay if needed
                // setTimeout(() => {
                //     window.location.href = '/auth/login/';
                // }, 3000);
            } else {
                const errorMessage = data.error || 'An error occurred. Please try again.';
                showMessage(errorMessage, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('An unexpected error occurred. Please try again later.', 'error');
        } finally {
            setLoading(false);
        }
    }

    // Event Listeners
    form.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim()) {
            clearError(emailInput);
        }
    });
    
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
        }
    });
});
