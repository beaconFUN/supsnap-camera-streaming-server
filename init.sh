cp ./interfaces /etc/network/interfaces
wpa_passphrase AIR-A01-BHD205042 53373237 > /etc/wpa_supplicant/wpa_supplicant_wlan0.conf
wpa_passphrase free-wifi free-wifi > /etc/wpa_supplicant/wpa_supplicant_wlan1.conf

pip install -r requirements.txt

reboot