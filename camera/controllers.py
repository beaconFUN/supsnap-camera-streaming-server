from flask import Flask
from app import app

@app.route('/')
def show_all():
    return "hello flask!!"
