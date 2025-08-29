const Authentication = require("../models/Authentication.js");

class AuthenticationsService {
    async addRefreshToken(token) {
        try {
            const newToken = await Authentication.create({
                token,
            });
        } catch(error) {
            return error;
        }
    }

    async verifyRefreshToken(token) {
        try {
            const result = await Authentication.findOne({
                where: {
                    token,
                }
            });

            return result;
        } catch(error) {
            return error;
        }
    }

    async deleteRefreshToken(token) {
        try {
            const deletedToken = await Authentication.destroy({
                where: {
                    token,
                }
            });

            if(deletedToken === 0) {
                return "gagal dihapus";
            }

            return "Berhasil dihapus";
        } catch(error) {
            return error;
        }
    }
}

module.exports = AuthenticationsService;