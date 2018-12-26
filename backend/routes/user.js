var express = require('express');
var router = express.Router();

module.exports=function(db) {

  router.post("/api/users/add", async (req, res) => {
    db.collection('users').insertOne(req.body).then(() => {
      res.send({ success: "hi there" });
    });
  });

  return router;
}