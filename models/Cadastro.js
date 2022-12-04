const mongoose = require('mongoose')

const Cadastro = mongoose.model("Cadastro", {
  id: String,
  nome: String,
  sobrenome: String,
  datanascimento: Date,
  logradouro: String,
  numero: Number,
  cep: String,
  cidade: String,
  estado: String,
  complemento: String,
  email: String,
});

module.exports = Cadastro