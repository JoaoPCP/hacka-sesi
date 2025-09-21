import { Consulta } from "@/models/consulta/Consulta";
import {PrismaClient } from "@prisma/client";

export class ConsultaRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async save(consulta: Consulta) {
    try {
      const response = this.prisma.consulta.create({
        data: {
          ...consulta.toDb(),
        },
      });
      return
    } catch (error) {
        throw(error)
    }
  }
}
