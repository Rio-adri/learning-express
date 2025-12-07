const Role = require("../models/Role.js");
const InvariantError = require("../exceptions/InvariantError.js");
const NotFoundError = require("../exceptions/NotFoundError.js");
const { nanoid } = require("nanoid");

class RolesService {
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