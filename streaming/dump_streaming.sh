#!/bin/sh

gst-launch-1.0 -vvvv \
	filesrc location="video_stream" \
	! fakesink dump=true
