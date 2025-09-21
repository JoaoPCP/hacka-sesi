/*
  Warnings:

  - Added the required column `empresa_cnpj` to the `Consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paciente_cpf` to the `Consulta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Consulta" ADD COLUMN     "empresa_cnpj" TEXT NOT NULL,
ADD COLUMN     "grupoDeRisco" TEXT,
ADD COLUMN     "paciente_cpf" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Paciente" (
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "data_nascimento" TEXT NOT NULL,
    "empresa_cnpj" TEXT NOT NULL,
    "grupo_de_risco_id" INTEGER,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "public"."Empresa" (
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "public"."Exame" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Exame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GrupoDeRisco" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "GrupoDeRisco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_GrupoDeRiscoExames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GrupoDeRiscoExames_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ConsultaExames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ConsultaExames_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_email_key" ON "public"."Paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_razaoSocial_key" ON "public"."Empresa"("razaoSocial");

-- CreateIndex
CREATE INDEX "_GrupoDeRiscoExames_B_index" ON "public"."_GrupoDeRiscoExames"("B");

-- CreateIndex
CREATE INDEX "_ConsultaExames_B_index" ON "public"."_ConsultaExames"("B");

-- AddForeignKey
ALTER TABLE "public"."Paciente" ADD CONSTRAINT "Paciente_empresa_cnpj_fkey" FOREIGN KEY ("empresa_cnpj") REFERENCES "public"."Empresa"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Paciente" ADD CONSTRAINT "Paciente_grupo_de_risco_id_fkey" FOREIGN KEY ("grupo_de_risco_id") REFERENCES "public"."GrupoDeRisco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consulta" ADD CONSTRAINT "Consulta_empresa_cnpj_fkey" FOREIGN KEY ("empresa_cnpj") REFERENCES "public"."Empresa"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consulta" ADD CONSTRAINT "Consulta_paciente_cpf_fkey" FOREIGN KEY ("paciente_cpf") REFERENCES "public"."Paciente"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_GrupoDeRiscoExames" ADD CONSTRAINT "_GrupoDeRiscoExames_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Exame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_GrupoDeRiscoExames" ADD CONSTRAINT "_GrupoDeRiscoExames_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."GrupoDeRisco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ConsultaExames" ADD CONSTRAINT "_ConsultaExames_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Consulta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ConsultaExames" ADD CONSTRAINT "_ConsultaExames_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Exame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
