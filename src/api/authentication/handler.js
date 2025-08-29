class AuthenticationsHandler {
    constructor(authenticationsService, usersService, tokenManager) {
        this._authenticationsService = authenticationsService;
        this._userService = usersService;
        this._tokenManager = tokenManager;

        this.postAuthenticationsHandler = this.postAuthenticationsHandler.bind(this);
    }

    async postAuthenticationsHandler (req, res) {
        const { username, password } = req.body;

        const id = await this._userService.verifyUserCredentials(username, password);
        const token = await this._tokenManager.generateToken({ id });
        const refreshToken = await this._tokenManager.generateRefreshToken({ id });

        return res.status(201).json({
            status: 'success',
            data: {
                token,
                refreshToken
            }
        });
    }

    async putAuthenticationsHandler (req, res) {
        const { refreshToken } = req.body;

        await this._authenticationsService.verifyRefreshToken(refreshToken);
        const { id } = await this._tokenManager.verifyToken(refreshToken);

        const newToken = await this._tokenManager.generateToken({ id });

        return res.status(200).json({
            status: 'success',
            data: {
                token: newToken,
            }
        });
    }

    async deleteAuthenticationsHandler (req, res) {
        const { refreshToken } = req.body;

        await this._tokenManager.verifyToken(refreshToken);
        await this._authenticationsService.deleteRefreshToken(refreshToken);

        return res.status(200).json({
            status: 'success',
            message: 'Refresh token berhasil dihapus',
        });
    }
}

module.exports = AuthenticationsHandler;