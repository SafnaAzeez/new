var mongoose= require('mongoose');
var bcrypt= require('bcryptjs')
var schema= mongoose.Schema;

var users= 
    new schema({
        OAuthID:Number,
        username:{type:String, index: true},
        email:{type:String},
        name:{type:String},
        password:{type:String},
        role: String
    })

    var User= mongoose.model('User',users);

    module.exports= User;

    module.exports.createUser = function(newUser,callback){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password=hash;
                newUser.save(callback);
            });
        });
    }

    module.exports.getUserByUsername = function(username,callback){
        var query= {username: username};
        User.findOne(query,callback);
    }
    
    
    module.exports.getUserById = function(Id,callback){
        User.findById(Id,callback);
    }

    module.exports.comparePassword= function(candidatePassword,hash,callback){
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
        });
    }