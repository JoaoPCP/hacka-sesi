// src/mappers/DbToDomainMapper.ts
import { Consulta } from "@/models/consulta/Consulta";
import { Empresa } from "@/models/empresa/Empresas";
import { Exame } from "@/models/exame/Exame";
import { GrupoDeRisco } from "@/models/GrupoDeRisco/GrupoDeRisco";
import { Paciente } from "@/models/paciente/Paciente";
import type {
  Empresa as DbEmpresa,
  Exame as DbExame,
  GrupoDeRisco as DbGrupo,
  Paciente as DbPaciente,
  Consulta as DbConsulta,
} from "@prisma/client";

type StatusConsulta =
  | "Marcada"
  | "Aguardando Atualização de Cadastro"
  | "Cancelada";

export class DbToDomainMapper {
  static mapEmpresaFromDb(e: DbEmpresa): Empresa {
    return new Empresa({
      cnpj: e.cnpj,
      razaoSocial: e.razaoSocial,
      nomeFantasia: e.nomeFantasia ?? null,
      telefone: e.telefone ?? null,
      email: e.email,
      endereco: e.endereco,
      cidade: e.cidade,
      estado: e.estado,
      cep: e.cep,
    });
  }

  static mapExameFromDb(x: DbExame): Exame {
    return new Exame({
      CODSUS: x.CODSUS,
      titulo: x.nome,
      descricao: x.descricao,
      importancia: x.importancia,
    });
  }

  static mapGrupoFromDb(g: DbGrupo & { examesDeRotina?: DbExame[] }): GrupoDeRisco {
    return new GrupoDeRisco({
      id: g.id,
      nome: g.nome,
      descricao: g.descricao,
      examesDeRotina: (g.examesDeRotina ?? []).map((e) =>
        DbToDomainMapper.mapExameFromDb(e)
      ),
    });
  }

  static mapConsultaFromDb(
    c: DbConsulta & { exames?: DbExame[] }
  ): Consulta {
    return new Consulta({
      id: c.id,
      data: new Date(c.data),
      status: c.status as StatusConsulta,
      grupoDeRisco: c.grupoDeRisco ?? null,
      empresa: c.empresa_cnpj,
      paciente: c.paciente_cpf,
      exames: (c.exames ?? []).map((e) => DbToDomainMapper.mapExameFromDb(e)),
    });
  }

  static mapPacienteFromDb(
    p: DbPaciente & {
      empresa: DbEmpresa;
      grupo_de_risco?: (DbGrupo & { examesDeRotina?: DbExame[] }) | null;
      Consulta?: (DbConsulta & { exames?: DbExame[] })[];
    }
  ): Paciente {
    return new Paciente({
      cpf: p.cpf,
      nome: p.nome,
      email: p.email,
      telefone: p.telefone,
      data_nascimento: new Date(p.data_nascimento),
      empresa: DbToDomainMapper.mapEmpresaFromDb(p.empresa),
      grupoDeRisco: p.grupo_de_risco
        ? DbToDomainMapper.mapGrupoFromDb(p.grupo_de_risco)
        : null,
    });
  }
}
