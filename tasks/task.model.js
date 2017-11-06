var mongoose= require('mongoose');
var schema= mongoose.Schema;

var taskSchema= new schema({
    OAuthID:Number,
    task: String
})

var Task = mongoose.model('Task',taskSchema);

module.exports=Task;