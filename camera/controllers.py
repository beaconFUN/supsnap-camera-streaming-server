from flask import Flask, request, make_response
from app import app
import requests
headers = {"User-Agent": "OlympusCameraKit"}
from threading import Timer
import time
import json
import re

def get_json_params():
    return json.loads(request.data)

def get_image_set():
    return set(re.findall(r",(.+\.JPG),", requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/get_imglist.cgi?DIR=" + app.config["DCIM_DIR"], headers=headers).text))

def exec_takemotion(id):
    image_set = get_image_set()
    
    print("exec_takemotion...")
    print(requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/exec_takemotion.cgi?com=newstarttake&point=400x300", headers=headers))
   
    new_image_set = get_image_set()
    
    cnt = 0
    while len(new_image_set - image_set) == 0:
        print("waiting for image to ready...")
        time.sleep(1)
        new_image_set = get_image_set()
        cnt += 1
        if cnt % 3 == 0:
            print("maybe AF is failed so re:exec takemotion...")
            print(requests.get("http://" + app.config["CAMERA_ADDRESS"] + "/exec_takemotion.cgi?com=newstarttake&point=400x300", headers=headers))
    
    new_filename = list(new_image_set - image_set)[0]
    
    print("image to ready!")
    print(new_filename)

@app.route('/')
def show_all():
    return "I'm supsnap camera server!"

@app.route("/set_supsnap", methods=["GET"])
def set_supsnap():
    Timer(int(request.args.get("interval")), exec_takemotion, (request.args.get("id"), )).start()
    return "ok"

@app.route("/get_image", methods=["GET"])
def get_snap_image():
    responce = make_response(requests.get("http://" + app.config["CAMERA_ADDRESS"] + app.config["DCIM_DIR"] + "/" + request.args.get("file"), headers=headers).content)
    responce.headers["Content-Type"] = "image/jpeg"
    return responce

