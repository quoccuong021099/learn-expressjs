const express = require("express");
const { accountRouter } = require("./src/routers");
const {
  useBodyParser,
  connectDb,
  listen,
  useCookieParser,
  useDotenv,
} = require("./src/common");
const path = require("path");
const cors = require("cors");

const app = express();

// use cors (cho phép các domain khác sử dụng server này) xem thêm tại: https://www.youtube.com/watch?v=zW9jp0I6NIA&list=PLodO7Gi1F7R1GMefX_44suLAaXnaNYMyC&index=13&ab_channel=Nodemy
app.use(cors());

// use dotenv
useDotenv();
// cho phép sử dụng hoặc truy xuất các file trong folder public
app.use("/public", express.static(path.join(__dirname, "/public")));

// use body-parser
useBodyParser(app);

// use cookie-parser
useCookieParser(app);

// connect to database
connectDb();

// account router
app.use("/api/account", accountRouter);

// default router
app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "src/html-file/home.html");
  res.sendFile(htmlPath);
});

// listen port
listen(app);
