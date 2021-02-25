const { OK } = require("http-status-codes");
const moment = require("moment");

const { success } = require("../../helpers/response");
const { LANGUAGE_KEYS } = require("../../helpers/constants");

const { mongoose } = require("../../dataSource/mongodb/model");
const {
  createNotebook,
  updateNotebookById,
  getAllNotebooks,
  getNotebookById,
} = require("./notebookService");

async function createNotebookController(req, res) {
  const reqBody = req.body;
  const authUser = req.authUser;
  let notebook;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let dateTime = moment.utc().valueOf();
    reqBody.createdDate = dateTime;
    reqBody.updatedDate = dateTime;

    notebook = await createNotebook(authUser.userId, reqBody, session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  success(req, res, OK, notebook, req.t(LANGUAGE_KEYS.ACTIVITY_UNAUTHORIZED));
}

async function updateNotebookController(req, res) {
  const reqBody = req.body;
  const { notebookId } = req.params;
  const authUser = req.authUser;
  let notebook;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    reqBody.updatedDate = moment.utc().valueOf();
    notebook = await updateNotebookById(
      authUser.userId,
      notebookId,
      reqBody,
      session
    );
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  success(req, res, OK, notebook, req.t(LANGUAGE_KEYS.ACTIVITY_UNAUTHORIZED));
}

async function getAllNotebookController(req, res) {
  const authUser = req.authUser;
  let notebook;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    notebook = await getAllNotebooks(authUser.userId, session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  success(req, res, OK, notebook, req.t(LANGUAGE_KEYS.ACTIVITY_UNAUTHORIZED));
}

module.exports = {
  createNotebookController,
  updateNotebookController,
  getAllNotebookController,
};
