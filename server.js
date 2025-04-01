require("dotenv").config();
const express = require("express");
const cors = require("cors");
const wizardRoutes = require("./src/routes/wizardRoutes");
const houseRoutes = require("./src/routes/houseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/wizards", wizardRoutes);
app.use("/api/houses", houseRoutes);

// Middleware para capturar erros de parsing de JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "JSON inválido no corpo da requisição." });
    }
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
