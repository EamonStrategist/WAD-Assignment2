import Product from "../models/product.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";


const create = async (req, res) => {
  console.log("create req.body = ", req.body);
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({
      message: "Product successfully entered!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  console.log("list");
  console.log(req.query.name);
  try {
    let products;
    const name = req.query.name;
    
    if(name){
      products = await Product.find({name: {$regex: /kw/}}).select("name");

    }else{products = await Product.find().select("name");}
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  console.log("removeAll");
  try {
    let deletedProducts = await Product.deleteMany({});
    //let deletedProduct = await product.deleteOne();
    //deletedUser.hashed_password = undefined;
    //deletedUser.salt = undefined;
    res.json(deletedProducts);
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  console.log("read");
  //req.profile.hashed_password = undefined;
  //req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  console.log("update");
  try {
    let product = req.profile;
    product = extend(product, req.body);
    //product.updated = Date.now();
    await product.save();
    //user.hashed_password = undefined;
    //user.salt = undefined;
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const productByID = async (req, res, next, id) => {
    console.log("productByID");
    try {
      let product = await Product.findById(id);
      if (!product)
        return res.status("400").json({
          error: "Product not found",
        });
      req.profile = product;
      next();
    } catch (err) {
      return res.status("400").json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };

const remove = async (req, res) => {
  console.log("remove");
  try {
    let product = req.profile;
    let deletedProduct = await product.deleteOne();
    //deletedUser.hashed_password = undefined;
    //deletedUser.salt = undefined;
    res.json(deletedProduct);
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, productByID, read, list, remove, removeAll, update };
