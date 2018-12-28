var express = require("express");
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

module.exports = function(db) {
  router.get("/api/users", async (req, res) => {
    // TODO add the budgetId to the users
    const users = await db
      .collection("users")
      .find({})
      .toArray();
    res.send(users);
  });

  router.post("/api/users/add", async (req, res) => {
    db.collection("users")
      .insertOne(req.body)
      .then(() => {
        res.send({ success: "hi there" });
      });
  });

  router.delete("/api/users", async (req, res) => {
    const response = await db.collection("users")
    .deleteOne({ _id: ObjectID(req.body.userId) })
    res.send(response.result);
  });

  return router;
};
