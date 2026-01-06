/**
 * Admin Dashboard JavaScript
 * Handles file uploads and admin-specific functionality
 */

class AdminManager {
    constructor() {
        this.uploadedFiles = [];
        this.selectedDomain = '';
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.bindEvents();
        this.updateUI();
        lucide.createIcons();
    }

    checkAuthentication() {
        const userData = JSON.parse(sessionStorage.getItem('currentUser') || 'null');

        if (!userData || userData.role !== 'admin') {
            window.location.href = 'signup.html';
            return;
        }

        this.userData = userData;
    }

    bindEvents() {
        // Domain selection
        document.getElementById('uploadDomainSelect').addEventListener('change', (e) => {
            this.selectedDomain = e.target.value;
            this.updateUploadZone();
        });

        // File input
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileSelect(e));

        // Upload zone drag and drop
        const uploadZone = document.getElementById('uploadZone');
        uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        uploadZone.addEventListener('drop', (e) => this.handleDrop(e));

        // Logout
        document.querySelector('.logout').addEventListener('click', () => this.logout());
    }

    updateUI() {
        // Update user avatar with initials
        const avatar = document.querySelector('.user-avatar');
        if (avatar && this.userData) {
            avatar.textContent = this.userData.name.charAt(0).toUpperCase();
        }
    }

    updateUploadZone() {
        const uploadZone = document.getElementById('uploadZone');
        const domainSelect = document.getElementById('uploadDomainSelect');

        if (this.selectedDomain) {
            uploadZone.style.borderColor = 'var(--primary)';
            uploadZone.style.backgroundColor = '#eff6ff';
        } else {
            uploadZone.style.borderColor = 'var(--border)';
            uploadZone.style.backgroundColor = '#fafbfc';
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.style.borderColor = 'var(--primary)';
        e.currentTarget.style.backgroundColor = '#eff6ff';
    }

    handleDragLeave(e) {
        e.preventDefault();
        if (!this.selectedDomain) {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.backgroundColor = '#fafbfc';
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = e.target.files;
        this.processFiles(files);
    }

    processFiles(files) {
        if (!this.selectedDomain) {
            alert('Please select a domain before uploading files.');
            return;
        }

        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/markdown', 'image/png', 'image/jpeg'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        for (let file of files) {
            if (!allowedTypes.includes(file.type)) {
                alert(`File type not allowed: ${file.name}. Please upload PDF, DOCX, MD, PNG, or JPG files.`);
                continue;
            }

            if (file.size > maxSize) {
                alert(`File too large: ${file.name}. Maximum size is 10MB.`);
                continue;
            }

            this.uploadFile(file);
        }
    }

    uploadFile(file) {
        // Simulate file upload (in production, this would be an API call)
        const uploadPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: Date.now(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    domain: this.selectedDomain,
                    uploadedAt: new Date().toISOString()
                });
            }, 1000); // Simulate 1 second upload
        });

        uploadPromise.then((uploadedFile) => {
            this.uploadedFiles.push(uploadedFile);
            this.displayUploadedFile(uploadedFile);
            this.showUploadedFiles();
        });

        // Show loading state
        this.showUploadProgress(file.name);
    }

    showUploadProgress(fileName) {
        const progressDiv = document.createElement('div');
        progressDiv.className = 'upload-progress';
        progressDiv.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
                <span>Uploading ${fileName}...</span>
            </div>
        `;

        const uploadZone = document.getElementById('uploadZone');
        uploadZone.appendChild(progressDiv);

        // Animate progress
        const progressFill = progressDiv.querySelector('.progress-fill');
        progressFill.style.width = '100%';

        setTimeout(() => {
            uploadZone.removeChild(progressDiv);
        }, 1000);
    }

    displayUploadedFile(file) {
        const fileList = document.getElementById('fileList');
        const fileItem = document.createElement('div');
        fileItem.className = 'uploaded-file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <i data-lucide="file-text"></i>
                <div>
                    <strong>${file.name}</strong>
                    <span>${this.formatFileSize(file.size)} • ${file.domain} domain</span>
                </div>
            </div>
            <button class="delete-file" onclick="adminManager.deleteFile(${file.id})">
                <i data-lucide="trash-2"></i>
            </button>
        `;

        fileList.appendChild(fileItem);
        lucide.createIcons();
    }

    showUploadedFiles() {
        document.getElementById('uploadedFiles').style.display = 'block';
    }

    deleteFile(fileId) {
        this.uploadedFiles = this.uploadedFiles.filter(file => file.id !== fileId);

        // Re-render file list
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        this.uploadedFiles.forEach(file => this.displayUploadedFile(file));

        if (this.uploadedFiles.length === 0) {
            document.getElementById('uploadedFiles').style.display = 'none';
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    logout() {
        sessionStorage.removeItem('nexusUser');
        window.location.href = 'signup.html';
    }
}

// Global instance for delete functionality
let adminManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminManager();
});
