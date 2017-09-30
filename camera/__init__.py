import controllers
from app import app
import requests
headers = {"User-Agent": "OlympusCameraKit"}
import time
import sys
import json

def setup_camera():
    while True:
        try:
            res = requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/get_state.cgi", headers=headers)
            if res.status_code == requests.codes.ok:
                break
        except:
            continue
    
    print("connected to camera!")
    
    
    print("switch camera mode to rec...")
    print(requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/switch_cameramode.cgi?mode=rec", headers=headers).text)
    print("start live view on 5555 port...")
    print(requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/exec_takemisc.cgi?com=startliveview&port=5555&ivqty=0800x0600", headers=headers).text)


def regist_to_supsnap_server():
    data = {"place": app.config["PLACE_ID"], "endpoint": app.config["SELF_ADDRESS"] + "/set_supsnap"}
    print("regist to supsnap server...")
    print(requests.post(app.config["SUPSNAP_SERVER_ADDRESS"] + "/add_camera", data=json.dumps(data)).text)


if __name__ == "__main__":
    setup_camera()
    regist_to_supsnap_server()
    app.run(host="0.0.0.0", debug = True)
