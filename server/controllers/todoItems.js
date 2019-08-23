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
    
    update(req, res) {
        return TodoItem
            .update(req.body, { fields: Object.keys(req.body) })
        // return TodoItem
        //     .find({
        //         where: {
        //             id: req.params.todoItemId,
        //             todoId: req.params.todoId,
        //         },
        //     })
        //     .then(todoItem => {
        //         if(!todoItem) {
        //             return res.status(404).send({
        //                 message: 'We cannot update what we do not have'
        //             });
        //         }

        //         return todoItem
        //             .update({
        //                 content: req.body.content || todoItem.content,
        //                 complete: req.body.complete || todoItem.complete,
        //             })
        //             .then(updatedTodoItem => res.status(200).send({
        //                 updatedTodoItem,
        //                 message: 'We have successfully updated your to do Item'
        //             }))
        //             .catch(error => res.status(400).send(error));
        //     })
    },

    destroy(req, res) {
        return TodoItem
            .find({
                where: {
                    id: req.params.todoItemsId,
                    todoId: req.params.todoId,
                },
            })
            .then(todoItem => {
                if(!todoItem) {
                    return res.status(404).send({
                        message: 'We can\'t delete what we do not own!'
                    });
                }

                return TodoItem
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Your TodoItem has been successfully deleted!'
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};