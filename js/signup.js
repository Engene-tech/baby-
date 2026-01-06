/**
 * Signup Page JavaScript
 * Handles user registration and role-based form interactions
 */

class SignupManager {
    constructor() {
        this.selectedRole = 'user';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateFormVisibility();
        lucide.createIcons();
    }

    bindEvents() {
        // Role selection
        document.getElementById('userRole').addEventListener('click', () => this.selectRole('user'));
        document.getElementById('adminRole').addEventListener('click', () => this.selectRole('admin'));

        // General user checkbox
        document.getElementById('generalUser').addEventListener('change', () => this.updateFormVisibility());

        // Form submission
        document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSubmit(e));
    }

    selectRole(role) {
        this.selectedRole = role;

        // Update UI
        document.querySelectorAll('.role-option').forEach(option => {
            option.classList.remove('active');
        });

        document.getElementById(`${role}Role`).classList.add('active');

        // Update form visibility
        this.updateFormVisibility();
    }

    updateFormVisibility() {
        const generalUserContainer = document.getElementById('generalUserContainer');
        const domainGroup = document.getElementById('domainGroup');
        const generalUserCheck = document.getElementById('generalUser');

        if (this.selectedRole === 'admin') {
            // Hide both general user checkbox and domain selection for admins
            generalUserContainer.style.display = 'none';
            domainGroup.style.display = 'none';
        } else {
            // Show general user checkbox for users
            generalUserContainer.style.display = 'flex';

            // Show/hide domain selection based on general user checkbox
            if (generalUserCheck.checked) {
                domainGroup.style.display = 'none';
            } else {
                domainGroup.style.display = 'block';
            }
        }
    }

    validateForm(formData) {
        const errors = [];

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.push('Please enter a valid email address.');
        }

        // Password validation
        if (formData.password.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        }

        if (formData.password !== formData.confirmPassword) {
            errors.push('Passwords do not match.');
        }

        // Role-specific validation
        if (this.selectedRole === 'user') {
            if (!formData.generalUser && !formData.domain) {
                errors.push('Please select a domain or check "General User".');
            }
        }

        return errors;
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = {
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            role: this.selectedRole,
            generalUser: document.getElementById('generalUser').checked,
            domain: document.getElementById('domainSelect').value
        };

        // Validate form
        const errors = this.validateForm(formData);
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        // Store user data in localStorage for authentication
        const users = JSON.parse(localStorage.getItem('nexusUsers') || '[]');
        
        // Check if email already exists
        if (users.some(u => u.email === formData.email)) {
            alert('An account with this email already exists. Please sign in instead.');
            return;
        }

        // Add new user
        const newUser = {
            email: formData.email,
            password: formData.password,
            role: formData.role,
            domain: formData.generalUser ? 'general' : formData.domain,
            generalUser: formData.generalUser,
            name: formData.email.split('@')[0],
            timestamp: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('nexusUsers', JSON.stringify(users));

        // Also store in session for current user
        const userData = {
            email: newUser.email,
            role: newUser.role,
            domain: newUser.domain,
            generalUser: newUser.generalUser,
            name: newUser.name,
            timestamp: newUser.timestamp
        };

        sessionStorage.setItem('currentUser', JSON.stringify(userData));

        // Redirect based on role
        if (formData.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user.html';
        }
    }
}

// Utility functions
function goToSignIn() {
    window.location.href = 'signin.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SignupManager();
});