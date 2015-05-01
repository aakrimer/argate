var arDrone = require('ar-drone');
var client = arDrone.createClient();
var startTime = new Date().getTime();
var pngStream = client.getPngStream();
var log = function(s){
  var time = ((new Date().getTime() - startTime)/1000).toFixed(2);
  console.log(time+"\t"+s);
}

pngStream.on('error',console.log).on('data',function(pngBuffer){
  console.log("got data size="+pngBuffer.length)
  
  require("fs").writeFile("data-"+new Date().getMilliseconds()+".png", pngBuffer, "binary", function(err){
    console.log(err);
  })
});

client.takeoff();
client.calibrate(0);
client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .after(3000, function() {
    this.animate('flipLeft', 15);
  })
  .after(1000, function() {
    this.stop();
    this.land();
  });