const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Order = require("../models/Order");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/restaurants/:id/orders",
    async (req, res) => {
      res.send(await Order.find({ restaurantId: req.params.id, status: "PROCESSED"}));
    }
  );

  router.get(
    "/orders/:id",
    async (req, res) => {
      res.send(await Orders.findById(req.params.id));
    }
  );

  router.patch(
    "/orders/:id",
    [requireAuth, requireRoles(["RESTAURANT"])],
    async (req, res) => {
      let data = req.body.data;
      res.send(await Order.findByIdAndUpdate( req.params.id, data));
    }
  );

  router.get("/users/@me", [requireAuth], async (req, res) => {
    res.send(req.user);
  });
};
