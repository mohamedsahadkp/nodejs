const { User } = require("../../dataSource/mongodb/model/User");
const { STATUS } = require("../../helpers/constants");

async function createAccount(user, session) {
  return User(user).save({ session });
}

async function getUserByEmail(email) {
  return User.findOne({
    email,
    status: STATUS.ACTIVE,
  });
}

module.exports = {
  createAccount,
  getUserByEmail,
};
