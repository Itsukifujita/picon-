from flask import Flask, render_template, redirect, request, session
import random
import sqlite3
app = Flask(__name__)

ACCESS_TOKEN = "SdkDSrXH0xUujJswTtr+VWwN9+8bBMTPucyJPRwmaO5WkNnRifQhLj4eZbTt+UJtgG3umDfUpQOlHyMFvTM+zfLoaBtBGIc+vSsDvEoOX4pXnAqvZq9t6RySUYQ7f8wrsZvumbnMwpwvOJPKk5l3pgdB04t89/1O/w1cDnyilFU="
SECRET = "f7e0094eed57d3ec0b1cab8985939d07"
#line_bot_api = LineBotApi(ACCESS_TOKEN)
#handler = WebhookHandler(SECRET)


@app.route('/')
def index():
    return 'Hello Heroku_Flask'

if __name__ == "__main__":
    app.run(debug=True)