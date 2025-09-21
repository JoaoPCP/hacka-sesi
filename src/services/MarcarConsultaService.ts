import { Consulta } from "@/models/consulta/Consulta";
import { Exame } from "@/models/exame/Exame";
import { GrupoDeRisco } from "@/models/GrupoDeRisco/GrupoDeRisco";
import { ConsultaRepository } from "@/repository/consultaRepository";
import { PacienteRepository } from "@/repository/pacienteRepository";

interface requisitosMarcarConsulta {
  cpf: string;
  data: Date;
  exames: Exame[];
}
export class MarcarConsultaService {
  constructor(private readonly consultaRepository: ConsultaRepository, private readonly pacienteRepository: PacienteRepository) {}
  async execute(params: requisitosMarcarConsulta) {
    try {
      const { cpf, data, exames } = params;
      const paciente = await this.pacienteRepository.getByCPF(cpf)
      const empresa = paciente.empresa;
      const grupoDeRisco = paciente.grupoDeRisco || null;

      const examesConsulta = this.buildExamesConsulta(exames, grupoDeRisco);

      const consulta = Consulta.create({
        data,
        empresa: empresa.CNPJ,
        paciente: paciente.CPF,
        exames: examesConsulta,
        grupoDeRisco: grupoDeRisco? grupoDeRisco.nome : null,
      });
      await this.consultaRepository.save(consulta);
      this.enviarMensagem(consulta);
      return consulta;
    } catch (error) {
      throw error;
    }
  }

  private buildExamesConsulta(
    exames: Exame[],
    grupoDeRisco :GrupoDeRisco | null
  ): Exame[] {
    if (!grupoDeRisco) return [...exames];
    const set = new Set<Exame>([...exames, ...grupoDeRisco.examesDeRotina]);
    return [...set];
  }
  private enviarMensagem(consulta: Consulta) {
    console.log("Consulta Marcada \n" + consulta);
  }
}
