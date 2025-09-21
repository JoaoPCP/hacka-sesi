import { Exame } from "../exame/Exame";

export interface IGrupoDeRisco{
    id: number,
    nome: string,
    descricao: string,
    examesDeRotina: Exame[]
}