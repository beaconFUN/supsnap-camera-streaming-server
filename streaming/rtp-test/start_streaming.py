import requests
headers = {"User-Agent": "OlympusCameraKit"}
import time
import sys
import json
import logging
import os

if __name__ == "__main__":
    print("switch camera mode to rec...")
    print(requests.get("http://192.168.0.10/switch_cameramode.cgi?mode=rec", headers=headers).text)
    print("start live view on 5555 port...")
    print(requests.get("http://192.168.0.10/exec_takemisc.cgi?com=startliveview&port=5555&ivqty=0800x0600", headers=headers).text)

