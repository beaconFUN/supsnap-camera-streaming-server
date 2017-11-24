echo "start run script" > ~/run.log
echo "waiting 20 seconds..." >> ~/run.log

sleep 20

echo "start main script..." >> ~/run.log

sh ~/supsnap-camera-server/portforwarding.sh > ~/portforwarding.log &
python ~/supsnap-camera-server/camera/__init__.py > ~/server.log &
/usr/local/bin/node ~/supsnap-camera-server/streaming/post_jpg.js &> ~/post_jpg.log &

