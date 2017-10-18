"use strict";

var fs = require("fs");
var async = require("async");
var OPC = require("./opc-js");
var opc = new OPC();

var write_stream = fs.createWriteStream("video_pipe");

var create_rtp_head = (function(){
  var count = 0;
  var session = Math.random();
  return function(){
    var V_P_X_CC_M_PT_start = new Buffer(2);
    var V_P_X_CC_M_PT_end = new Buffer(2);
    V_P_X_CC_M_PT_start.writeUInt16BE(0b1001000001100000, 0);
    V_P_X_CC_M_PT_end.writeUInt16BE(0b1001000011100000, 0);
    var sequence_number = new Buffer(2);
    sequence_number.writeUInt16BE(count, 0);
    var timestamp = new Buffer(4);
    timestamp.writeUInt32BE(count * 3000, 0);
    var ssrc = new Buffer(4);
    ssrc.writeFloatBE(session, 0);
    count++;
    return {
      start: Buffer.concat([V_P_X_CC_M_PT_start, sequence_number, timestamp, ssrc]),
      end: Buffer.concat([V_P_X_CC_M_PT_end, sequence_number, timestamp, ssrc])
    };
  };
})();

var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var head = create_rtp_head();
var jpgChunk = new Buffer(0);

server.on("message", function (msg, rinfo) {
  console.log(msg);
  var rtpHeaderByteLength = 12;
  var extensionHeaderByteLength = 4;
  var extensionBit;
  var hasExtensionHeader;
  
  extensionBit = parseInt(msg[0].toString(2)[3], 2);
  
  hasExtensionHeader = (extensionBit === 1);
  
  if (hasExtensionHeader) {
    write_stream.write(Buffer.concat([head.end, jpgChunk]));
    
    var extensionWordLength = msg.readUInt16BE(14);
    var extensionByteLength = extensionWordLength * 4;
    
    head = create_rtp_head();
    jpgChunk = msg.slice(rtpHeaderByteLength + extensionByteLength + extensionHeaderByteLength);
  } else {
    write_stream.write(Buffer.concat([head.start, jpgChunk]));
    jpgChunk = msg.slice(rtpHeaderByteLength);
  }
  
}).bind(5555);
