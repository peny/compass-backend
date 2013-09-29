var mongoose = require('mongoose');
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
});

var Response = mongoose.model('Response', responseSchema);

var saveResponse = function(data,callback){
  var response = new Response(data);
  response.save(callback(err,res));
};

var getResponses = function(data, callback){
  Response.find({group: data.group},function(err, responses){
    callback(err, responses);
  });
};

module.exports.saveResponse = saveResponse;
module.exports.getResponses = getResponses;
