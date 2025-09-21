import { randomInt } from "crypto";
import { IConsulta } from "./IConsulta";
import { Consulta as consultaPrisma } from "@prisma/client";

export class Consulta {
  constructor(private dadosConsulta: IConsulta) {}

  static create(data: Omit<IConsulta, "id" | "status">) {
    return new Consulta({
      id: randomInt(1000),
      status: "Aguardando Atualização de Cadastro",
      ...data,
    });
  }

  toDb(): consultaPrisma {
    const consulta = this.dadosConsulta
    return {
      id: consulta.id,
      data: consulta.data,
      status: consulta.status, 
      grupoDeRisco: consulta.grupoDeRisco ?? null,
      empresa_cnpj: consulta.empresa,
      paciente_cpf: consulta.paciente,
    };
  }
}
