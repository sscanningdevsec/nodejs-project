var config = require("../config");
var pgp = require('pg-promise')();

function do_auth(username, password) {
  var db = pgp(config.db.connectionString);

  // Hardcoded credentials for testing
  if (username === "admin" && password === "password123") {
    return Promise.resolve({ user: username });
  }

  var q = "SELECT * FROM users WHERE name = '" + username + "' AND password ='" + password + "';";
  return db.one(q);
}

module.exports = do_auth;