export class ZapBot {
  constructor() {}
  static sendTeste(telefone: string, message: string) {
    console.log(`Enviando mensagem para ${telefone}: ${message}`);
  }

  static async sendMensagemConsultaMarcada(telefone: string, data: Date, nome: string) {
    console.log(`Enviando mensagem para ${telefone} sobre consulta em ${data}`);
    const url = `http://${process.env.EVOLUTION_API_HOST}:${process.env.EVOLUTION_API_PORT}/message/sendText/${process.env.EVOLUTION_INSTANCE}`;
    const texto = `👋 Olá, ${nome} eu sou a Sesinha, sua assistente digital do SESI Saúde.

Estou passando para te avisar que sua empresa marcou uma consulta ocupacional para você no dia 30/09/2025 na unidade SESI da Av. Orlando Gomes, 1737 - Piatã, Salvador - BA, 41650-010

O atendimento é por ordem de chegada, e deve ser realizado no seu horário de trabalho.

Você vai passar pelas seguintes etapas:
Check-in: Pegue sua senha no totem, ela será utilizada durante toda sua jornada conosco.
Atendimento na Recepção: Vamos validar seu cadastro e pedir que você assine suas guias de exame
Exame de Laboratório: Nosso time vai realizar a coleta de sangue para exames de laboratório
Consulta Ocupacional: Nosso profissional vai realizar a sua avaliação para emissão do atestado

Não se preocupe, vamos te explicar melhor  quando chegar mais perto. Você também vai poder acompanhar o tempo que vai levar para realizar todas as etapas. 

Chequei sua marcação e o tempo mínimo para realização de todas elas é 40 minutos, podendo variar com base na lotação da unidade no dia.

Você vai poder comparecer?
👉 Se não vai poder, digite: 1
👉 Se pode comparecer, digite: 2
`;

    const body = {
      number: String(telefone),
      text: texto, 
    };
    const bodyJson = JSON.stringify(body); // ✅ escapa \n, aspas, etc.
    console.log(bodyJson)

    const options = {
      method: "POST",
      headers: {
        apikey: process.env.AUTHENTICATION_API_KEY!,
        "Content-Type": "application/json",
      },
      body: bodyJson,
    };
    console.log("Enviando requisição para Evolution API...");

    try {
      const response = await fetch(url, options);
      console.log("Requisição enviada. Aguardando resposta...");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static sendMensagemCheckinRealizado(telefone: string) {
    const message = `Seu check-in foi realizado com sucesso!`;
    this.sendTeste(telefone, message);
  }
}
