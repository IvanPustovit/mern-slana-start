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
  cors()
  //   {
  //   credentials: true,
  //   origin: ["http://localhost:3000"],
  //   optionsSuccessStatus: 200,
  // }
);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
app.use("/auth", routerAuth);
app.use("/", routerItem);
app.use("/item", routerItem);
app.use("/cart", routerItem);
app.use("/shop", routerItem);
app.use("/admin", routerItem);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
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
