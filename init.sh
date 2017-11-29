echo '@reboot ~/supsnap-camera-server/run.sh' | crontab
sudo cp ./interfaces /etc/network/interfaces
wpa_passphrase [YOUR OLYMPUS AIRS WIFI SSID] [YOUR OLYMPUS AIRS WIFI PASSWORD] | sudo tee /etc/wpa_supplicant/wpa_supplicant_wlan0.conf
wpa_passphrase [YOUR ENVIRONMENTS WIFI SSID] [YOUR ENVIRONMENTS WIFI PASSWORD] | sudo tee /etc/wpa_supplicant/wpa_supplicant_wlan1.conf

sudo pip install -r requirements.txt

sudo reboot
