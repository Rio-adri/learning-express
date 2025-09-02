const TokenManager = require("./../../tokenize/TokenManager.js");
const AuthenticationError = require("../../exceptions/AuthenticationError.js");

const jwtValidation = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new AuthenticationError("Tidak terotentikasi")
    }

    try {
        const decoded = TokenManager.verifyAccessToken(token);
        req.user = decoded; // simpan payload ke req
        next();
    } catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
};

module.exports = jwtValidation;
