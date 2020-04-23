require('dotenv').config();

const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser');


//Load middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

//Mongoose models
const {List, Task} = require('./db/models');

/**List Routes */

/**GET /lists */
app.get('/lists', (req,res)=>{
    
    List.find().then((lists)=>{
        res.send(lists);
    });
});

/**Post lists */
app.post('/lists',(req,res)=>{
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    })

});
/**PATH /lists/:id 
 * Update a specified list
*/
app.patch('/lists/:id',(req,res)=>{

    List.findOneAndUpdate({_id:req.params.id},{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });

});

app.delete('/lists/:id',(req,res)=>{
    List.findOneAndRemove({
        _id:req.params.id
    }).then((removedListDoc)=>{
        res.send(removedListDoc);
    })
})

/**
 * GET /lists/:listid/tasks
 */
app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=>{
        res.send(tasks);

    })
});
/**
 * POST /list/:listId/tasks
 */

app.post('/lists/:listId/tasks',(req,res)=>{

    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });

    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc)
    })

})

/**
 * PATCH /lists/:listId/tasks/:taskId
 */
app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }
    ).then(()=>{
        res.sendStatus(200);
    });
})

/**
 * DELETE /lists/:listId/tasks/:taskId
 */
app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId 
    }).then((taskDoc)=>{
        res.send(taskDoc);
    })
})

app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((taskData)=>{
        res.send(taskData)
    })
})

app.listen(3001,()=>{
    console.log(`server is listining on port 3001`);
})