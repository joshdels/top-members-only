const express = require("express");
const path = require("node:path");
const authRouter = require("./routers/authRouters");
const messagesRouter = require("./routers/messagesRouters");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
