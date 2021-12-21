const Warehouse = require("../../models/warehouseModel");
const WareProd = require("../../models/wareProductModel")
const { handleError } = require("../lib/errorHandling");
const constantConfig = require("../../config/constantConfig");

module.exports.createWarehouse = async (req, res) => {
  const data = {
    warehouseNumber: req.body.warehouseNumber,
    stockLimit: req.body.stockLimit,
  }
  
  try {
    let warehouseData = await  new Warehouse(data).save()
    return res.status(constantConfig.SUCCESS_CODE).json({
       status: constantConfig.SUCCESS,
       message: `warehouse created!`,
       warehouse: warehouseData,
     });
  } catch (err) {
    handleError("error", err, "");
    return res.status(constantConfig.INTERNAL_SERVER_ERROR).json({
      status: constantConfig.ERROR,
      message: constantConfig.SOMETHING_WENT_WRONG,
    });
  }
};
module.exports.listWarehouses = async (req, res) => {
  try {
    Warehouse.find({}, (error, doc) => {
      if (error) {
        handleError("error", error, "");
      } else {
        return res.status(constantConfig.SUCCESS_CODE).json({
          status: constantConfig.SUCCESS,
          message: `Warehouse List`,
          warehouses: doc,
        });
      }
    });
  } catch (err) {
    handleError("error", err, "");
    console.log(`err`, err);
    return res.status(constantConfig.INTERNAL_SERVER_ERROR).json({
      status: constantConfig.ERROR,
      message: constantConfig.SOMETHING_WENT_WRONG,
    });
  }
};
module.exports.listWarehousesDetails = async (req, res) => {
  try {
   
    const details = await WareProd.find().populate("productId warehouseId")
    console.log('details',details);
    return res.status(constantConfig.SUCCESS_CODE).json({
      status: constantConfig.SUCCESS,
      message:"Warehouse Details",
      data: details
    });
      
    
  } catch (err) {
    handleError("error", err, "");
    console.log(`err`, err);
    return res.status(constantConfig.INTERNAL_SERVER_ERROR).json({
      status: constantConfig.ERROR,
      message: constantConfig.SOMETHING_WENT_WRONG,
    });
  }
};
