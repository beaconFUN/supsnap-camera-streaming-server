import controllers
from app import app
import requests
headers = {"User-Agent": "OlympusCameraKit"}
import time
import sys
import json
import logging
import os

def setup_camera():
    while True:
        try:
            res = requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/get_state.cgi", headers=headers)
            if res.status_code == requests.codes.ok:
                break
        except:
            continue
    
    print("connected to camera!")

def regist_to_supsnap_server():
    data = {"place": app.config["PLACE_ID"], "endpoint": app.config["SELF_ADDRESS"] + "/set_supsnap"}
    print("regist to supsnap server...")

    while True:
        try:
            res = requests.post(app.config["SUPSNAP_SERVER_ADDRESS"] + "/add_camera", data=json.dumps(data))
            if res.status_code == requests.codes.ok:
                break
        except:
            continue
    
    print("regist ok")


if __name__ == "__main__":
    sys.stdout = os.fdopen(sys.stdout.fileno(), 'w', 0)
    setup_camera()
    regist_to_supsnap_server()
    app.run(host="0.0.0.0", debug = True)
