const express = require("express");

const router = express.Router();
const { catchErrors } = require("../../errorHandlers");
const { isAuthenticated } = require("../../middlewares");

const notbookValidator = require("./notbookValidator");
const {
  createNotebookController,
  updateNotebookController,
  getAllNotebookController,
} = require("./notbookController");

router.post(
  "/",
  notbookValidator,
  isAuthenticated,
  catchErrors(createNotebookController)
);

router.patch(
  "/:notebookId",
  isAuthenticated,
  catchErrors(updateNotebookController)
);

router.get("/", isAuthenticated, catchErrors(getAllNotebookController));

// router.get("/:notebookId", isAuthenticated, catchErrors(getCommentController));

module.exports = router;
