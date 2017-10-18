#!/bin/sh

AUTH="gkug-1tmj-9h7h-1az2"

gst-launch-1.0 -vvvv \
	filesrc location="video_pipe" \
	! "image/jpeg, width=800, height=600" \
	! jpegdec \
	! "video/x-raw, width=800, height=600, framerate=6/1" \
	! x264enc bitrate=1000 byte-stream=false key-int-max=60 bframes=0 aud=true tune=zerolatency ! "video/x-h264, profile=main" \
	! flvmux streamable=true name=mux \
	! rtmpsink location="rtmp://a.rtmp.youtube.com/live2/x/${AUTH} app=live2" \
	  audiotestsrc \
	! voaacenc bitrate=128000 \
	! mux.
