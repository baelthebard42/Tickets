import mongoose from "mongoose";
import { Password } from "../services/password";

// interface to describe properties for User

interface UserAttrs {
  email: string;
  password: string;
}

// interface to describe the methods of user model

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): any;
}

// interfacce to describe properties of user document. here, add all those properties that would be in model as well as added behind the scenes

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // not related to TS. this is 'type' is related to mongoose
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // removes the password from user object
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
// the UserDoc and UserModel define the generic for document and the user model itself.

export { User };
