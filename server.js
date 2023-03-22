const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("./utils/cloudinary");
const connectDB = require("./config/mongoose");
const logger = require("./middlewares/logger");
const userRoutes = require("./Routes/userRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const travelRoutes = require("./Routes/travelRoutes");
const upload = require("./middlewares/upload");

dotenv.config();

// const upload = multer({ dest: "uploads/" });

const PORT = process.env.PORT;
const dburl = process.env.DATABASE_URI;

//instance of express
const app = express();
//Middleware
app.use(express.json());
app.use(logger);
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/category", categoryRoutes);
app.use("/travel", travelRoutes);

app.get("/", async (req, res) => {
  res.json({ message: "Сайн уу" });
});

app.post("/uploads", upload.single("image"), async (req, res) => {
  console.log("REQ====>", req.file);
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
  } catch (error) {
    console.error(error);
  }
});

connectDB(dburl);
app.listen(PORT, () => {
  console.log(`Сервер ${PORT} дээр аслаа.`);
});
