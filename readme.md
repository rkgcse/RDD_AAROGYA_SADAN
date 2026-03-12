
# 🏥 RDD Aarogya Sadan

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/rkgcse/RDD_AAROGYA_SADAN?style=for-the-badge&logo=github)](https://github.com/rkgcse/RDD_AAROGYA_SADAN/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/rkgcse/RDD_AAROGYA_SADAN?style=for-the-badge&logo=github)](https://github.com/rkgcse/RDD_AAROGYA_SADAN/network)
[![GitHub issues](https://img.shields.io/github/issues/rkgcse/RDD_AAROGYA_SADAN?style=for-the-badge&logo=github)](https://github.com/rkgcse/RDD_AAROGYA_SADAN/issues)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](LICENSE)

**A Full-Stack Health Management System Built with Modern Web Technologies**

[Live Demo](https://rdd-aarogya-sadan-1.onrender.com/) • [Report Bug](https://github.com/rkgcse/RDD_AAROGYA_SADAN/issues) • [Request Feature](https://github.com/rkgcse/RDD_AAROGYA_SADAN/issues)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🎯 Overview

**RDD Aarogya Sadan** is a comprehensive web-based health management system designed to streamline healthcare operations and patient information management. Built with a modern full-stack architecture, it provides secure user authentication, data persistence, and a responsive interface for managing healthcare-related information.

The name "Aarogya Sadan" translates to "Health Home" in Sanskrit/Hindi, reflecting the system's purpose of creating a digital home for health management.

### Key Objectives

✅ Provide a secure platform for health data management  
✅ Enable seamless patient and appointment tracking  
✅ Implement role-based access control  
✅ Ensure data security with JWT-based authentication  
✅ Deliver a responsive user experience across devices  

## ✨ Features

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based user sessions
- **Password Hashing**: bcryptjs encryption for password protection
- **CORS Support**: Seamless frontend-backend communication
- **Environment Configuration**: Secure management of sensitive variables

### 📱 User Management
- User registration and login functionality
- Role-based access control (Admin, Warden, Student)
- Secure user session management
- Profile management

### 📊 Core Functionality
- RESTful API for data operations
- MongoDB database with Mongoose ODM
- Scalable architecture for future expansion
- Real-time data synchronization

### 🎨 Frontend
- Responsive HTML/CSS/JavaScript interface
- Clean, intuitive user experience
- Cross-browser compatibility
- Mobile-friendly design

### ⚙️ Backend
- Express.js REST API
- Node.js runtime environment
- Production-ready error handling
- API request validation

## 🛠️ Tech Stack

### Frontend
```
HTML5 | CSS3 | JavaScript (Vanilla)
```

### Backend
```
Node.js | Express.js | JavaScript
```

### Database
```
MongoDB | Mongoose ODM
```

### Authentication & Security
```
JWT (JSON Web Tokens) | bcryptjs | dotenv
```

### Development Tools
```
Nodemon | npm | Git
```

### Deployment
```
Render | Vercel
```

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed on your system:

```bash
# Check Node.js version (should be v18+)
node --version

# Check npm version (should be v9+)
npm --version
```

**Required Services:**
- Node.js v18+ ([Download](https://nodejs.org/))
- MongoDB ([Local Installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rkgcse/RDD_AAROGYA_SADAN.git
   cd RDD_AAROGYA_SADAN
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   touch .env
   ```

   Add the following to your `.env` file:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/aarogyasadan
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

5. **Run the application**
   ```bash
   # Development mode (with hot reload)
   npm run dev

   # Production mode
   npm start
   ```

6. **Access the application**
   ```
   Open your browser and navigate to http://localhost:5000
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/aarogyasadan` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key_here` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally and run
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. Update `MONGO_URI` in `.env`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/aarogyasadan?retryWrites=true&w=majority
   ```

## 📁 Project Structure

```
RDD_AAROGYA_SADAN/
├── .env                    # Environment variables (create this)
├── .env.example           # Example environment file
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lock file
│
├── server.js              # Express server entry point
├── script-backend.js      # Backend logic (models, routes, controllers)
│
├── index.html             # Frontend HTML
├── style.css              # Frontend styles
├── script.js              # Frontend JavaScript
│
└── node_modules/          # Installed dependencies
```

### File Descriptions

**Backend Files:**
- `server.js` - Express server setup, middleware configuration, route mounting
- `script-backend.js` - Mongoose models, route handlers, business logic

**Frontend Files:**
- `index.html` - HTML structure and markup
- `style.css` - Styling and responsive design
- `script.js` - Client-side functionality and API calls

**Configuration Files:**
- `package.json` - Project metadata, dependencies, npm scripts
- `.env` - Environment variables (create manually)

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

**Common HTTP Status Codes:**
- `200` - Successful request
- `201` - Resource created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `500` - Server error

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run tests (currently not configured)
npm test
```

### Development Workflow

1. **Backend Changes**
   ```bash
   npm run dev
   # Server auto-restarts on file changes (nodemon)
   ```

2. **Frontend Changes**
   - Edit `index.html`, `style.css`, or `script.js`
   - Refresh browser to see changes
   - No build step required

3. **Database Changes**
   - Update Mongoose models in `script-backend.js`
   - Collections are auto-created on first insert

### Debugging

**View Server Logs:**
```bash
npm run dev
# Logs appear in terminal
```

**Browser Console:**
- Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (macOS)
- Check for JavaScript errors and API responses

**Database Inspection:**
```bash
# Using MongoDB CLI
mongo

# Or use MongoDB Compass GUI
# Download from: https://www.mongodb.com/products/compass
```

## 🚀 Deployment

### Deploy to Render

The project is configured for easy deployment on [Render](https://render.com/):

1. **Create Render Account** - Visit [render.com](https://render.com/) and sign up
2. **Connect GitHub** - Authorize Render to access your GitHub account
3. **Create Web Service** - Select this repository
4. **Configure Environment**:
   - `PORT` - Set to `5000`
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Use a strong random string
5. **Deploy** - Click "Create Web Service"

**Live Demo:** [rdd-aarogya-sadan-1.onrender.com](https://rdd-aarogya-sadan-1.onrender.com/)

### Deploy to Vercel

For deploying just the frontend to Vercel:

1. Push your repository to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Configure environment variables
4. Deploy with one click

### Deploy to Other Platforms

**Heroku:**
```bash
heroku login
heroku create your-app-name
git push heroku main
```

**AWS/DigitalOcean/Azure:**
1. Create server instance
2. Install Node.js and MongoDB
3. Clone repository
4. Configure `.env`
5. Run `npm install && npm start`

### Production Checklist

- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Use strong, unique `JWT_SECRET`
- [ ] Enable MongoDB authentication
- [ ] Configure CORS for your domain
- [ ] Set up HTTPS/SSL
- [ ] Configure error logging
- [ ] Set up database backups
- [ ] Monitor server performance

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. **Fork the repository**
   ```bash
   click Fork button on GitHub
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open Pull Request**
   - Describe your changes clearly
   - Link any related issues
   - Wait for review

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test before submitting PR
- Keep commits small and focused
- Update documentation if needed

### Areas for Contribution

- 🎨 Frontend improvements
- 🔧 Backend optimization
- 📝 Documentation enhancement
- 🧪 Test coverage
- 🐛 Bug fixes
- ✨ New features

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

### Getting Help

- 📖 **Documentation** - Check the [Project Wiki](https://github.com/rkgcse/RDD_AAROGYA_SADAN/wiki)
- 🐛 **Report Issues** - [GitHub Issues](https://github.com/rkgcse/RDD_AAROGYA_SADAN/issues)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/rkgcse/RDD_AAROGYA_SADAN/discussions)

### Connect with Developer

- 🐙 **GitHub** - [@rkgcse](https://github.com/rkgcse)
- 📧 **Email** - Open an issue for contact
- 🌐 **Portfolio** - [raushanapps.wordpress.com](https://raushanapps.wordpress.com/)

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Introduction](https://jwt.io/introduction)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design](https://restfulapi.net/)

## 🎉 Acknowledgments

- Node.js community for excellent frameworks and libraries
- MongoDB for reliable database solutions
- All contributors who have helped improve this project
- The open-source community for continuous inspiration

---

<div align="center">

### Give this project a ⭐ if it helped you!

**Made with ❤️ by [Raushan Kumar Gupta](https://github.com/rkgcse)**

[⬆ Back to Top](#-rdd-aarogya-sadan)

</div>
