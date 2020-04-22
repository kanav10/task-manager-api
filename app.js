require('dotenv').config();

const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser');


//Load middleware
app.use(bodyParser.json());

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


app.listen(3001,()=>{
    console.log(`server is listining on port 3001`);
})