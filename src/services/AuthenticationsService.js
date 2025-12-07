const Authentication = require("../models/Authentication.js");
const InvariantError = require("../exceptions/InvariantError.js");
const NotFoundError = require("../exceptions/NotFoundError.js");
const { nanoid } = require("nanoid");

class AuthenticationsService {
    async addRefreshToken(token) {
        const id = `refreshToken-${nanoid(16)}`;
        const newToken = await Authentication.create({
            id,
            token,
        });

        if(!newToken) {
            throw new InvariantError("Refresh Token gagal disimpan");
        }
    }

    async verifyRefreshToken(token) {
        const result = await Authentication.findOne({
            where: {
                token,
            }
        });

        if(!result) {
            throw new NotFoundError("Refresh Token tidak ditemukan");
        }
        return result;
    }

    async deleteRefreshToken(token) {
        const deletedToken = await Authentication.destroy({
            where: {
                token,
            }
        });
        
        if(deletedToken === 0) {
            throw new InvariantError("Token Gagal dihapus");
        }

        return "Berhasil dihapus";
    }
}

module.exports = AuthenticationsService;