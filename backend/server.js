const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const userAddOn = require('./add-ons/user-config');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const ynabDataRoutes = require('./routes/ynab-data-routes');

const app = express();

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/ynab";
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", () => console.error("MongoDB connection error:"));

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(ynabDataRoutes(db));
app.use(userRoutes(db));
app.use(adminRoutes(db));

app.get("/api/test", async (req, res) => {
  res.send({ success: true, message: "hi there" });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
