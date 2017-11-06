var express=require('express');
var app=express();
var path=require('path');
var cookieParser= require('cookie-parser');
var bodyParser =require('body-parser');
var expressValidator=require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var passport= require('passport');
var passportSetup= require('./config/passport-setup');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/empdetails',{useMongoClient: true});

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());
app.use(express.static(path.join(__dirname,'public')));

 // Express Session
 app.use(session({
    secret: 'hfhfghfhdhdbcvcvdddddd',
    saveUninitialized: true,
    resave: true
}));

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//connecting flash
app.use(flash());

//global vars
 app.use(function(req,res,next){
	res.locals.success_msg=req.flash('success_msg');
	res.locals.error_msg= req.flash('error_msg');
	res.locals.error= req.flash('error');
	res.locals.user= req.user ||null,
 	res.locals.errors=null;
 	next();
 });

 
const login=require('./login');
const signup=require('./signup');
const task=require('./tasks');
const auth= require('./login')

app.use('/',login);
app.use('/signup',signup);
app.use('/task',task);
app.use('/auth',auth);

app.listen(3000, function(req,res, error)
{
	console.log('server started...');
})





































// //creating tables
// knex.schema.hasTable('customers').then(function(exists){
// 	if(!exists)
// {
// 	return knex.schema.createTable('customers',function(table){
// 	table.increments('id');
// 	table.string('name');
// 	table.string('email',128);
// 	table.string('role').defaultTo('admin');
// 	table.string('password');
// 	table.timestamps();
// });
// }});       

// knex.schema.hasTable('tasks').then(function(exists){
// 	if(!exists)
// {
// 	return knex.schema.createTable('tasks',function(table){
// 	table.increments('id');
// 	table.string('name');
// 	table.string('task');
// 	table.timestamps();
// });
// }});      
