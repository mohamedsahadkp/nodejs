const express = require("express");

const router = express.Router();
const { catchErrors } = require("../../errorHandlers");
const { isAuthenticated } = require("../../middlewares");

const {
  createAccountValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("./authValidator");
const {
  loginController,
  createAccountController,
  forgotPasswordController,
  resetPasswordController,
} = require("./authController");

router.post("/login", loginValidator, catchErrors(loginController));
router.post(
  "/create-account",
  createAccountValidator,
  catchErrors(createAccountController)
);
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  catchErrors(forgotPasswordController)
);
router.post(
  "/reset-password",
  resetPasswordValidator,
  catchErrors(resetPasswordController)
);

module.exports = router;
