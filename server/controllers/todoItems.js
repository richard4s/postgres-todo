// Do not do this in the future
//const TodoItem = require('../models/todoitem').TodoItem;
const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        return TodoItem
            .create({
                content: req.body.content,
                todoId:  req.params.todoId
            })
            .then(todoItem => res.status(201).send({
                todoItem,
                message: 'Successfully created a todo item!'
            }))
            .catch(error => res.status(400).send(error));
    },
};