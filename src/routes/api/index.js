const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const docsRoute = require("./docs.route");
const videoRoute = require("./video.route");
const config = require("../../config/config");
const categoryRoute = require("./categories.route");
const displayRoute = require('./display.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/video",
    route: videoRoute,
  },
  {
    path: "/categories",
    route:categoryRoute
  },
  {
    path: '/displays',
    route:displayRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
