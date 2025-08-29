const express = require("express");
const router = express.Router();
const UsersHandler = require("./handler.js");
const UsersService = require("./../../services/UsersService.js");
const AuthenticationsService = require("../../services/AuthentictionsService.js");
const AuthenticationsHandler = require("../authentication/handler.js");
const TokenManager = require("./../../tokenize/TokenManager.js");
const { sanitizeXSS } = require("./../../middleware/validation/sanitation/sanitizeXSS.js");

const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();
const usersHandler = new UsersHandler(usersService);
const authenticationsHandler = new AuthenticationsHandler(authenticationsService, usersService, TokenManager);

router.post('/register', sanitizeXSS, usersHandler.postUserHandler);
router.post('/login', sanitizeXSS, authenticationsHandler.postAuthenticationsHandler);
router.put('', sanitizeXSS, authenticationsHandler.putAuthenticationsHandler);
router.delete('', sanitizeXSS, authenticationsHandler.deleteAuthenticationsHandler);

module.exports = router;