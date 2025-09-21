import express, { Request, Response } from "express";
import { MarcarConsultaController } from "./controller/ConsultaController";
import { fluxoController } from "./controller/FluxoController";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TS + Express 🚀");
});

dotenv.config()

app.post("/marcarConsulta", MarcarConsultaController)
app.post("/checkin", fluxoController.checkinController)

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
