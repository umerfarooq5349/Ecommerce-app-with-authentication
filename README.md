## Task-3: Authentication and Authorization with Node.js and Next.js 🔒

### Project Description

Task-3 covers **authentication** and **authorization** using **Node.js** and **Next.js**. Here, we focus on user authentication, session management, and access control.

### Features

- **User Registration and Login** 📝
- Securely Store **User Credentials** (e.g., Hashed Passwords) 🔑
- **Session Management** using Cookies or Tokens 🍪
- **Protected Routes** requiring Authentication 🚫
- **Role-Based Access Control** for Route Restrictions 🛡️
- Error Handling for Authentication Failures and Unauthorized Access ❗

### Project Structure

```plaintext
Task-3/
├── client/
├── dist/
└── server/
    ├── node_modules/
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   └── utils/
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/umerfarooq5349/Task-3.git
   cd Task-3
   ```

2. **Install server dependencies:**

   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies:**

   ```sh
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the server:**

   ```sh
   cd server
   npm start
   ```

2. **Start the client:**

   ```sh
   cd ../client
   npm run dev
   ```

### API Endpoints

#### User Registration

- **URL:** `/api/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**

  ```json
  {
    "username": "user",
    "password": "password"
  }
  ```

- **Response:**

  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### User Login

- **URL:** `/api/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request Body:**

  ```json
  {
    "username": "user",
    "password": "password"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Login successful",
    "token": "jwt-token"
  }
  ```

### Dependencies

- **Node.js**: LTS version
- **Next.js**: Latest version
- **Express**: Latest version
- **SASS**: For styling
- **TypeScript**: For both Next.js and Node.js

---

### Author

[Umer Farooq](https://github.com/umerfarooq5349/)
