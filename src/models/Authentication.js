const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");


const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];

const sequelize = createSequelize(dbConfig);

(async () => {
    try {
      await sequelize.authenticate();
      console.log(`Koneksi ke PostgreSQL (${env}) berhasil!`);
    } catch (error) {
      console.error("Gagal konek ke database:", error);
    }
})();

// model definition
const Authentication = sequelize.define('Authentication', {
   token: {
    type: DataTypes.STRING,
    allowNull: false,
   }
}, {
    tableName: 'authentications',
    timestamps: false
});

module.exports =  Authentication;
