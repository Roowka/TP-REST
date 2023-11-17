const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
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
      res.send(await User.create({
         ...data,
          role: "RESTAURANT"
        }));
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
