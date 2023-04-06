import express from "express";
import { create } from "express-handlebars"
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 41799;
const handlebars = create({defaultLayout:'main'});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.set('port', port);
app.use(express.static('views/images'));




//Routing
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
	res.render('505Error');
});
//Start Message
app.listen(app.get('port'), function(){
	console.log('Express started on flip1.engr.oregonstate.edu:' + port + ', press Ctrl-C to terminate.....');
});
