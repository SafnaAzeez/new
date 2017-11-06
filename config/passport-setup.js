
const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const twitterStrategy= require('passport-twitter').Strategy;
const keys = require('./keys');
const User= require('../login/login.model');

passport.serializeUser(function(user, done) {
    done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
    done(err, user);
    });
    });      


passport.use(new LocalStrategy(
    function(username, password, done) {
    User.getUserByUsername(username, function(err,user){
        if(err) throw err;
        
        if(!user)
        return done(null,false,{message:"invalid username"});
        else
        {
        User.comparePassword(password,user.password,function(err,isMatch){
            if (err) throw err;

            if(isMatch)
            {
                return done(null,user);
            }
            else
            {
                return done(null,false,{message:"invalid password"});
            }
        })
    }

    })
    }
    ));


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken,profile,done) => {

        User.findOne({OAuthID:profile.id}).then(function(currentUser){
            if(currentUser){
                    console.log('the user is:'+ currentUser);
                    done(null,currentUser);
            }
            else{
                var newUser= new User({
                    username: profile.displayName,
                    OAuthID:profile.id
                }).save().then(function(newUser){
                    console.log('New User Created'+newUser);
                    done(null,newUser);
                })
            }
        })
    })
);

passport.use(
    new facebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect'
    }, (accessToken, refreshToken,profile,done) => {
        
                User.findOne({OAuthID:profile.id}).then(function(currentUser){
                    if(currentUser){
                            console.log('the user is:'+ currentUser);
                            done(null,currentUser);
                    }
                    else{
                        var newUser= new User({
                            username: profile.displayName,
                            OAuthID:profile.id
                        }).save().then(function(newUser){
                            console.log('New User Created'+newUser);
                            done(null,newUser);
                        })
                    }
                })
            })
        );

        passport.use(
            new twitterStrategy({
                consumerKey:keys.twitter.clientID,
                consumerSecret:keys.twitter.clientSecret,
                callbackURL:"/auth/twitter/redirect"
            },(accessToken,refreshToken,profile,done)=>{
                User.findOne({OAuthID:profile.id}).then(function(currentUser){
                    if(currentUser){
                        console.log('current user is:'+ currentUser);
                        done(null,currentUser);
                    }
                    else{
                        new User({
                            OAuthID:profile.id,
                            username:profile.displayName
                        }).save().then(function(newUser){
                            console.log('new user created'+ newUser);
                            done(null,newUser);
                        })
                    }
                })
            }
        ))
    