class UsersHandler {
    constructor(userService) {
        this._userService = userService;

        this.postUserHandler = this.postUserHandler.bind(this);
    }

    async postUserHandler(req, res, next) {
        try {
            const user = req.body;

            const userId = await this._userService.createUser(user);

            if(userId === 'username atau email sudah digunakan') {
                return res.status(409).json({
                    status: 'fail',
                    message: userId,
                });
            }

            return res.status(201).json({
                status: 'success',
                data: {
                    userId,
                }
            });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = UsersHandler;