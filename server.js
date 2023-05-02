const express = require("express");
const { accountRouter } = require("./src/routers");
const { useBodyParser, connectDb, listen } = require("./src/common");
const path = require("path");

const app = express();

// cho phép sử dụng hoặc truy xuất các file trong folder public
app.use("/public", express.static(path.join(__dirname, "/public")));

// use body-parser
useBodyParser(app);

// connect to database
connectDb();

// account router
app.use("/api/account", accountRouter);

// default router
app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "html-file/home.html");
  res.sendFile(htmlPath);
});

// listen port
listen(app);
