const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const apiRoute = require("./routes/apiRoute.js");
const htmlRoute = require("./routes/htmlRoute.js")

const PORT = process.env.PORT || 3000

const app = express();
app.use(morgan("dev"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
// app.use(require("./public/api.js"));
app.use(htmlRoute);
app.use(apiRoute);

app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});
