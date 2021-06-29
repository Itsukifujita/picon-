from flask import Flask, render_template, redirect, request, session, abort, jsonify, json
from linebot import (LineBotApi, WebhookHandler)
from linebot.exceptions import (InvalidSignatureError)
from linebot.models import (MessageEvent, TextMessage, TextSendMessage)
import sqlite3
import datetime
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
    c.execute("SELECT task_id, sort_id, message, day, time FROM task WHERE user_id = ? order by sort_id asc", (user_id, ))
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

@app.route("/insert_newtask", methods=['POST'])
def insert_newtask():
    day = request.form.get("day")
    sortid = request.form.get("sortid")
    userid = session["user_id"]
    message = ''
    time = '00:00'
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("INSERT into task values (null, ?, ?, ?, ?, ?)", (userid, sortid, message, day, time))
    conn.commit()
    c.execute("SELECT task_id, sort_id, message, day, time FROM task WHERE user_id = ? order by sort_id desc", (userid, ))
    result = c.fetchone()
    c.close()
    if result is None:
        return '0'
    else:
        return str(result[0]) + ',' + str(result[1]) + ',' + str(result[2]) + ',' + str(result[3]) + ',' + str(result[4])

@app.route("/update_sortid", methods=['POST'])
def update_sortid():
    taskid_list = request.form.get("taskid").split('-')
    sortid_list = request.form.get("sortid").split('-')
    num = request.form.get("num")
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    for i in range(int(num)):
        c.execute("UPDATE task set sort_id = ? WHERE task_id = ?", (sortid_list[i], taskid_list[i]))
        conn.commit()

    c.close()
    return 'OK'

@app.route("/update_day", methods=['POST'])
def update_day():
    task_id = request.form.get("taskid")
    day = request.form.get("day")
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("UPDATE task set day = ? WHERE task_id = ?", (day, task_id))
    conn.commit()
    c.close()
    return 'OK'

@app.route("/update_message", methods=['POST'])
def update_message():
    task_id = request.form.get("taskid")
    message = request.form.get("message")
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("UPDATE task set message = ? WHERE task_id = ?", (message, task_id))
    conn.commit()
    c.close()
    return 'OK'

@app.route("/update_time", methods=['POST'])
def update_time():
    task_id = request.form.get("taskid")
    time = request.form.get("time")
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("UPDATE task set time = ? WHERE task_id = ?", (time, task_id))
    conn.commit()
    c.close()
    return 'OK'

@app.route("/picon_push_line_task_regular_time")
def picon_push_line_task_regular_time():
    week_num = datetime.date.today().weekday() + 2
    tz = datetime.timezone(datetime.timedelta(hours=9))
    now = datetime.datetime.now(tz)
    tmp_hour = int(now.hour)
    tmp_minute = int(now.minute)
    date = str(now.date())
    if tmp_hour < 10:
        hour = '0' + str(tmp_hour)
    else:
        hour = str(tmp_hour)
    
    if tmp_minute < 15:
        minute = '00'
    elif 15 <= tmp_minute and tmp_minute < 30:
        minute = '15'
    elif 30 <= tmp_minute and tmp_minute < 45:
        minute = '30'
    else:
        minute = '45'
    
    time = hour + ':' + minute
    sql = "SELECT user.line_id, task.message FROM task INNER JOIN user on task.user_id = user.user_id WHERE user.line_id != 0 and (task.day = 1 or task.day = ? or task.day = ?) and task.time = ?"
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute(sql, (week_num, date, time))
    for result in c.fetchall():
        line_id = str(result[0])
        mes = str(result[1])
        line_bot_api.push_message(line_id, TextSendMessage(text=mes))
    c.close()
    datetime = date + ' ' + time
    return datetime

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
    profile = line_bot_api.get_profile(event.source.user_id)
    line_id = profile.user_id
    conn = sqlite3.connect('task.db')
    c = conn.cursor()
    c.execute("SELECT user_id FROM user WHERE line_id = ?", (line_id, ))
    user_id = c.fetchone()
    if user_id is None:
        user_info = str(event.message.text).split('、')
        l = len(user_info)
        if l == 2:
            c.execute("SELECT user_id FROM user WHERE user_name = ? AND password = ?", (user_info[0], user_info[1]))
            user_id = c.fetchone()
            if user_id is None:
                mes = "名前またはパスワードが間違っています"
            else:
                c.execute("UPDATE user set line_id = ? WHERE user_id = ?", (line_id, user_id[0]))
                conn.commit()
                mes = profile.display_name + "さん、連携が完了しました。"
        else:
            mes = "名前、パスワード\nの形式で入力してください"
    else:
        mes = profile.display_name + "さんは連携が完了しています。"

    c.close()
    line_bot_api.push_message(line_id, TextSendMessage(text=mes))

if __name__ == "__main__":
    app.run()