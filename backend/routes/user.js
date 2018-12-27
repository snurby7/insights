var express = require('express');
var router = express.Router();

module.exports=function(db) {

  router.get('/api/users', async(req, res) => {
    // TODO add the budgetId to the users
    const users = await db.collection('users').find({}).toArray();
    res.send(users);
  })

  router.post("/api/users/add", async (req, res) => {
    db.collection('users').insertOne(req.body).then(() => {
      res.send({ success: "hi there" });
    });
  });

  return router;
}