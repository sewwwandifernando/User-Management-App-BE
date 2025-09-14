# User Management System - Backend

A comprehensive RESTful API built with Node.js, Express, and MySQL for managing user data with full CRUD operations, advanced filtering, pagination, and robust validation.

## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sewwwandifernando/User-Management-App-BE.git
cd user-management-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Create MySQL Database

```sql
CREATE DATABASE `users-db`;
```

### 4. Environment Variables

Rename the provided .env.examplee file to .env and update it with your MySQL username and password:

```env
NODE_ENV=development
PORT=3001
DB_HOST=127.0.0.1
DB_NAME=users-db
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DIALECT=mysql
```

### 5. Start the Server

#### Development Mode (with auto-restart)
```bash
npm start
```

The server will start on `http://localhost:3001`

### 6. Access Frontend

You can access the deployed frontend at `https://user-management-app-lemon.vercel.app/`

Or clone the frontend repository and run it locally:

```bash
git clone https://github.com/sewwwandifernando/User-Management-App-FE.git
cd User-Management-App-FE
npm install
npm run dev
```

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete users
- **Advanced Filtering**: Search by name, email, country, date ranges, and global search
- **Pagination & Sorting**: Efficient data handling with customizable pagination and sorting
- **Input Validation**: Comprehensive server-side validation with detailed error messages
- **Database Integration**: MySQL with Sequelize ORM for robust data management
- **RESTful API Design**: Clean, standards-compliant API endpoints
- **Error Handling**: Comprehensive error handling with meaningful responses
- **CORS Support**: Cross-origin requests enabled for frontend integration

## 📋 Requirements

- **Node.js**: v16.0.0 or higher
- **MySQL**: v8.0 or higher
- **npm**: v7.0.0 or higher

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Validation**: Express-validator
- **Environment Management**: dotenv
- **Development**: Nodemon

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 1. Create User
- **POST** `/users`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "aboutYou": "Software developer with 5 years of experience",
    "birthday": "1995-06-15",
    "mobileNumber": "+1234567890",
    "email": "john.doe@example.com",
    "country": "USA"
  }
  ```
- **Response**: Success message

#### 2. Get All Users (with filtering & pagination)
- **GET** `/users`
- **Query Parameters**:
  - `page` (number): Page number (default: 1)
  - `limit` (number): Items per page (default: 10, max: 100)
  - `sortBy` (string): Sort field (default: 'createdAt')
  - `sortOrder` (string): 'ASC' or 'DESC' (default: 'DESC')
  - `search` (string): Global search across all fields
  - `name` (string): Filter by name (partial match)
  - `email` (string): Filter by email (partial match)
  - `country` (string): Filter by country (exact match)
  - `fromDate` (string): Filter from date (YYYY-MM-DD)
  - `toDate` (string): Filter to date (YYYY-MM-DD)

- **Example**:
  ```
  GET /users?page=1&limit=10&search=john&sortBy=name&sortOrder=ASC
  ```

#### 3. Get User by ID
- **GET** `/users/:id`
- **Response**: User object

#### 4. Update User
- **PUT** `/users/:id`
- **Body**: Same as create user (partial updates allowed)
- **Response**: Success message

#### 5. Delete User
- **DELETE** `/users/:id`
- **Response**: Success message

### Response Format

All API responses follow this structure:

```json
{
  "error": false,
  "payload": "data or message"
}
```

For errors:
```json
{
  "error": true,
  "payload": "error message"
}
```

## 🔧 Project Structure

```
project-root/
├── config/
│   └── config.js              # Database configuration
├── controller/
│   └── user.controller.js       # API route handlers
├── middleware/
│   └── validation.js            # Input validation middleware
├── models/
│   ├── index.js                 # Sequelize initialization
│   └── Users.js                 # User model definition
├── routes/
│   ├── index.routes.js          # Main router
│   └── user.routes.js           # User-specific routes
├── services/
│   └── user.service.js          # Business logic layer
├──.env                          # environment variables
├── .gitignore                   # Git ignore rules
├── index.js                     # Application entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🔍 Validation Rules

### User Fields Validation

- **Name**: 2-50 characters, letters and spaces only
- **Email**: Valid email format, unique across users
- **About You**: 10-250 characters
- **Birthday**: Valid date, not in future, realistic age
- **Mobile Number**: 10-15 characters, valid phone format
- **Country**: 2-20 characters, letters and spaces only

## 🧪 Testing the API

### Using curl

#### Create a user:
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "aboutYou": "This is a test user",
    "birthday": "1990-01-01",
    "mobileNumber": "+1234567890",
    "email": "test@example.com",
    "country": "USA"
  }'
```

#### Get all users:
```bash
curl http://localhost:3001/api/users
```

#### Get users with filtering:
```bash
curl "http://localhost:3001/api/users?page=1&limit=5&search=test"
```

### Using Frontend

The API is designed to work with the corresponding Next.js frontend. Make sure both applications are running and the frontend is configured to use this backend URL.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is part of a software engineering internship assignment.
