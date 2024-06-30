const mongoose = require("mongoose");
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL;
const axios = require("axios");
const PingLog = require("./logSchema");

// Function to ping the main server

const pingMainServer = async () => {
  try {
    const response = await axios.get(MAIN_SERVER_URL);
    const log = new PingLog({
      status: response.status,
      message: "Ping successful",
    });
    await log.save();
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

// Ping the main server every 5 minutes
module.exports = pingMainServer;
