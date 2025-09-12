const express = require("express");
const { socialLoginRegister } = require("../controllers/users.controller");

const router = express.Router();

/**
 * @swagger
 * /api/user/social-login-register:
 *   post:
 *     summary: User Social Login/Register
 *     description: Enables login/registration via social media accounts. If the user is new, registers them; otherwise, logs them in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               social_id:
 *                 type: string
 *                 description: Unique social platform ID
 *               name:
 *                 type: string
 *                 description: Full name
 *               email:
 *                 type: string
 *                 description: Email address
 *               reg_id:
 *                 type: string
 *                 description: Registration ID (FCM token for push notifications)
 *               device_id:
 *                 type: string
 *                 description: Unique device identifier
 *               user_type:
 *                 type: string
 *                 description: User login type (user/employer)
 *               location:
 *                 type: string
 *                 description: User current location
 *     responses:
 *       200:
 *         description: User has been social login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "1"
 *                 message:
 *                   type: string
 *                   example: "User has been social login successfully"
 *                 details:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     app_id:
 *                       type: string
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     user_type:
 *                       type: string
 *                       example: "user/employer"
 *                     is_new_user:
 *                       type: boolean
 *                       example: true
 *                     token_data:
 *                       type: object
 *                       properties:
 *                         auth_token:
 *                           type: string
 *                           example: "AuApU8BARQMDaFJBLZGeodcNBQr4uTk3s7Z9uh2gZtP2cDu7XpnnqG9eI4fRI7dC"
 *                         userId:
 *                           type: string
 *                           example: "1"
 *                         login_time:
 *                           type: string
 *                           example: "2024-08-29 22:31:38"
 */
router.post("/social-login-register", socialLoginRegister);

module.exports = router;
