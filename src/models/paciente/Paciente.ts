import { Empresa } from "../empresa/Empresas";
import { GrupoDeRisco } from "../GrupoDeRisco/GrupoDeRisco";
import { IPaciente } from "./IPaciente";

export class Paciente{
    constructor(private dadosPaciente: IPaciente){}

    get nome(): string {
        return this.dadosPaciente.nome
    }
    get telefone(): string {
        return this.dadosPaciente.telefone
    }
    get empresa() : Empresa {
        return this.dadosPaciente.empresa
    }

    get grupoDeRisco(): GrupoDeRisco | null {
        return this.dadosPaciente.grupoDeRisco || null
    }

    get CPF(): string {
        return this.dadosPaciente.cpf
    }
}