/**
 * Sign In Page JavaScript
 * Handles user authentication and sign-in functionality
 */

class SignInManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        lucide.createIcons();
    }

    bindEvents() {
        // Form submission
        document.getElementById('signinForm').addEventListener('submit', (e) => this.handleSignIn(e));

        // Guest button
        document.getElementById('guestBtn').addEventListener('click', () => this.handleGuestAccess());

        // Forgot password link
        document.querySelector('.forgot-password').addEventListener('click', (e) => this.handleForgotPassword(e));
    }

    validateForm(email, password) {
        const errors = [];

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address.');
        }

        // Password validation
        if (password.length === 0) {
            errors.push('Password is required.');
        }

        return errors;
    }

    showError(message) {
        // Remove existing error message if any
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i data-lucide="alert-circle"></i>
                <p>${message}</p>
            </div>
        `;

        // Insert error message before the form
        const form = document.getElementById('signinForm');
        form.parentNode.insertBefore(errorDiv, form);

        // Initialize lucide icons for the error message
        lucide.createIcons();

        // Auto-remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    showSuccess(message) {
        // Remove existing success message if any
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i data-lucide="check-circle"></i>
                <p>${message}</p>
            </div>
        `;

        // Insert success message before the form
        const form = document.getElementById('signinForm');
        form.parentNode.insertBefore(successDiv, form);

        // Initialize lucide icons for the success message
        lucide.createIcons();
    }

    handleSignIn(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Validate form
        const errors = this.validateForm(email, password);
        if (errors.length > 0) {
            this.showError(errors.join(' '));
            return;
        }

        // Simulate authentication (in a real app, this would call an API)
        const signInBtn = document.querySelector('.submit-btn');
        const originalText = signInBtn.textContent;
        signInBtn.textContent = 'Signing in...';
        signInBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Check if email exists in localStorage (simulating a database)
            const users = JSON.parse(localStorage.getItem('nexusUsers') || '[]');
            const user = users.find(u => u.email === email);

            if (user && user.password === password) {
                // Successful login
                this.showSuccess('Sign in successful! Redirecting...');

                // Store current user session
                const userSession = {
                    email: user.email,
                    role: user.role,
                    domain: user.domain,
                    generalUser: user.generalUser
                };

                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('userEmail', email);
                }

                sessionStorage.setItem('currentUser', JSON.stringify(userSession));

                // Redirect based on role
                setTimeout(() => {
                    if (user.role === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'user.html';
                    }
                }, 1500);
            } else {
                // Invalid credentials
                this.showError('Invalid email or password. Please try again.');
                signInBtn.textContent = originalText;
                signInBtn.disabled = false;
            }
        }, 1000);
    }

    handleGuestAccess() {
        // Create guest session
        const guestSession = {
            email: 'guest@nexus.ai',
            role: 'guest',
            domain: null,
            generalUser: true
        };

        sessionStorage.setItem('currentUser', JSON.stringify(guestSession));
        this.showSuccess('Welcome, guest! Redirecting...');

        setTimeout(() => {
            window.location.href = 'user.html';
        }, 1000);
    }

    handleForgotPassword(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();

        if (!email) {
            this.showError('Please enter your email address to reset your password.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('Please enter a valid email address.');
            return;
        }

        // Simulate password reset email
        this.showSuccess(`Password reset link sent to ${email}. Check your inbox!`);

        // In a real app, this would send an email with a password reset link
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SignInManager();

    // Check if user should be remembered
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            document.getElementById('rememberMe').checked = true;
            document.getElementById('password').focus();
        }
    }
});
