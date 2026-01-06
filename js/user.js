/**
 * User Chat Interface JavaScript
 * Handles chat functionality and user interactions
 */

class UserManager {
    constructor() {
        this.messages = [];
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.bindEvents();
        this.updateUI();
        lucide.createIcons();
    }

    checkAuthentication() {
        const userData = JSON.parse(sessionStorage.getItem('nexusUser') || 'null');

        if (!userData || userData.role !== 'user') {
            window.location.href = 'signup.html';
            return;
        }

        this.userData = userData;
    }

    bindEvents() {
        // Chat input
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        sendBtn.addEventListener('click', () => this.sendMessage());

        // Logout
        document.querySelector('.logout').addEventListener('click', () => this.logout());
    }

    updateUI() {
        // Update user avatar
        const avatar = document.getElementById('userAvatar');
        if (avatar && this.userData) {
            avatar.textContent = this.userData.name.charAt(0).toUpperCase();
        }

        // Update badge and instructions based on user type
        const badge = document.getElementById('userBadge');
        const instructionText = document.getElementById('userInstructionText');
        const chatInput = document.getElementById('chatInput');

        if (this.userData.domain === 'general') {
            badge.textContent = '🌍 General Access';
            badge.className = 'badge general-badge';
            instructionText.textContent = 'You have access to resources across all organizational domains.';
            chatInput.placeholder = 'Ask anything across all domains...';
        } else {
            badge.textContent = `🔒 ${this.userData.domain} Domain`;
            badge.className = 'badge';
            instructionText.textContent = `I am locked to the ${this.userData.domain} knowledge base provided by your Admin.`;
            chatInput.placeholder = `Ask about ${this.userData.domain}...`;
        }
    }

    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        chatInput.value = '';

        // Simulate AI response (in production, this would be an API call)
        this.simulateAIResponse(message);
    }

    addMessage(sender, content) {
        const message = {
            id: Date.now(),
            sender,
            content,
            timestamp: new Date()
        };

        this.messages.push(message);
        this.displayMessage(message);
    }

    displayMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}-message`;

        const timeString = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageElement.innerHTML = `
            <div class="message-content">
                <p>${this.formatMessage(message.content)}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    formatMessage(content) {
        // Basic formatting - escape HTML and convert line breaks
        return content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');
    }

    simulateAIResponse(userMessage) {
        // Show typing indicator
        this.showTypingIndicator();

        // Simulate API delay
        setTimeout(() => {
            this.hideTypingIndicator();

            let response = '';

            // Generate contextual response based on user domain and message
            if (this.userData.domain === 'general') {
                response = this.generateGeneralResponse(userMessage);
            } else {
                response = this.generateDomainResponse(userMessage, this.userData.domain);
            }

            this.addMessage('ai', response);
        }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
    }

    generateGeneralResponse(message) {
        const responses = [
            "I can help you with that. Based on resources across all domains, here's what I found...",
            "Searching through organizational knowledge... Here's the most relevant information:",
            "I've accessed multiple domain resources to provide you with comprehensive information:",
            "Drawing from various organizational domains, I can provide this insight:"
        ];

        return responses[Math.floor(Math.random() * responses.length)] +
               "\n\n[Simulated response - In production, this would query the actual knowledge base]";
    }

    generateDomainResponse(message, domain) {
        const domainResponses = {
            'Legal': [
                "Based on legal resources and compliance documents:",
                "From the legal knowledge base:",
                "According to organizational legal guidelines:"
            ],
            'Medical': [
                "Based on medical protocols and research data:",
                "From healthcare documentation:",
                "According to medical guidelines and protocols:"
            ],
            'Technology': [
                "Based on technical documentation and system architecture:",
                "From IT resources and documentation:",
                "According to technical specifications:"
            ]
        };

        const responses = domainResponses[domain] || ["Based on available resources:"];

        return responses[Math.floor(Math.random() * responses.length)] +
               "\n\n[Simulated domain-specific response - In production, this would query the domain's knowledge base]";
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const indicator = document.createElement('div');
        indicator.className = 'message ai-message typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    logout() {
        sessionStorage.removeItem('nexusUser');
        window.location.href = 'signup.html';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UserManager();
});
