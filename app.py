from flask import Flask, render_template, redirect, request, session, abort
from linebot import (LineBotApi, WebhookHandler)
from linebot.exceptions import (InvalidSignatureError)
from linebot.models import (MessageEvent, TextMessage, TextSendMessage)
import sqlite3
app = Flask(__name__)

ACCESS_TOKEN = "SdkDSrXH0xUujJswTtr+VWwN9+8bBMTPucyJPRwmaO5WkNnRifQhLj4eZbTt+UJtgG3umDfUpQOlHyMFvTM+zfLoaBtBGIc+vSsDvEoOX4pXnAqvZq9t6RySUYQ7f8wrsZvumbnMwpwvOJPKk5l3pgdB04t89/1O/w1cDnyilFU="
SECRET = "f7e0094eed57d3ec0b1cab8985939d07"
line_bot_api = LineBotApi(ACCESS_TOKEN)
handler = WebhookHandler(SECRET)


@app.route("/")
def index():
    return 'LINEbotのテストだニャー'

@app.route("/callback", methods=['POST'])
def callback():
    signature = request.headers['X-Line-Signature']
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)
    return 'OK'

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    line_bot_api.reply_message(event.reply_token, TextSendMessage(text=event.message.text))

if __name__ == "__main__":
    app.run()