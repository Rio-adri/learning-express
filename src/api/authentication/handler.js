class AuthenticationsHandler {
    constructor(authenticationsService, usersService, tokenManager) {
        this._authenticationsService = authenticationsService;
        this._userService = usersService;
        this._tokenManager = tokenManager;

        this.postAuthenticationsHandler = this.postAuthenticationsHandler.bind(this);
        this.putAuthenticationsHandler = this.putAuthenticationsHandler.bind(this);
        this.deleteAuthenticationsHandler = this.deleteAuthenticationsHandler.bind(this);
    }

    async postAuthenticationsHandler (req, res, next) {
        try{
            const { username, password } = req.body;

            const id = await this._userService.verifyUserCredentials(username, password);
            const token = await this._tokenManager.generateAccessToken({ id });
            const refreshToken = await this._tokenManager.generateRefreshToken({ id });
            await this._authenticationsService.addRefreshToken(refreshToken);
    
            return res.status(201).json({
                status: 'success',
                data: {
                    token,
                    refreshToken
                }
            });
        } catch(error) {
            next(error);
        }
    }

    async putAuthenticationsHandler (req, res, next) {
        try {
            const { refreshToken } = req.body;

            await this._authenticationsService.verifyRefreshToken(refreshToken);
            const { id } = await this._tokenManager.verifyRefreshToken(refreshToken);

            const newToken = await this._tokenManager.generateAccessToken({ id });
            await this._authenticationsService.deleteRefreshToken(refreshToken);

            return res.status(200).json({
                status: 'success',
                data: {
                    token: newToken,
                }
            });
        } catch(error) {
            next(error)
        }
    }

    async deleteAuthenticationsHandler (req, res) {
       try{ 
        const { refreshToken } = req.body;

        await this._tokenManager.verifyRefreshToken(refreshToken);
        await this._authenticationsService.deleteRefreshToken(refreshToken);

        return res.status(200).json({
            status: 'success',
            message: 'Refresh token berhasil dihapus',
        });
       } catch(error) {
        next(error)
       }
    }
}

module.exports = AuthenticationsHandler;