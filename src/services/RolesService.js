const Role = require("../models/Role.js");
const UserRole = require("../models/UserRole.js");
const InvariantError = require("../exceptions/InvariantError.js");
const NotFoundError = require("../exceptions/NotFoundError.js");
const { nanoid } = require("nanoid");

class RolesService {
    constructor(permissionsService) {
        this._permissionsService = permissionsService;
    }

    async addRole(roleName) {
        const id = `role-${nanoid(16)}`;
        const newRole = await Role.create({
            id,
            name: roleName,
        });

        if(!newRole) {
            throw new InvariantError("Role gagal dibuat");
        }
        return newRole.id;
    }

    async verifyUserRole(userId, permission) {
        const userRoles = await UserRole.findAll({
            where: {
                userId
            }
        });

        if(userRoles.length === 0) {
            throw new NotFoundError("User belum memiliki role");
        }

        for (const ur of userRoles) {
            // cek permissionnya apa berdasarkan userRole.
            const allowed = await this._permissionsService.verifyRolePermission(ur.roleId, permission);

            if(allowed) {
                return;
            }
        }

        throw new InvariantError("Anda tidak berhak mengakses source ini");
        
    }

    async getRoleById(id) {
        const role = await Role.findOne({
            where: {
                id
            }
        });

        if(!role) {
            throw new NotFoundError("Data tidak ditemukan");
        }

        return role
    }

    async editRole(id, roleName) {
       const [affectedRows, updatedRows] = await Role.update(
            { name: roleName },
            { where: { id }, returning: true }
        );
        
        if (affectedRows === 0) {
            throw new NotFoundError("Role tidak ditemukan");
        }
        
        return updatedRows[0].id;
    }

    async deleteRole(id) {
        const deletedRoleRows = await Role.destroy({
            where:{
                id
            }
        });

        if(deletedRoleRows === 0) {
            throw new InvariantError ("role gagal dihapus");
        }

        return "berhasil menghapus role";
    }
}

module.exports = RolesService;