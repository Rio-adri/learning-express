const checkSquelize = async (sequelize, env) => {
    try {
      await sequelize.authenticate();
      console.log(`Koneksi ke PostgreSQL (${env}) berhasil!`);
    } catch (error) {
      console.error("Gagal konek ke database:", error);
    }
};

module.exports = checkSquelize;