const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const eventRoutes = require('./routes/event')
const userRoutes = require('./routes/user')

const app = express();
app.use(cors())
const port = 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/user", userRoutes)

mongoose
  .connect(process.env.DATABASE)
  .then(console.log("Database connected! ⚡"));

app.listen(port, () => {
  console.log("App started on Port: " + port + " 🎉");
});

app.get("/", (req, res) => {
  res.send("Hello Node");
});

app.get("/images/:id", (req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname+'/images/'+ id)
})