"use strict";

var fs = require("fs");
var OPC = require("./opc-js");
var opc = new OPC();

var write_stream = fs.createWriteStream("video_pipe");
var count = 0;

opc.on("liveview:frame", function (jpg) {
    if(count % 5 === 0)write_stream.write(jpg);
    count++;
});

opc.negotiate();

