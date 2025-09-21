/*
  Warnings:

  - Added the required column `status` to the `Consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importancia` to the `Exame` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricao` on table `Exame` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Consulta" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Exame" ADD COLUMN     "importancia" TEXT NOT NULL,
ALTER COLUMN "descricao" SET NOT NULL;
