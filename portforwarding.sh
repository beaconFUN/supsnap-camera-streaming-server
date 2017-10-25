self_port=$(cat ~/supsnap-camera-server/camera/config.py | grep SELF_ADDRESS | awk '{match($0, /:[0-9]+"/); print substr($0, RSTART, RLENGTH)}' | awk '{match($0, /[0-9]+/); print substr($0, RSTART, RLENGTH)}')

while true; do
	echo "$(date) start portforwarding..." >> ~/error.log
	ssh -oStrictHostKeyChecking=no -R 192.168.255.254:$self_port:localhost:5000 portforward@35.200.2.51 -N
	sleep 1
done
