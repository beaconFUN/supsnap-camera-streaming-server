"use strict";

const fs = require("fs");
const write_stream = fs.createWriteStream("video_stream");
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const path = require("path");
const fetch = require("node-fetch");
const formData = require("form-data");

let jpg_buffer = new Buffer(0);
let jpg = new Buffer(0);
let jpg_snap_date = new Date();

server.on("message", (msg, rinfo) => {
    const rtp_header_length = 12;
    const extension_header_length = 4;
    const extension_bit = parseInt(msg[0].toString(2)[3], 2);
    let jpg_chunk;

    if (extension_bit === 1) {
        jpg = jpg_buffer;
        jpg_snap_date = new Date();
        console.log(jpg);
        jpg_buffer = new Buffer(0);

        const extension_length = msg.readUInt16BE(14) * 4;
        jpg_chunk = msg.slice(rtp_header_length + extension_length + extension_header_length);
    } else {
        jpg_chunk = msg.slice(rtp_header_length);
    }

    jpg_buffer = Buffer.concat([jpg_buffer, jpg_chunk]);
}).bind(5555);

const get_python_config = (key) => {
    const config_file = fs.readFileSync(path.join(__dirname, "../camera/config.py")).toString("utf8");
    return JSON.parse(config_file.match(new RegExp(`${key} = (.+)`))[1]);
};

const supsnap_server_address = get_python_config("SUPSNAP_SERVER_ADDRESS");
const place_id = get_python_config("PLACE_ID");

const wait = async () => new Promise(resolve => setTimeout(() => resolve("wait ok"), 100));

const post_image = () => {
    const form = new formData();
    form.append("place", place_id);
    form.append("live_view", jpg, {
        filename: "live_view.jpg",
        contentType: "image/jpeg",
    });

    const options = {
        method: "POST",
        body: form,
    };
    return fetch(`${supsnap_server_address}/post_live_view`, options);
};

const post_image_loop = async () => {
    while(true){
        if((new Date()).getTime() - jpg_snap_date.getTime() < 100){
            console.log("posting...");
            console.log(await (await post_image()).text());
        }
       console.log(await wait());
    }
};

post_image_loop();

