const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./DB/connect");
const routerItem = require("./Route/shopList.route");
const routerAuth = require("./Route/auth.routes");

const app = express();

app.use(express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(helmet());
app.use(morgan());
app.use(
  cors({
    credentials: true,
    origin: ["http://slana.net.ua"],
    optionsSuccessStatus: 200,
  })
);
app.use(function (req, res, next) {
  res.header(
    "Content-Security-Policy",
    "default-src 'self';script-src 'sha256-eE1k/Cs1U0Li9/ihPPQ7jKIGDvR8fYw65VJw+txfifw=';object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'"
  );
  next();
});
// process.env.NODE_ENV = "production";

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  console.log("Hello");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api/auth", routerAuth);
app.use("/api/", routerItem);
app.use("/item", routerItem);
app.use("/cart", routerItem);
// app.use("/api/", routerItem);
app.use("/admin", routerItem);
// app.get("/", (req, res) => {
//   res.send("Hello from Express!");
// });

console.log(process.env.INLINE_RUNTIME_CHUNK);
console.log(__dirname);
const PORT = process.env.PORT || 3011;

async function connect() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("ERROR", error);
    process.exit(1);
  }
}

connect();
