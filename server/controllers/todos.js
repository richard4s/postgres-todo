const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send({
        todo,
        message: 'Successfully created a new todo!'
      }))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => res.status(200).send(todo))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Todo
      .findByPk(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if(!todo) {
          return res.status(404).send({
            message: 'No Todo found with that ID'
          });
        }
        return res.status(200).send(todo);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Todo
      .findByPk(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if(!todo) {
          return res.status(400).send({
            message: 'We can\'t seem to find that Todo'
          });
        }

        return todo
          .update({
            title: req.body.title || todo.title,
          })
          .then(() => res.status(200).send(todo))
          .catch((error) => res.status(200).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Todo
      .findByPk(req.params.todoId)
      .then(todo => {
        if(!todo) {
          return res.status(200).send({
            message: 'We can\'t delete a Todo we don\'t have!'
          });
        }

        return todo
          .destroy()
          .then(() => res.status(200).send({
            message: 'Todo Deleted!'
          }))
          .catch((error) => res.status(400).send(error));
      })
  }
};