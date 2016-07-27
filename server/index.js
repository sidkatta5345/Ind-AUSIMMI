var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

//Create an express application
var app = express();


//Add middleware for REST API which intercepts into every request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS support
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

//connect to MongoDB
mongoose.connect('mongodb:localhost//127.0.0.1/immidb');
mongoose.connection.once('open', function(){

	//Load the models
	app.models = require('./models/index');

	//Load the routes
	var routes = require('./routes');

	_.each(routes,function(controller, route){
		app.use(route, controller(app, route));
	});
	console.log('listening on port 3000..');
	app.listen(3000);
});
