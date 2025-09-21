import { Exame } from "../exame/Exame"

export interface IConsulta{
    id: number
    paciente: string
    data: Date
    status: "Marcada" | "Aguardando Atualização de Cadastro" | "Cancelada" 
    empresa: string
    grupoDeRisco: string | null
    exames: Exame[]
}