// i have hosted a job management nodejs and express-js application on "on-render" free-tier and it switches the server off after inactivity and it causes high load times i want to create another server that pings the mai sever every 5 minutes to keep it active  //

const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const connectDB = require("./connectdb");
const pingMainServer = require("./pingServer");

const cors = require("cors");
app.use(cors());

const PingLog = require("./logSchema");
const port = process.env.PORT || 3000;
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL;
const MONGODB_URI = process.env.MONGODB_URI;

//
app.use(helmet());
app.use(express.json());

const start = async (ur) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    const log = new PingLog({
      status: error.response ? error.response.status : 500,
      message: error.message,
    });
    await log.save();
    console.error(
      `${new Date().toISOString()} - Failed to ping ${MAIN_SERVER_URL} - Error: ${
        error.message
      }`
    );
  }
};
start(MONGODB_URI);
setInterval(pingMainServer, 300000 * 2); // 10 minutes
