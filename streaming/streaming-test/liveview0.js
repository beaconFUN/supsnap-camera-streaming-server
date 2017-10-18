/*
 *  カメラの電源をONにしてカメラのWi-Fiに接続し
 *  このサンプルコードを実行してください。
 *  tmpディレクトリに5秒分のライブビュー画像が保存されます。
 */

"use strict";

var fs = require("fs");
var async = require("async");
var OPC = require("./opc-js");
var opc = new OPC();

opc.on("liveview:frame", function (jpg) {
    fs.writeFile("video_pipe.jpg", jpg);
});

opc.negotiate();

