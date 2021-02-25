const { Notebook } = require("../../dataSource/mongodb/model/Notebook");
const { STATUS } = require("../../helpers/constants");

async function createNotebook(userId, notebook, session) {
  notebook.author = userId;
  return Notebook(notebook).save({ session });
}

async function updateNotebookById(userId, notebookId, notebook, session) {
  return Notebook.findOneAndUpdate(
    {
      _id: notebookId,
      author: userId,
    },
    notebook
  ).session(session);
}

async function getNotebookById(userId, notebookId) {
  return Notebook.findOne({
    _id: notebookId,
    author: userId,
    status: STATUS.ACTIVE,
  });
}

async function getAllNotebooks(userId) {
  return Notebook.find({
    author: userId,
    status: STATUS.ACTIVE,
  });
}

//
// async function createNotbook(activityData, session) {
//   return Activity(activityData).save({ session });
// }
// async function findAndUpdateActivityById(
//   institutionId,
//   activityId,
//   updatedActivityData,
//   session
// ) {
//   return Activity.findOneAndUpdate(
//     { _id: activityId, institutionId },
//     updatedActivityData
//   ).session(session);
// }

// async function findAndDeleteActivityById(institutionId, activityId) {
//   return Activity.findOneAndUpdate(
//     { _id: activityId, institutionId },
//     { status: STATUS.INACTIVE }
//   );
// }

// async function addCommentToActivity(activityId, commentId) {
//   return Activity.findById(activityId).then(activity => {
//     if (activity) {
//       activity.commentsCount += 1;
//       activity.comments.push(commentId);
//       activity.save();
//     }
//   });
// }

// async function getActivityByInstitutionId(
//   institutionId,
//   paymentStatus,
//   type,
//   q
// ) {
//   let filter = {};
//   if (q && q.trim()) {
//     filter = {
//       $or: [
//         { title: new RegExp(`${q}`, "i") },
//         { description: new RegExp(`${q}`, "i") }
//       ]
//     };
//   }

//   if (type) {
//     filter.type = type.toUpperCase();
//   }

//   if (type === ACTIVITY.TYPE.PAYMENT && paymentStatus) {
//     filter["payment.status"] = paymentStatus;
//   }

//   filter.institutionId = institutionId;
//   filter.status = STATUS.ACTIVE;
//   filter.showOnHomeFeed = true;

//   return Activity.find(filter)
//     .sort({ updatedOn: -1 })
//     .populate({
//       path: "comments",
//       model: "Comment",
//       populate: {
//         path: "author",
//         model: "Author",
//         select: { _id: 0, activity: 0 }
//       }
//     })
//     .populate({
//       path: "groups",
//       model: "Group",
//       select: { _id: 0, status: 0 }
//     })
//     .populate({
//       path: "taggedStudents",
//       model: "Student",
//       select: { _id: 0, status: 0 }
//     });
// }

module.exports = {
  createNotebook,
  updateNotebookById,
  getNotebookById,
  getAllNotebooks,
};
