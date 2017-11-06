const express= require('express');
const router=express.Router();
var passport= require('passport')


router.get('/', function(req,res){
    res.render('index');
})

 router.post('/',passport.authenticate('local'),
  function(req, res) {
     res.render('welcome',{user: req.user});
     console.log('hi'+user.username);
     }
  )

router.get('/google',passport.authenticate('google', {
    scope: ['profile'] 
}))

router.get('/google/redirect',passport.authenticate('google'),function(req,res){
    res.redirect('/task');
})

router.get('/facebook',passport.authenticate('facebook'));

router.get('/facebook/redirect',passport.authenticate('facebook'),function(req,res){
    res.redirect('/task');
})

router.get('/twitter',passport.authenticate('twitter'));

router.get('/twitter/redirect',passport.authenticate('twitter'), function(req,res){
    res.redirect('/task');
})





module.exports = router;

