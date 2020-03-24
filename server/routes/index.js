const express = require("express");
const axios = require("axios");
const router = express.Router();

function routes(app) {
  router.get("/data", async (req, res) => {
    res.send([{ id: 1 }, { id: 2 }]);
  });

  return router;
}

module.exports = routes;
