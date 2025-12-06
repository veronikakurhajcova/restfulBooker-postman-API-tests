# RestfulBooker API Test Collection

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![API Testing](https://img.shields.io/badge/API%20Testing-2496ED?style=for-the-badge&logo=swagger&logoColor=white)

Comprehensive Postman collection for testing [RestfulBooker API](https://restful-booker.herokuapp.com/) with positive tests, negative tests, and security testing.

---

## 📋 Description

This test suite contains automated tests for all CRUD operations of the RestfulBooker API:
- ✅ **Positive tests** - Happy path scenarios
- ❌ **Negative tests** - Error handling, boundary testing, security
- 🔒 **Security tests** - SQL injection, XSS, authentication
- 📊 **Schema validation** - JSON schema verification
- ⚡ **Performance checks** - Response time monitoring

**Total: 35+ automated tests**

---

## 🚀 How to Run

### Prerequisites

- **Postman Desktop** (recommended) or Postman Web
- **Newman** (optional, for CI/CD) - `npm install -g newman`

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/your-username/restfulPostman.git
   ```

2. **Import into Postman**
   - Open Postman
   - `File` → `Import`
   - Select `RestfulBooker_Collection.json`
   - ✅ All variables are already set in Collection Variables!

3. **Set up Global Variables** (Required)
   - In Postman: `Environments` → `Globals`
   - Create variable `restHelpers`
   - Copy content from `restHelpers.js` file as the value
   - Save

### Running Tests

#### **Postman Runner**
1. Click on the `RestfulBooker` collection
2. Click `Run` (or `▶️` icon)
3. Click `Run RestfulBooker`

#### **Newman (CLI)**
```bash
# Basic run
newman run RestfulBooker_Collection.json

# With HTML report
newman run RestfulBooker_Collection.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export ./report.html
```

---

## 📂 Structure

```
RestfulBooker/
│
├── 🔑 Auth/
│   └── POST Create Token              # Get authentication token
│
├── ✅ RestfulBooker - PositiveTests/
│   ├── GET/
│   │   ├── Get All Bookings          # List all bookings
│   │   ├── Get Booking by ID         # Get specific booking details
│   │   ├── Verify Created Booking    # Verification after CREATE
│   │   └── Verify After DELETE       # 404 check after DELETE
│   │
│   ├── POST/
│   │   └── Create Booking            # Create new booking
│   │
│   ├── PUT/
│   │   └── Update Booking            # Full update of booking
│   │
│   └── DELETE/
│       └── Delete Booking            # Delete booking
│
└── ❌ RestfulBooker - NegativeTests/
    ├── GET/
    │   └── Get Non-existent ID       # 404 handling
    │
    ├── POST/
    │   ├── Negative Price            # Boundary test
    │   ├── Invalid Date Range        # Checkout < Checkin
    │   ├── Missing Required Fields   # Validation test
    │   ├── SQL Injection Attempt     # Security test
    │   ├── XSS Attempt               # Security test
    │   └── Extremely Long String     # Boundary test
    │
    ├── PUT/
    │   ├── Update Without Auth       # 403 handling
    │   └── Invalid Data Types        # Type validation
    │
    └── DELETE/
        └── Delete Without Auth       # 403 handling
```

---

## ⚙️ Configuration

### Collection Variables

These variables are **automatically set** and managed during test execution:

| Variable | Type | Description |
|----------|------|-------------|
| `maxResponseTime` | Static | 800ms - maximum allowed response time |
| `authToken` | Dynamic | Token obtained from POST `/auth` |
| `newBookingId` | Dynamic | ID of booking created in POST test |
| `deletedBookingId` | Dynamic | Backup ID for verification after DELETE |

**No manual setup required** - variables are automatically created and updated during test runs! ✅

---

## 🛠️ Helper Functions

Helper functions are **automatically included** in Collection Scripts.

### Available Functions:

- `checkStatusCode(response, expectedCode)` - Validates HTTP status code
- `checkResponseTime(response, maxTime)` - Checks response time
- `checkContentType(response, expectedType)` - Validates Content-Type header
- `checkRequiredKeys(jsonData, keys)` - Verifies presence of required keys
- `checkDataType(value, type, name)` - Validates data types

📄 **Implementation details:** [`restHelpers.js`](./restHelpers.js)

⚠️ **Important:** You must manually set up `restHelpers` in Postman Global Variables. See [Installation](#installation) step 3.

---

## 🧪 Test Coverage

### ✅ Positive Tests (Happy Path)

| Endpoint | Test Count | What is Tested |
|----------|------------|----------------|
| `GET /booking` | 6 | Status, response time, array structure, unique IDs |
| `GET /booking/{id}` | 6 | Status, response time, schema validation, date logic |
| `POST /booking` | 4 | Status, schema, data integrity, ID generation |
| `PUT /booking/{id}` | 4 | Status, authentication, data update verification |
| `DELETE /booking/{id}` | 4 | Status, deletion confirmation, cleanup |

### ❌ Negative Tests

| Category | Tests | Examples |
|----------|-------|----------|
| **Error Handling** | 4 | Non-existent ID (404), Missing fields (400) |
| **Security** | 3 | SQL injection, XSS, Unauthorized access (403) |
| **Boundary Testing** | 3 | Negative price, Invalid dates, 10k character string |
| **Validation** | 2 | Invalid data types, Missing auth |

**Total: 35+ automated tests**

---

## 🐛 Known Issues

### 1. API accepts invalid date ranges
- **Issue:** `POST /booking` accepts `checkout < checkin`
- **Workaround:** Test logs warning but does not fail

### 2. XSS payload stored without escaping
- **Issue:** API stores `<script>` tags without sanitization
- **Workaround:** Test detects and logs security issue

---

## 📝 Contributing

Contributions are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingTest`)
3. Commit changes (`git commit -m 'Add amazing test'`)
4. Push to branch (`git push origin feature/AmazingTest`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file.

---

## 🔗 Useful Links

- [RestfulBooker API Documentation](https://restful-booker.herokuapp.com/apidoc/index.html)
- [Postman Learning Center](https://learning.postman.com/)
- [Newman Documentation](https://www.npmjs.com/package/newman)

---

## ⭐ Support

If this project helped you, give it a ⭐ on GitHub!

---

**Last updated:** December 2025


# 🐛 Bugs Found in RestfulBooker API

---

## 📊 Summary

| Bug ID | Title | Severity | Type |
|--------|-------|----------|------|
| BUG-001 | Invalid Date Range Accepted | 🟡 Medium | Validation |
| BUG-002 | XSS Payload Not Sanitized | 🔴 **High** | Security |
| BUG-003 | Missing Input Length Validation | 🟡 Medium | Security |
| BUG-004 | Negative Price Accepted | 🟢 Low | Business Logic |

**Total issues:** 4 | **Critical:** 1

---

## BUG-001: Invalid Date Range Accepted

**Severity:** 🟡 Medium | **Endpoint:** `POST /booking`

### Issue
API accepts bookings where checkout date is earlier than checkin date (e.g., checkin: 2025-12-10, checkout: 2025-12-05), violating basic business logic.

### Impact
Creates invalid bookings, data corruption, customer confusion.

### Recommendation
Implement server-side validation to ensure checkout date is always after checkin date before creating bookings.

---

## BUG-002: XSS Payload Not Sanitized ⚠️

**Severity:** 🔴 **High** | **Endpoint:** `POST /booking` | **OWASP:** A03:2021

### Issue
API stores and returns XSS payloads like `<script>alert('XSS')</script>` without sanitization or escaping, enabling Cross-Site Scripting attacks.

### Impact
Critical security vulnerability that could allow attackers to steal session tokens, redirect users, or capture sensitive data.

### Recommendation
Implement input sanitization on server-side and escape all HTML special characters before storage. Use Content Security Policy headers and validate inputs against whitelist.

---

## BUG-003: Missing Input Length Validation

**Severity:** 🟡 Medium | **Endpoint:** `POST /booking`

### Issue
API accepts extremely long strings (10,000+ characters) without validation, leading to potential DoS attacks or database performance issues.

### Impact
Application instability, excessive storage consumption, and potential denial of service vulnerability.

### Recommendation
Implement maximum length validation for all string fields (e.g., firstname: 100 chars, lastname: 100 chars) and return clear error messages for validation failures.

---

## BUG-004: Negative Price Accepted

**Severity:** 🟢 Low | **Endpoint:** `POST /booking`

### Issue
API inconsistently accepts negative values for totalprice field (e.g., -500), which violates financial data integrity.

### Impact
Financial data corruption and potential exploitation for fraudulent bookings.

### Recommendation
Add validation to ensure totalprice is always a positive number greater than zero.

---

## 📈 Testing Overview

- **Endpoints tested:** 5
- **Test cases executed:** 35+
- **Pass rate:** 89%
- **Testing approach:** Automated API testing, negative testing, security testing (OWASP Top 10), boundary analysis

---

**Tested by:** Veronika | **Date:** December 2025
