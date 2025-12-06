# RestfulBooker API Test Collection

## 📋 Description
Postman collection for testing the RestfulBooker API [RestfulBooker API](https://restful-booker.herokuapp.com/)

## 🚀 How to run

### Prerequisites
- Postman / Newman

### Installation
- Import the collection into Postman
- Select RestfulBooker_Collection.json
✅ All variables are already set in the Collection Variables!**
- Set the global variable restHelpers (see below)

### Execution
**Postman:**
- Runner → Select the collection → Run

**Newman:**
```bash
newman run RestfulBooker_Collection.json -e environment.json
```

## 📂 Structure
- **PositiveTests**: Happy path scenarios
- **NegativeTests**: Error handling, security, boundary testing

## ⚙️ Configuration

### Collection Variables
- `maxResponseTime`: 800ms (default)
- `authToken`: dynamically obtained from `/auth`
- `newBookingId`: ID created during tests

### ⚙️ Helper Functions

Helper functions are **automatically** included in the Collection Scripts.

**Available functions:**
- `checkStatusCode(response, expectedCode)` - Validates HTTP status
- `checkResponseTime(response, maxTime)` - Checks the response time
- `checkContentType(response, expectedType)` - Validates Content-Type
- `checkRequiredKeys(jsonData, keys)` - Verifies presence of required keys
- `checkDataType(value, type, name)` - Validates data types

📄 Implementation details: [`restHelpers.js`](./restHelpers.js)

## 🧪 Test Coverage
- GET /booking - list & detail
- POST /booking - create
- PUT /booking/{id} - update
- DELETE /booking/{id} - delete
- Security: SQL injection, XSS
- Boundary: long strings, invalid types
