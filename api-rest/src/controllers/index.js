module.exports = function (app, router) {
  require("./UserController")(app, router);
  require("./PlateController")(app, router);
  require("./AuthenticationController")(app, router);
};
