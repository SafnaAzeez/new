const express= require('express');
const router=express.Router();
 var Controller=require("./signup");

 router.post('/',Controller.createUser)
        .get('/', (req,res) =>
        {
                res.render('signup');
        } );

module.exports = router;