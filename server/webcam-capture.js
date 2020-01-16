var NodeWebcam = require("node-webcam");

var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    verbose: false
};

var Webcam = NodeWebcam.create(opts);

Webcam.list(function (list) {
    var cam2 = NodeWebcam.create({ device: list[2] });
    cam2.capture("test_picture2", function (err, data) {
        console.log({ err, data })
    });
});