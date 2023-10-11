import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  console.log("pppppp create req.body = ", req.body);
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    console.log("0000000000000 ", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  console.log("pppppp list");
  try {
    let users = await User.find().select("name");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  console.log("pppppp read");
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  console.log("pppppp update");
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userByID = async (req, res, next, id) => {
    console.log("pppppp userByID");
    try {
      let user = await User.findById(id);
      if (!user)
        return res.status("400").json({
          error: "User not found",
        });
      req.profile = user;
      next();
    } catch (err) {
      return res.status("400").json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };

const remove = async (req, res) => {
  console.log("pppppp remove");
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, update };
