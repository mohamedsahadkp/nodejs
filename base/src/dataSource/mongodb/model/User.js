const bcrypt = require("bcryptjs");

const { STATUS } = require("../../../helpers/constants");

const { mongoose } = require("./index");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, required: false },

    status: {
      type: String,
      required: true,
      enum: [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.SUSPENDED, STATUS.DELETED],
      default: STATUS.ACTIVE,
    },
    // createdDate: { type: Number, required: true },
    // updatedDate: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw Error(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw Error(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);
User.createCollection();

module.exports = {
  User,
};
