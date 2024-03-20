require('dotenv').config()

module.exports = {
  BASE_URL: process.env.BASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  GQL_PORT: process.env.GQL_PORT,
  SECRET: process.env.SECRET || "",
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS) || 10,
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",
}
