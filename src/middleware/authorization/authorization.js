const authorize = (permission, rolesService, permissionsService) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;

            await rolesService.verifyUserRole(userId, permission);

            next()
        } catch(err) {
            next(err);
        }
    }
}