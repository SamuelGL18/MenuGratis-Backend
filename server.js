require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const express = require("express");
const connectDB = require("./config/dbConn");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;
const path = require("path");

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));
app.use("/verifyDuplication", require("./routes/verifyDuplication"));
app.use("/pagina", require("./routes/api/pagina"));

app.use(verifyJWT);
app.use("/carrito", require("./routes/api/carrito"));
app.use("/usuario", require("./routes/api/usuario"));
app.use("/producto", require("./routes/api/producto"));

mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
