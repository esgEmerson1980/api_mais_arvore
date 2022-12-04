const mongoose = require('mongoose')

const Mudas = mongoose.model('Mudas', {
   id: String,
   usuario: String,
   subprefeitura: String,
   arvore: String,
   quantidade: Number,
   data: Date,
   cep: String,
});


module.exports = Mudas