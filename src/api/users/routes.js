const express = require("express");
const router = express.Router();
const UsersHandler = require("./handler.js");
const UsersService = require("./../../services/UsersService.js");
const AuthenticationsHandler = require("../authentication/handler.js");
const TokenManager = require("./../../tokenize/TokenManager.js");
const { sanitizeXSS } = require("./../../middleware/validation/sanitation/sanitizeXSS.js");

const usersService = new UsersService();
const usersHandler = new UsersHandler(usersService);
const authenticationsHandler = new AuthenticationsHandler(usersService, TokenManager);

router.post('/register', sanitizeXSS, usersHandler.postUserHandler);
router.post('/login', sanitizeXSS, authenticationsHandler.postAuthenticationsHandler);

module.exports = router;