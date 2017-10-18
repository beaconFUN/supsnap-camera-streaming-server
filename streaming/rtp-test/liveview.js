/*
 *  カメラの電源をONにしてカメラのWi-Fiに接続し
 *  このサンプルコードを実行してください。
 *  tmpディレクトリに5秒分のライブビュー画像が保存されます。
 */

"use strict";

var dgram = require("dgram");
var server = dgram.createSocket("udp4");
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


opc.on("liveview:frame", function (jpg) {
    if(jpg.byteLength !== 0){
	var head = create_rtp_head();
        write_stream.write(Buffer.concat([head.start, jpg]));
        write_stream.write(head.end);
    }
});

opc.negotiate();

