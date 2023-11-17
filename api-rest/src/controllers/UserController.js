const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");

class UserNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.code = "USER_NOT_FOUND";
    this.message = "This user does not exists"
    this.status = 404
  }
}

class UserBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.code = "USER_NOT_FOUND";
    this.message = "This user does not exists"
    this.status = 400
  }
}

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
    "/users/:id",
    async (req, res) => {
      try {
        const user = await User.findOne({_id : req.params.id})
        if(!user) {
          throw new UserNotFoundException()
        }
      }
      catch(e) {
        throw new UserBadRequestException()
      }
    }
  );
};
