const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routers/authRouters");
const messagesRouter = require("./routers/messagesRouters");
const initializePassport = require("./config/passport");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

initializePassport();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/", messagesRouter);

app.listen(3000, (error) => {
  if (error) {
    if (error) {
      throw error;
    }
  }

  console.log(`App is running`);
});
