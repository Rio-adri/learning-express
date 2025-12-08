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
        const userRole = await UserRole.findOne({
            where: {
                userId
            }
        });

        if(!userRole) {
            throw new NotFoundError("User Id tidak ditemukan");
        }

        // cek permissionnya apa berdasarkan userRole.
        const checkResult = await this._permissionsService.verifyRolePermission(userRole.roleId, permission);

        if(!checkResult) {
            throw new InvariantError("Anda tidak berhak mengakses source ini");
        }
    }

    async getRoleById(id) {
        const todo = await Role.findOne({
            where: {
                id
            }
        });

        if(!todo) {
            throw new NotFoundError("Data tidak ditemukan");
        }

        return todo
    }

    async verifyUserRole(userId) {
        const todo = await Role.findOne({
            where: {
                
            }
        });

        if(!todo) {
            throw new NotFoundError("Data tidak ditemukan");
        }

        return todo
    }

    async editRole(id, roleName) {
        const newRole = {
            id, 
            name: roleName
        }

        const updatedRole = await Role.update(newRole, {
            where: {
                id
            },
            returning: true
        });


        if(!updatedRole) {
            throw new NotFoundError("Role tidak ditemukan");
        }


        return updatedRole[0].id;
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