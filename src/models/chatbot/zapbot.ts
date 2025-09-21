export class ZapBot {
    constructor(){}
    static sendTeste(telefone: string,message: string) {
        console.log(`Enviando mensagem para ${telefone}: ${message}`);
    }

    static sendMensagemConsultaMarcada(telefone: string, data: Date) {
        const message = `Sua consulta foi marcada para o dia ${data.toLocaleDateString()} às ${data.toLocaleTimeString()}.`;
        this.sendTeste(telefone, message);
    }
    static sendMensagemCheckinRealizado(telefone: string) {
        const message = `Seu check-in foi realizado com sucesso!`;
        this.sendTeste(telefone, message);
    }
}