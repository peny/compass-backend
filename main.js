var express = require('express');
var router = require('./routes/main.js');
var app = express();

var PORT = 80;

app.configure(function(){
    app.use(express.bodyParser());
    app.use('/media', express.static(__dirname + '/media'));
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/', express.static(__dirname + '/public'));
});

app.post('/result', function(req, res){
    router.saveResult(req,res);
});

app.post('/upload',function(req,res){
  router.saveGroupImage(req,res);
});

app.get('/result', function(req, res){
    router.getResult(req,res);
});

app.get('/questions.json', function(req, res){
    router.getQuestions(req,res);
});

app.listen(PORT);
console.log('server running at port '+PORT);
