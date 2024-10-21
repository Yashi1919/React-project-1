const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDo');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const todo = new ToDo({
    task: req.body.task
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update a task
router.put('/:id', async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Task not found' });
    }
    todo.completed = req.body.completed || todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await todo.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
console.log(router)

module.exports = router;
