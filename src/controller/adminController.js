const { adminService } = require("../service");
const utils = require("../misc/utils");

const adminController = {
  async getUsers(req, res, next) {
    try {
      const users = await adminService.getUsers();
      res.json(utils.buildResponse(users));
    } catch (e) {
      console.log("회원목록을 불러오지 못했습니다.");
      next(e);
    }
  },

  async getOrders(req, res, next) {
    try {
      const orders = await adminService.getOrders();
      res.json(utils.buildResponse(orders));
    } catch (e) {
      console.log("주문들을 불러오지 못했습니다.");
      next(e);
    }
  },

  async patchOrder(req, res, next) {
    try {
      const { id } = req.params;
      const { order_status } = req.body;
      const updated_order = await adminService.updateOrder(id, order_status);
      res.status(200).json(utils.buildResponse(updated_order));
    } catch (e) {
      console.log("주문을 수정하지 못했습니다.");
      next(e);
    }
  },

  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const deleted_order = await adminService.deleteOrder(id);
      res.status(200).json(utils.buildResponse(deleted_order));
    } catch (e) {
      console.log("주문을 삭제하지 못했습니다.");
      next(e);
    }
  },
};

module.exports = adminController;
