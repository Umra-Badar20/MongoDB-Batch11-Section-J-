import express from "express";
import mongoose from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs"

mongoose.connection.on("open", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", () => {
  console.log("Error in connecting MongoDB");
});
const app = express();

app.use(express.json());
const port = 3000;
app.use("/api",userRoutes)

app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
