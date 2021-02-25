const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./router");
const { api, environment } = require("../config");
const {
  notFound,
  developmentErrors,
  productionErrors
} = require("../errorHandlers");
const i18n = require("./i18n");

/* Initialize mongodb database and models */
require("../dataSource/mongodb/model");

module.exports = async app => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Init i18n
  i18n(app);

  // Load API routes
  app.use(api.prefix, routes);

  // Handle all other routes
  app.use(notFound);
  app.use(developmentErrors);

  // // catch and send errors
  // if (environment === "development") {
  //   /* Development Error Handler - Prints stack trace */
  //   app.use(developmentErrors);
  // }

  // // production error handler
  // app.use(productionErrors);
};
