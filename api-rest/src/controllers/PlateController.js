const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Plate = require("../models/Plate");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/restaurants/:id/plates",
    async (req, res) => {
      res.send(await Plate.find({ restaurantId: req.params.id }));
    }
  );

  router.get(
    "/plates/:id",
    async (req, res) => {
      res.send(await Plate.findById(req.params.id));
    }
  );

  router.post(
    "/restaurants/:id/plates",
    [requireAuth, requireRoles(["RESTAURANT"])],
    async (req, res) => {
      let data = req.body.data;
      res.send(await Plate.create({
         ...data,
          restaurantId: req.params.id
        }));
    }
  );

  router.patch(
    "/plates/:id",
    [requireAuth, requireRoles(["RESTAURANT"])],
    async (req, res) => {
      let data = req.body.data;
      res.send(await Plate.findByIdAndUpdate( req.params.id, data));
    }
  );

  router.delete(
    "/restaurants/:id",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      res.send(await User.deleteOne({ _id: req.params.id }));
    }
  );

  router.get("/users/@me", [requireAuth], async (req, res) => {
    res.send(req.user);
  });
};
