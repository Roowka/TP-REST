const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const Order = require("../models/Order");
const Plate = require("../models/Plate");
const Hash = require("../utils/hash");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/users",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      res.send(await User.find());
    }
  );

  router.get(
    "/restaurants",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      res.send(await User.find({ role: "RESTAURANT" }));
    }
  );

  router.post(
    "/restaurants",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      let data = req.body.data;
      data.password = await Hash.hash(data.password);
      const user = await User.findOne({ email: data.email });
      if(user == null) {
        res.send(await User.create({
          ...data,
           role: "RESTAURANT"
         }));
      } else {
        res.status(409).send('User already exists');
      }
    }
  );

  router.patch(
    "/restaurants/:id",
    [requireAuth, requireRoles(["RESTAURANT"])],
    async (req, res) => {
      let data = req.body.data;
      res.send(await User.findByIdAndUpdate( req.params.id, data));
    }
  );

  router.delete(
    "/restaurants/:id",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      // Suppression de tout ce qui est lié au restaurant
      await Plate.find({ restaurantId: req.params.id }).deleteMany();
      await Order.find({ restaurantId: req.params.id }).deleteMany();
      res.send(await User.deleteOne({ _id: req.params.id }));
    }
  );

  router.get("/users/@me", [requireAuth], async (req, res) => {
    res.send(req.user);
  });
};
