import { PacienteRepository } from "@/repository/pacienteRepository";
import { CheckinService } from "@/services/checkinService";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const checkinController = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.body;
    if (!cpf) {
      return res.status(400).json({ message: "CPF é obrigatório" });
    }
    const checkin = await new CheckinService(
      new PacienteRepository(new PrismaClient())
    ).execute(cpf);
    res.status(200).json(checkin);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao realizar check-in",
        error: error instanceof Error ? error.message : error,
      });
  }
};

export const fluxoController = { checkinController };
