const express = require("express");
let cors = require("cors");
let cookieParser = require("cookie-parser");
const winston = require("winston");
const expressWinston = require("express-winston");
var cron = require("node-cron");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
const passport = require("passport");

require("dotenv").config();

const port = process.env.PORT || 3333;

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const sendUnReadEmail = require("./use-case/message/unread-mail-notification");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

require("./config/passport")(passport);
app.use(passport.initialize());

//logger
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} ", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//routes

app.use("/api", require("./route"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aspiring Ingenuity API",
      version: "1.0.0",
      description: "Dental App",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
      {
        url: "https://aspiringingenuityprojectbe-production.up.railway.app",
      },
    ],
  },
  apis: ["./route/*.js", "./route/*/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//Cron for Mail
cron.schedule('*/30 * * * *',  async () => {
  try {
    console.log("running a task every 30minutes");
    await sendUnReadEmail();
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
});
