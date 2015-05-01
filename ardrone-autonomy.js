// Require modules

var autonomy = require('ardrone-autonomy');
var fs = require('fs');
var hoek = require('hoek');


// Declare internals

var internals = {};


var log = function (s) {

    var time = ((Date.now() - internals.startTime) / 1000).toFixed(2);
    console.log(time + '\t' + s);
};


var main = function () {

    internals.mission.takeoff()
           .hover(5000)
           .zero()          // Sets the current state as the reference 
           .altitude(1)     // Climb to altitude = 1 meter 
           .forward(1)   
           .right(1)     
           .backward(1) 
           .left(1)
           .hover(1000)     // Hover in place for 1 second 
           .land();
   
    internals.mission.run(function (err, result) {

        if (err) {
            console.trace('Oops, something bad happened: %s', err.message);
            internals.mission.client().stop();
            internals.mission.client().land();
        } else {
            console.log('Mission success!');
            process.exit(0);
        }
    });
};


var toDo = hoek.once(main);


// Initialize mission
internals.mission = autonomy.createMission();
internals.client = internals.mission.client().config('video:video_channel', 3);
//internals.client = internals.mission.client().config('video:video_channel', 1);
internals.pngStream = internals.mission.client().getPngStream();
internals.startTime = Date.now();


// Capture image events

internals.pngStream.on('error', console.log);
internals.pngStream.on('data', function (pngBuffer) {

    // Write to file
    console.log('got data size='+pngBuffer.length);
    fs.writeFile('data-' + Date.now() + '.png', pngBuffer, 'binary', function (err) {
        console.log(err);
    });

    // Execute mission
    toDo();
});
