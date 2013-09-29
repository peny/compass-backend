require('fs');

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

  db.saveResult(data,function(err,result){
    if(!err){
      db.getResult(data,function(err,groupResults){
      	res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
        res.end(groupResults);
      });
    } else {
      res.writeHead(500,{'Content-Type': 'application/json; charset=utf8'});
      res.end({error: 'There was an error saving the results'});
    }
  });

}

function getResult(req, res){
console.log(req);
  var _this = this;

  var data = {
    name: req.body.name,
    group: req.body.group,
    x: req.body.x,
    y: req.body.y,
    z: req.body.z
  };

  db.getResult(data,function(err,groupResults){
    res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
    res.end(groupResults);
  });

}

module.exports.saveResult = saveResult;
