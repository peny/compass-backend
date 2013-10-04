var mongoose = require('mongoose');
var _ = require('underscore');
mongoose.connect('mongodb://localhost/compass_test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log('db open!');
});

var responseSchema = mongoose.Schema({
  group: String,
  name: String,
  x: String,
  y: String,
  z: String,
  imageurl: String,
});

var groupSchema = mongoose.Schema({
  group: String,
  imageurl: String,
});

var Response = mongoose.model('Response', responseSchema);
var Group = mongoose.model('Group', groupSchema);

var saveResponse = function(data,callback){
  var response = new Response(data);
  response.save(function(err){
    if(typeof callback === 'function'){
      callback(err);
    }
  });
};

var setGroupImage = function(data,callback){
  var group = new Group(data);
  console.log('saving group image');
  group.save(function(err){
    if(err){
      console.log(err);
    }
    if(typeof callback === 'function'){
      callback(err);
    }
  });
};

var getGroupImage = function(data,callback){
  Group.find({group: data.group},function(err, response){
    if(typeof callback === 'function'){
      callback(err, response);
    }
  });
};

var getResponses = function(data, callback){
  Response.find({group: data.group},function(err, responses){
    callback(err, responses);
  });
};

var getGroupResponses = function(data, callback){
  var groups = data.group.split(',');
  Response.find({
    group: { $in: groups} 
  },function(err, responses){
    var grouped = _.groupBy(responses,function(response){ return response.group; });
    var reducedGroups = [];

    var sendResponse = _.after(Object.keys(grouped).length, function(){callback(err, reducedGroups)});


    _.each(grouped,function(group){
      var reducedGroup = _.reduce(group, function(memo, num){
        memo.x = parseInt(memo.x,10) + parseInt(num.x,10); 
        memo.y = parseInt(memo.y,10) + parseInt(num.y,10); 
        memo.z = parseInt(memo.z,10) + parseInt(memo.z,10); 
        return memo;
      }); 

      reducedGroup.x = reducedGroup.x/group.length;
      reducedGroup.y = reducedGroup.y/group.length;
      reducedGroup.z = reducedGroup.z/group.length;
      reducedGroup.name = reducedGroup.group;

      getGroupImage(reducedGroup,function(err,response){
        if(response.length > 0 && response[0].imageurl){
          reducedGroup.imageurl = response[0].imageurl;
        }
        reducedGroups.push(reducedGroup);
        sendResponse();
      });
    });


  });
};

module.exports.saveResponse = saveResponse;
module.exports.setGroupImage = setGroupImage;
module.exports.getResponses = getResponses;
module.exports.getGroupResponses = getGroupResponses;
