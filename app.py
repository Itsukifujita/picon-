from flask import Flask, render_template, redirect, request, session, abort, jsonify, json
from linebot import (LineBotApi, WebhookHandler)
from linebot.exceptions import (InvalidSignatureError)
from linebot.models import (MessageEvent, TextMessage, TextSendMessage)
import sqlite3
app = Flask(__name__)
app.secret_key = "picon"

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
    if "user_id" in session:
        return redirect('/')
    else:
        return render_template('login.html')

@app.route("/login_member", methods=['POST'])
def login_member():
    user_name = request.form.get('name')
    password = request.form.get('pass')
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("SELECT user_id FROM user WHERE user_name = ? AND password = ?", (user_name, password))
    user_id = c.fetchone()
    c.close()
    if user_id is None:
        return '0'
    else:
        session["user_id"] = str(user_id[0])
        return str(user_id[0])

@app.route("/entry")
def entry():
    if "user_id" in session:
        return redirect('/')
    else:
        return render_template('entry.html')

@app.route("/entry_member", methods=['POST'])
def entry_member():
    user_name = request.form.get("name")
    password = request.form.get("pass")
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("INSERT into user values (null, ?, ?, 0)", (user_name, password))
    conn.commit()
    c.execute("SELECT user_id FROM user WHERE user_name = ? AND password = ?", (user_name, password))
    user_id = c.fetchone()
    c.close()
    if user_id is None:
        return '0'
    else:
        return str(user_id[0])

@app.route("/logout")
def logout():
    session.pop("user_id", None)
    return redirect('/login')

@app.route("/get_task", methods=['POST'])
def get_task():
    user_id = session["user_id"]
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("SELECT task_id, sort_id, message, day, time FROM task WHERE user_id = ?", (user_id, ))
    task_list = ''
    for result in c.fetchall():
        task_list += str(result[0]) + ',' + str(result[1]) + ',' + str(result[2]) + ',' + str(result[3]) + ',' + str(result[4]) + '#'
    c.close()
    if task_list == '':
        return '0'
    else:
        return task_list

@app.route("/get_lineid", methods=['POST'])
def get_lineid():
    user_id = session["user_id"]
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("SELECT line_id FROM user WHERE user_id = ?", (user_id, ))
    line_id = c.fetchone()
    c.close()
    return str(line_id[0])

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