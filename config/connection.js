const { connect, connection } = require("mongoose");

const connectionString =
  proccess.env.MONGODB_URI || "mongodb://127.0.0.1:27017userssDB";
connect(connectionString);

module.exports = connection;
