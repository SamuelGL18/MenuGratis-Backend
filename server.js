require("dotenv").config();
const cors = require("cors");
const configCors = require("./config/configCors");
const verificarJWT = require("./middleware/verificarJWT");
const credenciales = require("./middleware/credenciales");
const express = require("express");
const conectarDB = require("./config/conexionDb");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;
const path = require("path");

conectarDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(credenciales);
app.use(cors(configCors));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/registro", require("./routes/registro"));
app.use("/autorizacion", require("./routes/autorizacion"));
app.use("/cerrarSecion", require("./routes/cerrarSecion"));
app.use("/verificarNombre", require("./routes/verificarNombre"));
app.use("/tienda", require("./routes/api/tienda"));

app.use(verificarJWT);
app.use("/carrito", require("./routes/api/carrito"));
app.use("/usuario", require("./routes/api/usuario"));
app.use("/producto", require("./routes/api/producto"));

mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
