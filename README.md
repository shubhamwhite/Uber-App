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
  ```

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
  ```


# Health Check Controller

This controller provides an endpoint for performing a health check on the server. It checks the uptime, system resource usage, and other services like Redis, and returns the server's current health status.

## Functions

### `formatBytes(bytes, decimals = 2)`
Converts bytes into a human-readable format such as KB, MB, GB, etc.

#### Parameters:
- `bytes` (number): The size in bytes to convert.
- `decimals` (number, optional): The number of decimal places to display (default is 2).

#### Returns:
- A string representing the formatted size (e.g., "10.5 MB").

### `formatUptime(uptimeInSeconds)`
Converts the uptime in seconds into a human-readable format (hours, minutes, seconds).

#### Parameters:
- `uptimeInSeconds` (number): The uptime of the process in seconds.

#### Returns:
- A string representing the uptime in a readable format (e.g., "1h 23m 45s").

### `healthCheck(req, res, next)`
The main function that handles the health check endpoint. It checks the server's status, including uptime, memory usage, CPU usage, and services like Redis.

#### Parameters:
- `req` (object): The request object.
- `res` (object): The response object.
- `next` (function): The next middleware function (not used in this example).

#### Returns:
- A JSON response with the following structure:
  - `uptime`: The server's uptime formatted as a string.
  - `message`: A message indicating the success or failure of the health check ("OK" or "FAILED").
  - `timestamp`: The current timestamp of the health check request.
  - `node`: An object with:
    - `status`: The status of the Node.js process ("OK" or "ERROR").
    - `version`: The current Node.js version.
    - `memoryUsage`: An object with memory usage stats (`rss`, `heapTotal`, `heapUsed`, `external`, `arrayBuffers`).
    - `cpuUsage`: An object with CPU usage stats (`user`, `system`).
  - `services`: An object with services to check. By default, it includes a `redis` field with the value "Pending" (you can add additional service checks as needed).
  - `error`: In case of failure, this will contain the error message.

#### Example Response (Success):
```json
{
  "status": 200,
  "message": "Health check successful",
  "data": {
    "uptime": "1h 23m 45s",
    "message": "OK",
    "timestamp": 1631041080000,
    "node": {
      "status": "OK",
      "version": "v14.17.0",
      "memoryUsage": {
        "rss": "50 MB",
        "heapTotal": "30 MB",
        "heapUsed": "25 MB",
        "external": "10 MB",
        "arrayBuffers": "5 MB"
      },
      "cpuUsage": {
        "user": "5.32 ms",
        "system": "3.21 ms"
      }
    },
    "services": {
      "redis": "Pending"
    }
  }
}
