
const User= require('/Users/bititudetechnologies/Documents/employee/login/login.model.js'); 
exports.createUser = (req,res) => {

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var role = req.body.role;
    var password = req.body.password;
    var password2 = req.body.password2;
 
    
    //Validation errors
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
     req.checkBody('role', 'Choose a role to register').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors= req.validationErrors();
    if(errors){
        res.render('signup',{errors:errors});
    }
    else{
        var newUser= new User({
            name:name,
            username:username,
            email:email,
            role:role,
            password:password
        
        })

        User.createUser(newUser,function(err,user){
            if (err) throw err;
            console.log(user);
        })

        req.flash('success_msg','Successfully Registered. Please Login to continue');
        
        res.redirect('/');
        

    }
}


