import controllers
from app import app
import requests
headers = {"User-Agent": "OlympusCameraKit"}
import time
import sys

def setup_camera():
    while True:
        try:
            res = requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/get_state.cgi", headers=headers)
            if res.status_code == requests.codes.ok:
                break
        except:
            continue
    
    print("connected!")
    
    
    print("switch camera mode to rec...")
    print(requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/switch_cameramode.cgi?mode=rec", headers=headers))
    print("start live view on 5555 port...")
    print(requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/exec_takemisc.cgi?com=startliveview&port=5555&ivqty=0800x0600", headers=headers))

if __name__ == "__main__":
    setup_camera()
    app.run(host="0.0.0.0", debug = True)
