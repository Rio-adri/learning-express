const config = { 
    app: {
        host: process.env.HOST,
        port: process.env.PORT,
    },
    jwt: {
        access: process.env.AUTH_KEY,
        refresh: process.env.REFRESH_KEY,
        accessAge: process.env.AUTH_AGE,
        processAge: process.env.REFRESH_AGE,
    },
    cache: {
        host: process.env.REDIS_SERVER,
    }
}

module.exports = config;