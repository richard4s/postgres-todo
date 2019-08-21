const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
    //TODO routes
    app.get('/api', (req, res) =>  res.status(200).send({
        message: 'Welcome to the second TODOs API!'
    }));

    app.get('/api/todos', todosController.list);

    app.post('/api/todos', todosController.create);


    //TODOITEMS API routes
    app.post('/api/todos/:todoId/items', todoItemsController.create);
};