var express = require("express");
var router = express.Router();

module.exports = function(db) {
  router.post("/api/reports/monthly", async (req, res) => {
    throw Error('Not Implemented Yet');
  });

  return router;
};
