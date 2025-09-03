const { nanoid } = require('nanoid');
const bcrypt = require("bcrypt");
const User = require("./../models/User.js");
const { Op } = require('sequelize');
const NotFoundError = require('../exceptions/NotFoundError.js');
const InvariantError = require('../exceptions/InvariantError.js');

class UsersService {
    async createUser({ username, email, password, fullname }) {
        try {
            if(await this.verifyUser(username, email) !== null) {
                throw new InvariantError("Username atau Email sudah digunakan");
            }
    
            const id = `user-${nanoid(16)}`;
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = await User.create({
                id,
                username,
                email,
                password: hashedPassword,
                fullname,

            });
    
            return user.id;
        } catch(error) {
            throw error;
        }
    }

    async verifyUser(username, email) {
        try{ 
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username },
                        { email }
                    ],
                }
            });

            if (user === null) {
                return user;
            }
            
            return user.id;
        } catch(error) {
            throw error;
        }
    }

    async verifyUserCredentials(username, password) {
        try{ 
            const user = await User.findOne({
                where: {
                    username,
                }
            });

            if(user === null) throw new NotFoundError("user tidak ditemukan");
            

            const isValid = await bcrypt.compare(password, user.password);

            if(!isValid) throw new InvariantError("password tidak valid");

            return user.id;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = UsersService;