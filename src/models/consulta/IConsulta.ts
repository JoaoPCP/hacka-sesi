import { Exame } from "../exame/Exame"

export interface IConsulta{
    id: number
    paciente: string
    data: Date
    empresa: string
    grupoDeRisco?: string
    exames: Exame[]
}