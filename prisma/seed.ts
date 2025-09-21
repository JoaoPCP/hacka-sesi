import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function upsertEmpresas() {
  const empresas = [
    {
      cnpj: "11111111000111",
      razaoSocial: "Clínica Alpha Ltda",
      nomeFantasia: "Clínica Alpha",
      telefone: "1130001000",
      email: "contato@alpha.com.br",
      endereco: "Rua A, 123",
      cidade: "Salvador",
      estado: "BA",
      cep: "40000-000",
    },
    {
      cnpj: "22222222000122",
      razaoSocial: "Saúde Beta S/A",
      nomeFantasia: "Saúde Beta",
      telefone: "7130002000",
      email: "contato@betasaude.com.br",
      endereco: "Av. B, 456",
      cidade: "Salvador",
      estado: "BA",
      cep: "40000-001",
    },
  ];

  for (const e of empresas) {
    await prisma.empresa.upsert({
      where: { cnpj: e.cnpj },
      update: {
        razaoSocial: e.razaoSocial,
        nomeFantasia: e.nomeFantasia,
        telefone: e.telefone,
        email: e.email,
        endereco: e.endereco,
        cidade: e.cidade,
        estado: e.estado,
        cep: e.cep,
      },
      create: e,
    });
  }
}

async function upsertExames() {
  const exames = [
    { CODSUS: "0202010070", nome: "Hemograma completo", descricao: "Avaliação geral do sangue", importancia: "Alta" },
    { CODSUS: "0202020180", nome: "Glicemia em jejum",  descricao: "Nível de glicose no sangue", importancia: "Alta" },
    { CODSUS: "0202030031", nome: "Colesterol total",   descricao: "Perfil lipídico inicial",   importancia: "Média" },
    { CODSUS: "0202030040", nome: "Triglicerídeos",      descricao: "Perfil lipídico",           importancia: "Média" },
    { CODSUS: "0205010046", nome: "TGO/AST",             descricao: "Função hepática",           importancia: "Baixa" },
    { CODSUS: "0205010054", nome: "TGP/ALT",             descricao: "Função hepática",           importancia: "Baixa" },
    { CODSUS: "0204030155", nome: "Creatinina",          descricao: "Função renal",              importancia: "Média" },
    { CODSUS: "0204020133", nome: "Ácido úrico",         descricao: "Metabolismo purínico",      importancia: "Baixa" },
    { CODSUS: "0207010029", nome: "Urina tipo I",        descricao: "Exame urinário",            importancia: "Média" },
    { CODSUS: "0221010067", nome: "Eletrocardiograma",   descricao: "Avaliação cardíaca",        importancia: "Alta" },
  ];

  for (const x of exames) {
    await prisma.exame.upsert({
      where: { CODSUS: x.CODSUS },
      update: { nome: x.nome, descricao: x.descricao, importancia: x.importancia },
      create: x,
    });
  }
}

/** garante um grupo por nome e conecta os exames informados (por CODSUS) */
async function ensureGrupo(
  nome: string,
  descricao: string,
  examesCODSUS: string[]
) {
  const existing = await prisma.grupoDeRisco.findFirst({ where: { nome } });
  const idsToConnect = examesCODSUS.map((code) => ({ CODSUS: code }));

  if (existing) {
    return prisma.grupoDeRisco.update({
      where: { id: existing.id },
      data: {
        descricao,
        examesDeRotina: {
          set: [],                 // idempotente: zera e recoloca
          connect: idsToConnect,
        },
      },
    });
  } else {
    const created = await prisma.grupoDeRisco.create({
      data: { nome, descricao },
    });
    return prisma.grupoDeRisco.update({
      where: { id: created.id },
      data: {
        examesDeRotina: {
          connect: idsToConnect,
        },
      },
    });
  }
}

async function upsertGrupos() {
  await ensureGrupo("Diabetes", "Pacientes com diagnóstico de DM", [
    "0202020180", // Glicemia
    "0202010070", // Hemograma
    "0204030155", // Creatinina
    "0207010029", // Urina I
  ]);

  await ensureGrupo("Cardiovascular", "Risco cardíaco e metabólico", [
    "0221010067", // ECG
    "0202030031", // Colesterol
    "0202030040", // Triglicerídeos
    "0202010070", // Hemograma
  ]);

  await ensureGrupo("Saúde Ocupacional", "Acompanhamento periódico", [
    "0202010070", // Hemograma
    "0205010046", // TGO
    "0205010054", // TGP
  ]);
}

async function upsertPacientes() {
  // pegar ids dos grupos por nome para preencher grupo_de_risco_id
  const grupos = await prisma.grupoDeRisco.findMany({
    where: { nome: { in: ["Diabetes", "Cardiovascular", "Saúde Ocupacional"] } },
  });
  const idByNome = Object.fromEntries(grupos.map((g) => [g.nome, g.id]));

  const pacientes = [
    {
      cpf: "12345678900",
      nome: "Ana Souza",
      email: "ana.souza@example.com",
      telefone: "71999990000",
      data_nascimento: "1990-01-15",
      empresa_cnpj: "11111111000111",
      grupo_de_risco_id: idByNome["Diabetes"] ?? null,
    },
    {
      cpf: "98765432100",
      nome: "Bruno Lima",
      email: "bruno.lima@example.com",
      telefone: "71999990001",
      data_nascimento: "1985-07-22",
      empresa_cnpj: "11111111000111",
      grupo_de_risco_id: idByNome["Cardiovascular"] ?? null,
    },
    {
      cpf: "55566677788",
      nome: "Carla Nunes",
      email: "carla.nunes@example.com",
      telefone: "71999990002",
      data_nascimento: "1992-03-10",
      empresa_cnpj: "22222222000122",
      grupo_de_risco_id: idByNome["Saúde Ocupacional"] ?? null,
    },
    {
      cpf: "11122233344",
      nome: "Diego Santos",
      email: "diego.santos@example.com",
      telefone: "71999990003",
      data_nascimento: "1978-11-05",
      empresa_cnpj: "22222222000122",
      grupo_de_risco_id: null,
    },
  ];

  for (const p of pacientes) {
    await prisma.paciente.upsert({
      where: { cpf: p.cpf },
      update: {
        nome: p.nome,
        email: p.email,
        telefone: p.telefone,
        data_nascimento: p.data_nascimento,
        empresa_cnpj: p.empresa_cnpj,
        grupo_de_risco_id: p.grupo_de_risco_id ?? undefined,
      },
      create: p,
    });
  }
}

async function createConsultas() {
  const consultas = [
    {
      data: new Date("2025-09-22T09:00:00"),
      status: "Marcada",
      empresa_cnpj: "11111111000111",
      paciente_cpf: "12345678900",
      grupoDeRisco: "Diabetes",
      exames: ["0202010070", "0202020180"], // Hemograma + Glicemia
    },
    {
      data: new Date("2025-09-22T10:00:00"),
      status: "Marcada",
      empresa_cnpj: "11111111000111",
      paciente_cpf: "98765432100",
      grupoDeRisco: "Cardiovascular",
      exames: ["0221010067", "0202030031"], // ECG + Colesterol
    },
    {
      data: new Date("2025-09-23T11:00:00"),
      status: "Marcada",
      empresa_cnpj: "22222222000122",
      paciente_cpf: "55566677788",
      grupoDeRisco: "Saúde Ocupacional",
      exames: ["0205010046", "0205010054"], // TGO + TGP
    },
  ];

  for (const c of consultas) {
    const created = await prisma.consulta.create({
      data: {
        data: c.data,
        status: c.status,
        empresa_cnpj: c.empresa_cnpj,
        paciente_cpf: c.paciente_cpf,
        grupoDeRisco: c.grupoDeRisco,
      },
    });

    // conecta exames (idempotente: set -> exatamente os informados)
    await prisma.consulta.update({
      where: { id: created.id },
      data: {
        exames: {
          set: [],
          connect: c.exames.map((code) => ({ CODSUS: code })),
        },
      },
    });
  }
}

async function main() {
  await upsertEmpresas();
  await upsertExames();
  await upsertGrupos();
  await upsertPacientes();
  await createConsultas();
  console.log("✅ Seed concluído!");
}

main()
  .catch((e) => {
    console.error("❌ Seed falhou:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
