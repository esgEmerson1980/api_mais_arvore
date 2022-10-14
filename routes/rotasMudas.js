const router = require('express').Router()

const Mudas = require('../models/Mudas')

// Criação de Dados
router.post('/', async (req, res) => {

    // req.bory
    const {usuario, subprefeitura, arvore, quantidade, data, cep} = req.body

    // validação dos dados da API
    
    if(!usuario){
        res.status(422).json({ error: 'Nome do usuário é obrigatório!'})
        return
      }
    if(!subprefeitura){
        res.status(422).json({ error: 'Subprefeitura é obrigatório!'})
        return
    }
    if(!arvore){
        res.status(422).json({ error: 'Muda é obrigatório!'})
        return
    }
    if(!quantidade){
        res.status(422).json({ error: 'Quantitativo é obrigatório!'})
        return
    }
    if(!data){
        res.status(422).json({ error: 'Data é obrigatório!'})
        return
    }
    if(!cep){
        res.status(422).json({ error: 'Cep é obrigatório!'})
        return
    }

    const mudas = {
        usuario,
        subprefeitura,
        arvore,
        quantidade,
        data,
        cep,  
    }

    try{
        //criando dados
        await Mudas.create(mudas)
        res.status(201).json({message: 'Dados de mudas inseridos com sucesso!'})

    }catch(error) {
        res.status(500).json({error: error})
    }

})

// Leitura de dados
router.get('/', async (req, res) => {
    
    try{
      const mudas = await Mudas.find()

      res.status(200).json(mudas)

    }catch(error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    try{
        const mudas = await Mudas.findOne({_id: id})
        if (!mudas) {
            res.status(422).json({message: 'Item não encontrado!'})
            return
        }
        res.status(200).json(mudas)
    }catch(error) {
        res.status(500).json({error: error})
    }
})
// update de dados
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const {usuario, subprefeitura, arvore, quantidade, data, cep} = req.body
    const mudas = {
        usuario,
        subprefeitura,
        arvore,
        quantidade,
        data,
        cep,   
    }
    try{
        const updatedMudas = await Mudas.updateOne({_id: id}, mudas)
        
        if (updatedMudas.matchedCount === 0) {
            res.status(422).json({message: 'Id não encontrado!'})
            return
        }
        res.status(200).json(mudas)
    }catch(error) {
        res.status(500).json({error: error})
    }

})

// Delete
router.delete('/:id', async (req, res) => {

    const id = req.params.id
    const mudas = await Mudas.findOne({_id: id})
    
    if (!mudas) {
        res.status(422).json({message: 'Item não encontrado!'})
        return
    }

    try{
        await Mudas.deleteOne({_id: id})
        res.status(200).json({ message: 'Dados removido com sucesso...'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router