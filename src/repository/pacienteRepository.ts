import { Paciente } from "@/models/paciente/Paciente";
import { DbToDomainMapper } from "@/utils/dbToClassMapper";
import { PrismaClient } from "@prisma/client";

export class PacienteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getByCPF(cpf: string) {
  try {
    const pacienteDb = await this.prisma.paciente.findFirstOrThrow({
      where: {
        cpf,
      },
      include: {
        empresa: true,
        grupo_de_risco: true,
        Consulta: true,
      },
    });
    const paciente = DbToDomainMapper.mapPacienteFromDb(pacienteDb);
    return paciente;
  } catch (error) {
    throw error;
  }
}

}
