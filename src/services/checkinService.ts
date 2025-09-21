import { ZapBot } from "@/models/chatbot/zapbot";
import { PacienteRepository } from "@/repository/pacienteRepository";

export class CheckinService {
    constructor(private readonly pacienteRepo: PacienteRepository) {}
    async execute(cpf: string) {
        try {
            const paciente = await this.pacienteRepo.getByCPF(cpf);
        if (!paciente) {
            throw new Error("Paciente não encontrado");
        }
        ZapBot.sendMensagemCheckinRealizado(paciente.telefone);
        return `Check-in realizado com sucesso para o paciente ${paciente.nome}`;
        } catch (error) {
            throw error
        }
        
    }
}