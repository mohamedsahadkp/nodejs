const { mongoose } = require("./index");
const { User } = require("./User");
const { Notebook } = require("./Notebook");

const { STATUS } = require("../../../helpers/constants");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const noteSchema = new Schema(
  {
    name: { type: String, required: true, default: "Note" },
    note: { type: String, required: true },

    status: {
      type: String,
      required: true,
      enum: [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.SUSPENDED, STATUS.DELETED],
      default: STATUS.ACTIVE,
    },

    notebook: { type: ObjectId, ref: Notebook },
    author: { type: ObjectId, ref: User },
    sharedUsers: [{ type: ObjectId, ref: User }],
    createdDate: { type: Number, required: true },
    updatedDate: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const Note = mongoose.model("Note", noteSchema);
Note.createCollection();

module.exports = {
  Note,
};
