# User Authentication & Settings API

A Node.js RESTful API project with user authentication, profile management, and user settings.

## 🚀 Features

- User authentication (Register/Login/Logout)
- JWT-based authentication with refresh tokens
- User profile management
- Password update functionality
- Account deletion
- Protected routes with middleware

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
```

## 🏃‍♂️ Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📚 API Documentation

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/refresh-token` | Refresh access token |

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/get-userProfile` | Get user profile |
| PUT | `/api/user/update-profile` | Update profile |
| PUT | `/api/user/password` | Update password |
| DELETE | `/api/user/delete` | Delete account |

## 📝 API Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "password123"
}'
```

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes using authentication middleware
- Input validation and sanitization

## 📁 Project Structure

The project follows a modular architecture:
- `/config` - Configuration files
- `/controllers` - Request handlers
- `/middleware` - Custom middleware
- `/models` - Database models
- `/routes` - API routes
- `/services` - Business logic
- `/utils` - Helper functions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details