var fs = require('fs');

var request = require('request');

var db = require('../lib/db.js');


function saveResult(req, res){
  var _this = this;

  var data = {
    name: req.body.name,
    group: req.body.group,
    x: req.body.x,
    y: req.body.y,
    z: req.body.z
  };

  console.log(data);
  db.saveResponse(data,function(err,result){
    if(!err){
      db.getResponses(data,function(err,groupResults){
      	res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
        res.end(JSON.stringify(groupResults));
      });
    } else {
      res.writeHead(500,{'Content-Type': 'application/json; charset=utf8'});
      res.end({error: err, message: 'There was an error saving the results'});
    }
  });

}

function saveGroupImage(req, res){
  var _this = this;

  var filetype = req.files.images.name.match(/\..{2,5}$/);

  var imagePath = "media/"+((new Date()).getTime())+filetype;
  
  fs.readFile(req.files.images.path, function (err, data) {
    fs.writeFile(imagePath, data, function (err) {
    });
  });

  var data = {
    group: req.body.group,
    imageurl: imagePath,
  };

  console.log(data);
  db.setGroupImage(data,function(err,result){
    if(!err){
      db.getResponses(data,function(err,groupResults){
      	res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
        res.end(JSON.stringify({status: 'OK!'}));
      });
    } else {
      res.writeHead(500,{'Content-Type': 'application/json; charset=utf8'});
      res.end({error: err, message: 'There was an error saving the image'});
    }
  });

}

function getResult(req, res){
  var _this = this;

  var data = {
    group: req.query.group,
  };

  if(data.group.indexOf(',') === -1){

    db.getResponses(data,function(err,groupResults){
      if(!err){
        res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
        res.end(JSON.stringify(groupResults));
      } else {
        res.writeHead(500,{'Content-Type': 'application/json; charset=utf8'});
        res.end({error: err, message: 'There was an error retrieving the results'});
      }
    });

  } else {

    db.getGroupResponses(data,function(err,groupResults){
      if(!err){
        res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
        res.end(JSON.stringify(groupResults));
      } else {
        res.writeHead(500,{'Content-Type': 'application/json; charset=utf8'});
        res.end({error: err, message: 'There was an error retrieving the results'});
      }
    });

  }

}

function getQuestions(req,res){
    fs.readFile(__dirname+'/../questions/questions.json', {encoding: "utf-8"}, function (err, data) {
      res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
      res.end(JSON.stringify(JSON.parse(data)));
    });
}

module.exports.saveResult = saveResult;
module.exports.saveGroupImage = saveGroupImage;
module.exports.getResult = getResult;
module.exports.getQuestions= getQuestions;
