const { OK } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { success } = require("../../helpers/response");
const { jwtSecretKey, jwtExpiresIn } = require("../../config");
const { LANGUAGE_KEYS } = require("../../helpers/constants");

const { mongoose } = require("../../dataSource/mongodb/model");
const { createAccount, getUserByEmail } = require("./authService");

async function loginController(req, res) {
  const reqBody = req.body;
  let response;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    /**
     * Get user by email
     */
    const userAccount = await getUserByEmail(reqBody.email);
    if (!userAccount) {
      throw new Error("Invalid Credentials");
    }

    /**
     * Verify the password (Hash)
     */
    const passwordMatch = await bcrypt.compare(
      reqBody.password,
      userAccount.password
    );
    if (!passwordMatch) {
      throw new Error("Invalid Credentials");
    }

    /**
     * Generate JWT token user info
     */
    const jwtToken = jwt.sign(
      {
        userId: userAccount._id,
        isPasswordChanged: false,
      },
      jwtSecretKey,
      { expiresIn: jwtExpiresIn }
    );

    /**
     * Login response builder
     */
    response = {
      token: jwtToken,
      user: {
        id: userAccount._id,
        email: userAccount.email,
        name: userAccount.name,
        photo: userAccount.photo || null,
      },
    };
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  success(req, res, OK, response, req.t("Successfully logged in"));
}

async function createAccountController(req, res) {
  const reqBody = req.body;
  let account;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    account = await createAccount(reqBody, session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  success(req, res, OK, account, req.t(LANGUAGE_KEYS.ACTIVITY_UNAUTHORIZED));
}

async function forgotPasswordController(req, res) {
  const authUser = req.authUser;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //TODO:
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  success(req, res, OK, {}, req.t(LANGUAGE_KEYS.ACTIVITY_UNAUTHORIZED));
}

async function resetPasswordController(req, res) {
  const authUser = req.authUser;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //TODO:
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  success(req, res, OK, {}, req.t(LANGUAGE_KEYS.ACTIVITY_UNAUTHORIZED));
}

module.exports = {
  loginController,
  createAccountController,
  forgotPasswordController,
  resetPasswordController,
};
