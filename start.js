var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views/images'));

port = 80;
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', port);

app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/',function(req,res){
	res.render('home', {layout : 'main'});
});

app.get('/manga',function(req,res){
	res.render('m', {layout : 'manga'});
});

app.get('/anime',function(req,res){
	res.render('a', {layout : 'anime'});
});

app.get('/form',function(req, res){
	res.render('f', {layout : 'form'});
});

app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.render('404Error');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500Error');
});


app.listen(app.get('port'), function(){
	console.log('Express started on flip1.engr.oregonstate.edu:' + port + ', press Ctrl-C to terminate.....');
});
