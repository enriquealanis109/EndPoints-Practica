import express from "express";
import estudiantesRouter from "./routes/estudiante";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(express.json());
app.use("/api/estudiantes", estudiantesRouter);
app.use("/api/students", estudiantesRouter);
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.get("/api/status", (req, res) => {
  res.status(200).json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
