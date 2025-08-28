const { nanoid } = require('nanoid');
const bcrypt = require("bcrypt");
const User = require("./../models/User.js");
const { Op } = require('sequelize');

class UsersService {
    async createUser({ username, email, password, fullname }) {
        try {
            if(await this.verifyUser(username, email)) {
                return 'username atau email sudah digunakan';
            }
    
            const id = `user-${nanoid(16)}`;
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = await User.create({
                id,
                username,
                email,
                password: hashedPassword,
                fullname
            });
    
            return user.id;
        } catch(error) {
            return error;
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
            if(!user) {
                return;
            }
            return user.id;
        } catch(error) {
            return error;
        }
    }

    async verifyUserCredentials(username, password) {
        try{ 
            const user = await User.findOne({
                where: {
                    username,
                }
            });

            if(!user) return;
            

            const isValid = await bcrypt.compare(password, user.password);

            if(!isValid) return;

            return user.id;
        } catch(error) {
            return error;
        }
    }
}

module.exports = UsersService;