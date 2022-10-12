const mongoose = require('mongoose')

const Mudas = mongoose.model('Mudas', {
   regiao: String,
   subprefeitura: String,
   mes: String,
   quantidade: Number,
   ano: Number,  
})

module.exports = Mudas