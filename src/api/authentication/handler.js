class AuthenticationsHandler {
    constructor(usersService, tokenManager) {
        this._userService = usersService;
        this._tokenManager = tokenManager;

        this.postAuthenticationsHandler = this.postAuthenticationsHandler.bind(this);
    }

    async postAuthenticationsHandler (req, res) {
        const { username, password } = req.body;

        const id = await this._userService.verifyUserCredentials(username, password);
        const token = await this._tokenManager.generateToken({ id });

        return res.status(201).json({
            status: 'success',
            data: {
                token
            }
        });
    }
}

module.exports = AuthenticationsHandler;