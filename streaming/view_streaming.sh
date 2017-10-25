#!/bin/sh

AUTH="gkug-1tmj-9h7h-1az2"

gst-launch-1.0 -vvvv \
	filesrc location="video_stream" \
	! "image/jpeg, width=320, height=240" \
	! jpegdec \
	! "video/x-raw, width=320, height=240, framerate=3/1" \
	! autovideosink sync=false \
