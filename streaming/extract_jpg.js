"use strict";

const fs = require("fs");
const write_stream = fs.createWriteStream("video_stream");
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
let jpg_buffer = new Buffer(0);
let counter = 0;

server.on("message", function (msg, rinfo) {
  const rtp_header_length = 12;
  const extension_header_length = 4;
  const extension_bit = parseInt(msg[0].toString(2)[3], 2);
  let jpg_chunk;
  
  if (extension_bit === 1) {
    counter++;
    
    if(counter % 10 === 0){
      console.log(jpg_buffer);
      write_stream.write(jpg_buffer);
    }
    
    jpg_buffer = new Buffer(0);
    
    const extension_length = msg.readUInt16BE(14) * 4;
    jpg_chunk = msg.slice(rtp_header_length + extension_length + extension_header_length);
  } else {
    jpg_chunk = msg.slice(rtp_header_length);
  }
  
  jpg_buffer = Buffer.concat([jpg_buffer, jpg_chunk]);
}).bind(5555);
