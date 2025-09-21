import { Empresa } from "../empresa/Empresas";
import { GrupoDeRisco } from "../GrupoDeRisco/GrupoDeRisco";

export interface IPaciente {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: Date;
  empresa: Empresa;
  grupoDeRisco: GrupoDeRisco | null;
}
