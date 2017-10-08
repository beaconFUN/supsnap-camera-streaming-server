echo '@reboot ~/supsnap-camera-server/run.sh' | crontab
sudo cp ./interfaces /etc/network/interfaces
wpa_passphrase AIR-A01-BHD205042 53373237 | sudo tee /etc/wpa_supplicant/wpa_supplicant_wlan0.conf
wpa_passphrase free-wifi free-wifi | sudo tee /etc/wpa_supplicant/wpa_supplicant_wlan1.conf

sudo pip install -r requirements.txt

sudo reboot
