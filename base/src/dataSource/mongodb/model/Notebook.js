const { mongoose } = require("./index");
const { User } = require("./User");

const { STATUS } = require("../../../helpers/constants");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const notebookSchema = new Schema(
  {
    name: { type: String, required: true, default: "Notbook" },
    description: { type: String, required: false, default: "Notbook" },

    status: {
      type: String,
      required: true,
      enum: [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.SUSPENDED, STATUS.DELETED],
      default: STATUS.ACTIVE,
    },

    author: { type: ObjectId, ref: User },
    sharedUsers: [{ type: ObjectId, ref: User }],
    createdDate: { type: Number, required: true },
    updatedDate: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const Notebook = mongoose.model("Notebook", notebookSchema);
Notebook.createCollection();

module.exports = {
  Notebook,
};
