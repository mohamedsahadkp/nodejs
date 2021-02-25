const express = require("express");
const router = express.Router();

const healthRouter = require("../modules/health/healthRouter");
const authRouter = require("../modules/auth/authRouter");
const notebookRouter = require("../modules/notebook/notebookRouter");

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/notebook", notebookRouter);

module.exports = router;
