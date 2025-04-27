import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      type: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      type: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      type: true,
      trim: true,
      index: true,
    },
    avtar: {
      type: String, // cloudinary url use kar raha hai
      type: true,
    },

    coverImage: {
      type: String,
    },

    watchHostory: [
      {
        type: Schema.TypeObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      reqired: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessTocken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshTocken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("user", userSchema);
