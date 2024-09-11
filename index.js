require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./Routes/user");
// require krna laazmi hai
const authRouter = require("./Routes/auth");
const coursesRouter = require("./Routes/courses");
const teacherRouter = require("./Routes/teachers");
const adminRouter = require("./Routes/admin");
const serverRouter = require("./Routes/Server");
const translateAPI = require("./Routes/translateAPI");
const courses2Router = require("./Routes/courses2");
const app = express();

app.use(express.json()); //MIDDLE WARE
//KOI BHI RQEUEST BEFORE ROUTER HANDLER CHECK KR SAKTE HAIN
//BEHAVES AS A BODYGUARD
// app.use((req, res, next) => {
//   console.log("hello from middleware");
//   if (req.body.name) {
//     // if name not given in body then it will not run
//     next();
//   } else {
//     return res.send("no body found");
//   }
//   //next will determine the route like on which route its going
// });

// console.log(process.env.MONGO_DB_URL);
const connect = process.env.MONGO_DB_URL;

mongoose
  .connect(connect)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("not connected to db", err);
  });

app.use("/user", usersRouter);
// important
app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/teachers", teacherRouter);
app.use("/admin", adminRouter);
app.use("/server", serverRouter);
app.use("/translate", translateAPI);
app.use("/courses2", courses2Router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("Listening on port".toUpperCase());
});
