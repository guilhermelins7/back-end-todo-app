const express = require('express');
const router = express.Router();
module.exports = router;
const modeloTarefa = require('../models/tarefa');

// Criar nova tarefa
router.post('/post', async (req, res) => {
  const objetoTarefa = new modeloTarefa({
    descricao: req.body.descricao,
    statusRealizada: req.body.statusRealizada
  });

  try {
    await objetoTarefa.save();
    const tarefasAtualizadas = await modeloTarefa.find();
    res.status(200).json(tarefasAtualizadas); // Retorna a lista atualizada
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Buscar todas as tarefas
router.get('/getAll', async (req, res) => {
  try {
    const resultados = await modeloTarefa.find();
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deletar tarefa por ID
router.delete('/delete/:id', async (req, res) => {
  try {
    await modeloTarefa.findByIdAndDelete(req.params.id);
    const tarefasAtualizadas = await modeloTarefa.find();
    res.json(tarefasAtualizadas); // Retorna a lista atualizada
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar tarefa por ID
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const novaTarefa = req.body;

    await modeloTarefa.findByIdAndUpdate(id, novaTarefa, { new: true });
    const tarefasAtualizadas = await modeloTarefa.find();
    res.json(tarefasAtualizadas); // Retorna a lista atualizada
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
