var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/compass');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log('db open!');
});

var responseSchema = mongoose.Schema({
  compassId: String,
  name, String,
  x: String,
  y: String,
  z: String,
});

var Response = mongoose.model('Response', responseSchema);

var saveResponse = function(data){
  var response = new Response(data);
  response.save();
};

var getResponses = function(data, callback){
  Response.find({compassId: data.compass.Id},function(err, responses){
    callback(err, responses);
  });
};

module.exports.saveResponse = saveResponse;
module.exports.getResponses = getResponses;
