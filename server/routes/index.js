const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
    //TODO routes
    app.get('/api', (req, res) =>  res.status(200).send({
        message: 'Welcome to the second TODOs API!'
    }));

    app.get('/api/todos', todosController.list);

    app.post('/api/todos', todosController.create);

    app.get('/api/todos/:todoId', todosController.retrieve);

    app.put('/api/todos/:todoId', todosController.update);

    app.delete('/api/todos/:todoId', todosController.destroy);

    //TODOITEMS API routes
    app.post('/api/todos/:todoId/items', todoItemsController.create);
    app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
    app.delete('api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);

    //For an other requests to item
    app.all('/api/todos/:todoId/items', (req, res) => 
        res.status(405).send({
            message: 'Method Not Allowed!'
        })
    )
};