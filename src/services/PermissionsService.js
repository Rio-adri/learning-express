const Permission = require("../models/Permission.js");
const RolePermission = require("../models/RolePermission.js");
const InvariantError = require("../exceptions/InvariantError.js");
const NotFoundError = require("../exceptions/NotFoundError.js");
const { nanoid } = require("nanoid");

class PermissionsService {
    async addPermission(permission) {
        const id = `permission-${nanoid(16)}`;
        const newPermission = await Permission.create({
            id,
            name: permission,
        });

        if(!newPermission) {
            throw new InvariantError("Permission gagal dibuat");
        }
        return newPermission.id;
    }

    async verifyRolePermission(roleId, permission) {
        
    }

    async editPermission(id, permission) {
        const newPermission = {
            id, 
            name: permission
        }

        const updatedPermission = await Permission.update(newPermission, {
            where: {
                id
            },
            returning: true
        });


        if(!updatedPermission) {
            throw new NotFoundError("Permission tidak ditemukan");
        }


        return updatedPermission[0].id;
    }

    async deletePermission(id) {
        const deletedPermissionRows = await Permission.destroy({
            where:{
                id
            }
        });

        if(deletedPermissionRows === 0) {
            throw new InvariantError ("permission gagal dihapus");
        }

        return "berhasil menghapus permission";
    }
}

module.exports = PermissionsService;