#!/bin/sh

AUTH="gkug-1tmj-9h7h-1az2"

gst-launch-1.0 -vvvv \
	filesrc location="./tmp/liveview.1507943572884.jpg" \
	! decodebin \
	! imagefreeze \
	! videoconvert \
	! "video/x-raw, width=320, height=240, framerate=6/1" \
	! queue \
	! x264enc bitrate=400 byte-stream=false key-int-max=60 bframes=0 aud=true tune=zerolatency ! "video/x-h264,profile=main" \
	! flvmux streamable=true name=mux \
	! rtmpsink location="rtmp://a.rtmp.youtube.com/live2/x/${AUTH} app=live2" \
	  audiotestsrc \
	! voaacenc bitrate=128000 \
	! mux.
