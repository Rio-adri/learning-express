const TokenManager = require("./../../tokenize/TokenManager.js");

const jwtValidation = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = TokenManager.verifyToken(token);
        req.user = decoded; // simpan payload ke req
        next();
    } catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
};

module.exports = jwtValidation;
