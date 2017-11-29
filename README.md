# supsnap-camera-server

## about
take a snapshot and stream camera view

## requirements
* raspberry pi 2 (2017-09-07-raspbian-stretch)
* python(2.7.13)
* pip(9.0.1)
* nodejs(v9.0.0)

## install
1. connect raspberry pi with ssh
1. clone this repositry at user home(~/)
1. edit config file. you must rewrite `[DESCRIPTION]` in each config files.
  1. edit `/camera/config.py`
  1. edit `/portforwarding.sh`
  1. edit `/init.sh`
1. change directory to `/streaming/` and run `npm install`
1. run `./init.sh`

## usage

