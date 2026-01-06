# Nexus AI Platform

A modern, secure AI platform with role-based access control for domain-specific knowledge management.

## Features

- **Role-based Authentication**: Separate interfaces for Users and Admins
- **Domain-specific Access**: Users can access specific knowledge domains or general access
- **Admin Resource Management**: Admins can upload and manage resources for different domains
- **Secure Chat Interface**: AI-powered chat with domain-aware responses
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
baby project/
├── index.html          # Landing page
├── signup.html         # User registration
├── signin.html         # User sign-in / login
├── admin.html          # Admin dashboard
├── user.html           # User chat interface
├── style.css           # Global styles
├── server.js           # Development server
├── js/
│   ├── signup.js       # Signup page logic
│   ├── signin.js       # Sign-in page logic
│   ├── admin.js        # Admin dashboard logic
│   └── user.js         # User chat logic
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Start the development server:

```bash
node server.js
```

4. Open your browser and go to: `http://localhost:3000`

## Usage

### Landing Page

- Click "Get Started" to create a new account
- Click "Sign In" to log in with existing credentials

### User Registration

1. **Select Role**: Choose between "User" or "Admin"
2. **User Registration**:
   - Check "General User" for access to all domains
   - Or select a specific domain (Legal, Medical, Technology)
3. **Admin Registration**: No domain selection needed

### User Sign In

1. **Email & Password**: Enter registered email and password
2. **Remember Me**: Check to save your email for next time
3. **Forgot Password**: Click to reset your password
4. **Guest Access**: Continue as guest user without signing in

### Admin Dashboard

- Select a domain from the dropdown
- Upload files (PDF, DOCX, MD, PNG, JPG) via drag & drop or browse
- View uploaded files with domain assignment
- Files are restricted to the selected domain

### User Chat Interface

- Domain-specific or general access based on registration
- AI chat interface with contextual responses
- Secure knowledge base queries

## Technical Details

### Architecture

- **Separation of Concerns**: Each page has its own HTML, CSS, and JavaScript
- **Modular JavaScript**: Class-based architecture with clear responsibilities
- **Session Management**: Uses browser sessionStorage for user state
- **Responsive Design**: CSS Grid and Flexbox for modern layouts

### Key Components

#### SignupManager (signup.js)
- Handles role selection and form validation
- Dynamic form visibility based on user choices
- Stores user data in localStorage for authentication
- Session storage for current user data

#### SignInManager (signin.js)
- User authentication against stored credentials
- Remember me functionality using localStorage
- Forgot password handling
- Guest access option
- Error and success message display

#### AdminManager (admin.js)
- File upload with drag & drop support
- Domain-based file organization
- Upload progress indicators

#### UserManager (user.js)
- Chat message handling
- AI response simulation
- Domain-aware context

### Security Considerations

- Client-side validation
- Session-based authentication
- File type and size restrictions
- Domain isolation for resources

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Development

### Adding New Domains

1. Update the domain select options in `signup.html`
2. Update domain responses in `user.js`
3. Add domain-specific styling if needed

### Extending File Types

Update the `allowedTypes` array in `admin.js`:

```javascript
const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/markdown',
    'image/png',
    'image/jpeg',
    // Add new types here
];
```

## Future Enhancements

- Real API integration
- Database storage for users and files
- Advanced AI integration
- Multi-language support
- Admin analytics dashboard
- File versioning and management

## License

This project is for educational purposes. Modify and use as needed.