# TODO for /user-number-login-register API Implementation

- [x] Update models/users.model.js to add fields:
  - number (string)
  - otp (string)

- [x] Add userNumberLoginRegister function in controllers/users.controller.js:
  - Accept parameters: number, reg_id, device_id, location, user_type
  - Check if user with number exists
  - If not, create new user with generated app_id
  - Generate 5-digit OTP
  - Save OTP in user document
  - Respond with status "1", message "User logged in successfully", and otp

- [x] Add route in routes/users.route.js:
  - POST /user-number-login-register mapped to userNumberLoginRegister

- [ ] Test the API endpoint with sample data to verify OTP generation and response

# TODO for OTP Verification API Implementation

- [x] Add userOtpVerify function in controllers/users.controller.js:
  - Accept parameters: number, otp
  - Find user by number
  - Verify OTP matches stored OTP
  - If valid, generate JWT token and return success response
  - If invalid, return error

- [x] Add route in routes/users.route.js:
  - POST /user-otp-verify mapped to userOtpVerify

- [ ] Test the OTP verification API
