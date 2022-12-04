const router = require('express').Router()


const Cadastro = require("../models/Cadastro");

// Rotas
router.post("/", async (req, res) => {
  // req.bory
  const {
    nome,
    sobrenome,
    datanascimento,
    logradouro,
    numero,
    cep,
    cidade,
    estado,
    complemento,
    email,
  } = req.body;

  // validação dos dados da API

  if (!nome) {
    res.status(422).json({ error: "Nome precisa ser informado!" });
    return;
  }
  if (!sobrenome) {
    res.status(422).json({ error: "Sobrenome precisa ser informado!" });
    return;
  }
  if (!logradouro) {
    res.status(422).json({ error: "Endereço precisa ser informado!" });
    return;
  }
  if (!numero) {
    res.status(422).json({ error: "Nº precisa ser informado!" });
    return;
  }
  if (!cep) {
    res.status(422).json({ error: "Endereço precisa ser informado!" });
    return;
  }
  if (!cidade) {
    res.status(422).json({ error: "Cidade precisa ser informado!" });
    return;
  }
  if (!estado) {
    res.status(422).json({ error: "Estado precisa ser informado!" });
    return;
  }
  if (!email) {
    res.status(422).json({ error: "E-mail precisa ser informado!" });
    return;
  }

  const cadastro = {
    nome,
    sobrenome,
    datanascimento,
    logradouro,
    numero,
    cep,
    cidade,
    estado,
    complemento,
    email,
  };

  try {
    //criando dados
    await Cadastro.create(cadastro);
    res.status(201).json({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Leitura de dados
router.get("/", async (req, res) => {
  try {
    const cadastro = await Cadastro.find();

    res.status(200).json(cadastro);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
//Localizando dado
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const cadastro = await Cadastro.findOne({ _id: id });
    if (!cadastro) {
      res.status(422).json({ message: "Item não encontrado!" });
      return;
    }
    res.status(200).json(cadastro);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// update de dados
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    nome,
    sobrenome,
    datanascimento,
    logradouro,
    numero,
    cep,
    cidade,
    estado,
    complemento,
    email,
  } = req.body;

  const cadastro = {
    nome,
    sobrenome,
    datanascimento,
    logradouro,
    numero,
    cep,
    cidade,
    estado,
    complemento,
    email,
  };
  try {
    const updatedCadastro = await Cadastro.updateOne({ _id: id }, cadastro);

    if (updatedCadastro.matchedCount === 0) {
      res.status(422).json({ message: "Id não encontrado!" });
      return;
    }
    res.status(200).json(cadastro);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exclusão de cadastro
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const cadastro = await Cadastro.findOne({ _id: id });

  if (!cadastro) {
    res.status(422).json({ message: "Item não encontrado!" });
    return;
  }

  try {
    await Cadastro.deleteOne({ _id: id });
    res.status(200).json({ message: "Dados removido com sucesso..." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}); 

module.exports = router