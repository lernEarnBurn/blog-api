const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const httpProxy = require("http-proxy-middleware");

const createRouter = require("./routers/create");
const readRouter = require("./routers/read");
const updateRouter = require("./routers/update");
const deleteRouter = require("./routers/delete");
const authRouter = require("./routers/auth");

require("dotenv").config();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(logger("dev"));

const apiProxy = httpProxy.createProxyMiddleware({
  target: "http://13.58.53.141:3000", 
  changeOrigin: true,
});

app.use('/api', apiProxy)

app.use("/", authRouter);
app.use("/", createRouter);
app.use("/", readRouter);
app.use("/", updateRouter);
app.use("/", deleteRouter);

app.listen(3000, () => {
  "app listening on port 3000";
});
