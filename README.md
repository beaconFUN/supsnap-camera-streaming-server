# supsnap-camera-server

## about
Take a snapshot and stream camera view

## requirements
* RaspberryPi 2 (2017-09-07-raspbian-stretch)
* Olympus Air A01
* Python(2.7.13)
* pip(9.0.1)
* Node.js(v9.0.0)

## install
1. Connect to raspberry pi with ssh
1. Clone this repositry at user home(~/)
1. Edit config file. you must rewrite `[DESCRIPTION]` in each config files.
  1. Edit `/camera/config.py`
  1. Edit `/portforwarding.sh`
  1. Edit `/init.sh`
1. Change directory to `/streaming/` and run `npm install`
1. Run `./init.sh`. finish install, RaspberryPi will ReBoot.

## usage
1. Turn on OlynpusAir and check power led is lighting blue.
1. Turn on RaspberryPi and check turning OlympusAir's power led to green.
  (It mean connection between RaspberryPi and OlympusAir is done.)
1. Wait about 30 seconds.
  (To confirm that the camera server is available, check that `add_camera` is recorded in api server's logs.)

## trouble shooting
### Camera server is registered api server?
Confirm that `add_camera` is recorded in supsnap api server's logs.
There isn't it? Maybe RaspberryPi can't start server or can't connect to api server.
Check connection between RaspberryPi and OlympusAir and your network environment of RaspberryPi.

### Can camera server connect to api server?
Login camera server and do `ping [YOUR SUPSNAP API SERVER'S IP ADDRESS]`.
If it failed, camera sercer can't connect to api server.Check your network of RaspberryPi.

### Can api server connect to camera server?
Login api server and do 'curl 192.168.255.254:[YOUR CAMERA SERVER'S PORT]'.
If it don't return `I'm supsnap camera server!`, api server can't connect to camera server.
Do `ps aux | grep sshd`.
Pay attention to only port forwarding process of the camera server.
Are there some process?
It must be unique.
If it's plural, api server can't connect to camera server correctly.
Do `sudo kill [THOSE PROCESS ID]` and reconfirm the process is unique.

