var express = require("express");
var ObjectID = require("mongodb").ObjectID;
var router = express.Router();

module.exports = function(db) {
  router.get("/api/users", async (req, res) => {
    // TODO add the budgetId to the users
    const users = await db
      .collection("users")
      .find({budgetId: req.query.budgetId})
      .toArray();
    res.send(users);
  });

  router.delete("/api/users", async (req, res) => {
    const response = await db
      .collection("users")
      .deleteOne({ _id: ObjectID(req.body.userId) });
    res.send(response.result);
  });

  router.post("/api/users", async (req, res) => {
    const updateRequest = req.body;
    const _id = updateRequest._id;
    delete updateRequest._id;
    const response = await db.collection("users").updateOne(
      {
        _id: ObjectID(`${_id}`)
      },
      { $set: updateRequest },
      { upsert: false }
    );
    res.send(response.result);
  });

  router.post("/api/users/add", async (req, res) => {
    db.collection("users")
      .insertOne(req.body)
      .then(() => {
        res.send({ success: "hi there" });
      });
  });

  return router;
};
