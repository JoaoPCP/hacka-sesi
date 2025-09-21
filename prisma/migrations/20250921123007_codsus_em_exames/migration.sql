/*
  Warnings:

  - The primary key for the `Exame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Exame` table. All the data in the column will be lost.
  - The primary key for the `_ConsultaExames` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_GrupoDeRiscoExames` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `CODSUS` to the `Exame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_ConsultaExames" DROP CONSTRAINT "_ConsultaExames_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_GrupoDeRiscoExames" DROP CONSTRAINT "_GrupoDeRiscoExames_A_fkey";

-- AlterTable
ALTER TABLE "public"."Exame" DROP CONSTRAINT "Exame_pkey",
DROP COLUMN "id",
ADD COLUMN     "CODSUS" TEXT NOT NULL,
ADD CONSTRAINT "Exame_pkey" PRIMARY KEY ("CODSUS");

-- AlterTable
ALTER TABLE "public"."_ConsultaExames" DROP CONSTRAINT "_ConsultaExames_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_ConsultaExames_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "public"."_GrupoDeRiscoExames" DROP CONSTRAINT "_GrupoDeRiscoExames_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_GrupoDeRiscoExames_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "public"."_GrupoDeRiscoExames" ADD CONSTRAINT "_GrupoDeRiscoExames_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Exame"("CODSUS") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ConsultaExames" ADD CONSTRAINT "_ConsultaExames_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Exame"("CODSUS") ON DELETE CASCADE ON UPDATE CASCADE;
