import { IEmpresa } from "./IEmpresa";

export class Empresa {
    constructor(private empresaData: IEmpresa){}
    get CNPJ(): string {
        return this.empresaData.cnpj
    }
}