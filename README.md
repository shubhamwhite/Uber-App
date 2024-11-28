# User Registration Module

This project provides a complete user registration system using Node.js, Express, and MongoDB with Mongoose. It includes features like password hashing, JWT-based authentication, and middleware for validation and error handling.

---

## Key Highlights

### Keywords Passed
- **Registration Inputs**: 
  - `full_name` (with nested `first_name` and `last_name`)
  - `email`
  - `password`
- **Generated Outputs**:
  - JWT Token
  - User object with essential details
- **Other Keywords**:
  - Password Hashing
  - Authentication

---

## Database Schema and Tables

- **Database**: MongoDB
- **Collection/Table**: 
  - `user` (User data is stored in this collection)

### Fields in User Schema:
1. `full_name` (Object)
   - `first_name` (String, Required, MinLength: 3)
   - `last_name` (String, Optional, MinLength: 3)
2. `email` (String, Required, Unique, MinLength: 5)
3. `password` (String, Required, Select: false)
4. `socket_id` (String, Optional)

---

## Error Handling

### Error Cases:
1. **Missing Input Fields**:
   - Example: `first_name`, `email`, or `password` missing.
   - **Response**: 
     ```json
     {
       "message": "Email and password are required"
     }
     ```
2. **User Already Exists**:
   - When trying to register an email already in use.
   - **Response**: 
     ```json
     {
       "message": "User already exists"
     }
     ```
3. **Invalid Data**:
   - Example: If `first_name` has less than 3 characters.
   - **Response**:
     ```json
     {
       "message": "First name must be at least 3 characters long"
     }
     ```

---

## Request and Response

### Request (API Endpoint)

**POST /register**

- **Headers**:
  - `Content-Type: application/json`
- **Body Example**:
  ```json
  {
    "full_name": {
      "first_name": "Alice",
      "last_name": "Smith"
    },
    "email": "alice.smith@example.com",
    "password": "securepassword123"
  }


# User Login Module

This project provides a user login system using Node.js, Express, and MongoDB with Mongoose. It includes features like input validation, password authentication, and JWT-based authentication for secure access.

---

## Key Highlights

### Keywords Passed
- **Login Inputs**:
  - `email` (Required, Valid email format)
  - `password` (Required, Minimum 6 characters)
- **Generated Outputs**:
  - JWT Token for user authentication
  - User object with relevant details
- **Other Keywords**:
  - Password Comparison (Using `comparePassword` method)
  - JWT Authentication

---

## Database Schema and Tables

- **Database**: MongoDB
- **Collection/Table**: 
  - `user` (User data is stored in this collection)

### Fields in User Schema:
1. `full_name` (Object)
   - `first_name` (String, Required, MinLength: 3)
   - `last_name` (String, Optional, MinLength: 3)
2. `email` (String, Required, Unique, MinLength: 5)
3. `password` (String, Required, Select: false)
4. `socket_id` (String, Optional)

---

## Error Handling

### Error Cases:
1. **Missing Input Fields**:
   - Example: `email` or `password` missing.
   - **Response**:
     ```json
     {
       "message": "Email and password are required"
     }
     ```
2. **Invalid Credentials**:
   - When the provided email or password is incorrect.
   - **Response**:
     ```json
     {
       "message": "Invalid user or password"
     }
     ```
3. **Validation Errors**:
   - If the input does not match the expected format (e.g., invalid email or weak password).
   - **Response**:
     ```json
     {
       "message": "Email must be a valid email address. Password must be at least 6 characters long."
     }
     ```

---

## Request and Response

### Request (API Endpoint)

**POST /login**

- **Headers**:
  - `Content-Type: application/json`
- **Body Example**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
