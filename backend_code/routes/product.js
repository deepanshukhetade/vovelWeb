let router = require("express").Router();
let Product = require("../model/product/product");
let response = require("../helper/response");

router.post("/addProduct", async (req, res) => {
  try {
    const result = await new Product(req.body).save();
    response.successResponse(res, 200, "Product Added Successfully", result);
  } catch (error) {
    response.errorMsgResponse(res, 301, "Something went wrong");
  }
});

router.get("/getAllProduct", async (req, res) => {
  try {
    let result = await Product.find();
    response.successResponse(res, 200, "Products fetched successfully", result);
  } catch (err) {
    response.errorMsgResponse(res, 301, "Something went wrong");
  }
});

router.put("/updateBy/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    if (result) {
      result = await Product.findById({ _id: id });
      response.successResponse(
        res,
        200,
        "Product updated successfully",
        result
      );
    } else {
      response.errorMsgResponse(res, 301, "Something went wrong");
    }
  } catch (error) {
    response.errorMsgResponse(res, 301, "Something went wrong");
  }
});

router.put("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Product.findByIdAndUpdate(
      { _id: id },
      { status: "deleted" },
      { new: true }
    );
    response.successResponse(res, 200, "Product deleted successfully", {});
  } catch (error) {
    response.errorMsgResponse(res, 301, "Something went wrong");
  }
});

module.exports = router;
