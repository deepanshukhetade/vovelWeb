let router = require("express").Router();
let Order = require("../model/order/order");
let response = require("../helper/response");

router.post("/createOrder", async (req, res) => {
  try {
    const result = await new Order(req.body).save();
    response.successResponse(res, 200, "Order Added Successfully", result);
  } catch (error) {
    response.errorMsgResponse(res, 301, "Something went wrong");
  }
});

router.get("/getAllOrder", async (req, res) => {
  try {
    let result = await Order.find();
    response.successResponse(res, 200, "Orders fetched successfully", result);
  } catch (err) {
    response.errorMsgResponse(res, 301, "Something went wrong");
  }
});

router.put("/updateBy/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await Order.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    if (result) {
      result = await Order.findById({ _id: id });
      response.successResponse(res, 200, "Order updated successfully", result);
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
    await Order.findByIdAndUpdate(
      { _id: id },
      { status: "deleted" },
      { new: true }
    );
    response.successResponse(res, 200, "Order deleted successfully", {});
  } catch (error) {
    response.errorMsgResponse(res, 301, "Something went wrong");
  }
});

module.exports = router;
