var arDrone = require('ar-drone');
var client = arDrone.createClient();
var startTime = new Date().getTime();
var pngStream = client.getPngStream();
var log = function(s){
  var time = ((new Date().getTime() - startTime)/1000).toFixed(2);
  console.log(time+"\t"+s);
}
var iCounter=0;
pngStream
.on('error',console.log)
.on('data',function(pngBuffer){
  console.log("got data size="+pngBuffer.length)
  iCounter++;
  require("fs").writeFile("data-"+iCounter+".png", pngBuffer, "binary", function(err){
    console.log(err);
  })
});

client.takeoff();

client
  .after(5000, function() {
    this.up(0.5);
  })
  .after(5000, function() {
    this.animate('flipBehind'1000);
  })
  .after(3000, function() {
    this.animate('flipAhead',1000);
  })
  .after(3000, function() {
    this.animate('turnaroundGodown',1000);
  })
  .after(1000, function() {
    this.stop();
    this.land();
  });