const Task =require('./task.model');

exports.getTask = (req,res) => {

  res.send('hi welcome');
  
}

exports.createTask =(req,res) =>
{
       Task.
        res.send('hi this is create task')

}
exports.updateTask =(req,res) => 
{   
//     if(!req.params.id)
//         return res.json({status:false, error:"invalid id"});
//     new Task({id:req.params.id}).save({task:req.body.task}).then(task => 
//         {   return res.json({status:true, task});
//     });

}

exports.deleteTask =(req,res) => 
{   
    // if(!req.params.id)
    //     return res.json({status:false, error:"Invalid Id"});
    // new Task({id:req.params.id}).destroy().
    // then(task => {
    //                    return  res.json({status:true, task});
    //                 });
}