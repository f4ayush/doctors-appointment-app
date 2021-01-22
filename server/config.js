/*************Config files to export the env variables*************/
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  host: process.env.Host,
  database: process.env.Database,
  user: process.env.User,
  password: process.env.Password,
};
