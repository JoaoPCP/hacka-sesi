import { Exame } from "@/models/exame/Exame";
import { ConsultaRepository } from "@/repository/consultaRepository";
import { PacienteRepository } from "@/repository/pacienteRepository";
import { MarcarConsultaService } from "@/services/MarcarConsultaService";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const MarcarConsultaController = async (req: Request, res: Response) => {
  try {
    // melhorar esse fluxo se der tempo: o input do usuario é só o cnpj, de resto pegamos do banco
    const prisma = new PrismaClient();
    const inputUsuario: { cpf: string; data: Date; exames: Exame[] } =
      req.body;
    const marcarConsulta = new MarcarConsultaService(
      new ConsultaRepository(prisma),
      new PacienteRepository(prisma)
    );
    const consulta = await marcarConsulta.execute(inputUsuario);
    
    return res.status(201).json({message: "Consulta marcada com sucesso", consulta});
  } catch (error) {
    return res.status(500)
  }
}
