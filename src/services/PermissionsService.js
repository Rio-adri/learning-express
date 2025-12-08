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
        const permission = await Permission.findOne({
            where:{
                name: permission,
            }
        });

        if(!permission) {
            throw new NotFoundError("Permission tidak ada dalam database");
        }

        const rolePermission = await RolePermission.findOne({
            where:{
                roleId,
                permission: permission.Id,
            }
        });

        return !!rolePermission;
    }

    async editPermission(id, permission) {
        const [affectedRows, updatedRows] = await Role.update(
            { name: permission },
            { where: { id }, returning: true }
        );
        
        if (affectedRows === 0) {
            throw new NotFoundError("Role tidak ditemukan");
        }
        
        return updatedRows[0].id;
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