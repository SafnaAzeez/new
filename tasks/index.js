const express= require('express');
const router=express.Router();
 var Controller=require("./tasks");

 router.get('/',Controller.getTask)
        .post('/',Controller.createTask)
        .put('/:id',Controller.updateTask)
        .delete('/:id',Controller.deleteTask);

module.exports = router;