export class JornadaDeAtendimento {
  constructor(
    public id: string,
    public pacienteId: string,
    public dataHoraInicio: Date,
    public dataHoraFim?: Date,
    public observacoes?: string
  ) {}
}