const jwt = require("jsonwebtoken");

const TokenManager = {
    generateToken: (payload) => {
        try {
            const token = jwt.sign(payload, process.env.AUTH_KEY, { expiresIn: process.env.AUTH_AGE});
            return token;
        } catch(error) {
            console.log(error);
        }
    },
    verifyToken: (token) => {
        return jwt.verify(token, process.env.AUTH_KEY);
    }
}

module.exports = TokenManager;