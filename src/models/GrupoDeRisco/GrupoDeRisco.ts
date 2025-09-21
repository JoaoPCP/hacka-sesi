import { Exame } from "../exame/Exame";
import { IGrupoDeRisco } from "./IGrupoDeRisco";

export class GrupoDeRisco{
    constructor(private dadosGrupoDeRisco: IGrupoDeRisco){}
    get examesDeRotina() : Exame[] {
        return this.dadosGrupoDeRisco.examesDeRotina
    }
    get nome() : string {
        return this.dadosGrupoDeRisco.nome
    }
}