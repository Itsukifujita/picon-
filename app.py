from flask import Flask, render_template, redirect, request, session, abort, jsonify
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
    if "user_id" in session:
        user_id = session["user_id"][0]
        return render_template('index.html')
    else:
        return redirect('/login')

@app.route("/login")
def login():
    return render_template('login.html')

@app.route("/login_member", methods=['POST'])
def login_member():
    user_name = request.json['name']
    password = request.json['pass']
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("SELECT user_id FROM user WHERE user_name = ? AND password = ?", (user_name, password))
    user_id = c.fetchone()
    c.close()
    if user_id is None:
        return jsonify(ResultSet = json.dumps({"result": '0'}))
    else:
        session["user_id"] = user_id
        return jsonify(ResultSet = json.dumps({"result": user_id}))

@app.route("/entry")
def entry():
    return render_template('entry.html')

@app.route("/entry_member", methods=['POST'])
def entry_member():
    user_name = request.form.get("member_name")
    password = request.form.get("member_pass")
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("INSERT into user values (null, ?, ?, 0)", (user_name, password))
    conn.commit()
    c.close()
    return redirect('/login.html')

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