const jwt = require("jsonwebtoken");

const TokenManager = {
    generateAccessToken: (payload) => {
        try {
            const token = jwt.sign(payload, process.env.AUTH_KEY, { expiresIn: process.env.AUTH_AGE });

            return token;
        } catch(error) {
            console.log(error);
        }
    },
    generateRefreshToken: (payload) => {
        try {
            const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: process.env.REFRESH_AGE });

            return refreshToken;
        } catch(error) {
            console.log(error);
        }
    },
    verifyAccessToken: (token) => {
        try {
            return jwt.verify(token, process.env.AUTH_KEY);
        } catch(error) {
            console.log(error);
        }
    },
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_KEY);
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = TokenManager;