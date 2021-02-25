const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

module.exports = {
  /**
   * environment
   */
  environment: process.env.NODE_ENV,
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * MongoDB Database
   */
  mongoDBDatabase: {
    hostUrl: process.env.MONGODB_HOST_URL,
    options: {
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  api: {
    prefix: "/v1/",
  },

  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: "1h",
  passwordHashSaltoud: process.env.PASSWORD_HASH_SALT_ROUND,
};
