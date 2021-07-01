const JSVIEW = {
    viewLoginError: function() {
        $('#login_error_message').html('ログインに失敗しました');
    },
    createTask: function(res) {
        let html = ``,
            len = res.length,
            date;
        for (let i = 0; i < len; i++) {
            date = JSMOVE.moveJudgmentDate(res[i][3]);
            html += `<li class="task" data-id="${res[i][0]}" data-sort="${res[i][1]}">`
                  +     `<span class="chenge_day">日付指定切替</span>`
                  +     `<input type="text" class="task_detail" value="${res[i][2]}">`
                  +     `<input type="date" class="task_date" value="${date}">`
                  +     JSVIEW.createSelectDay(res[i][3])
                  +     JSVIEW.createSelectHour(res[i][4])
                  +     JSVIEW.createSelectMinuites(res[i][4])
                  +     `<span class="del_task">×</span>`
                  + `</li>`;
        }
        $('#task_list').html(html);
        JSMOVE.moveSorttable();
        for (let i = 0; i < len; i++) {
            JSMOVE.moveHideDayContent(res[i][0], res[i][3]);
        }
    },
    createNoTask: function() {
        let html = `<li class="no_task">`
                 +     `<div class="no_task_comment">予定を追加してください</div>`
                 + `</li>`;
        $('#task_list').html(html);
    },
    createSelectDay: function(day) {
        let html = `<select class="task_select_day">`,
            array = ['毎日', '毎週月曜日', '毎週火曜日', '毎週水曜日', '毎週木曜日', '毎週金曜日', '毎週土曜日', '毎週日曜日'],
            num;
        for (let i in array) {
            num = Number(i) + 1;
            if (String(num) === day) {
                html += `<option value="${num}" selected>${array[i]}</option>`;
            } else {
                html += `<option value="${num}">${array[i]}</option>`;
            }
        }
        html += `</select>`;
        return html;
    },
    createSelectHour: function(time) {
        let html = `<select class="task_select_hour">`,
            array = ['00', '01', '02', '03','04', '05', '06', '07','08', '09', '10', '11','12', '13', '14', '15','16', '17', '18', '19','20', '21', '22', '23'],
            hour = JSMOVE.moveConvertDate('2021-06-26 ' + time, 'hh');  //timeの時間部分が取得できればいいので、仮に2021ｰ06-26とする
        for (let i in array) {
            if (hour === array[i]) {
                html += `<option value="${array[i]}" selected>${array[i]}</option>`;
            } else {
                html += `<option value="${array[i]}">${array[i]}</option>`;
            }
        }
        html += `</select>`;
        return html;
    },
    createSelectMinuites: function(time) {
        JSMOVE.moveConvertDate(time, 'mm');
        let html = `<select class="task_select_minutes">`,
            array = ['00', '15', '30', '45'],
            minutes = JSMOVE.moveConvertDate('2021-06-26 ' + time, 'mm');   //timeの分数が取得できればいいので、仮に2021ｰ06-26とする
        for (let i in array) {
            if (minutes === array[i]) {
                html += `<option value="${array[i]}" selected>${array[i]}</option>`;
            } else {
                html += `<option value="${array[i]}">${array[i]}</option>`;
            }
        }
        html += `</select>`;
        return html; 
    },
    addTask: function(array) {
        let date = JSMOVE.moveConvertDate(array[3], 'YYYY-MM-DD'),
            html = `<li class="task" data-id="${array[0]}" data-sort="${array[1]}">`
                 +     `<span class="chenge_day">日付指定切替</span>`
                 +     `<input type="text" class="task_detail" value="${array[2]}">`
                 +     `<input type="date" class="task_date" value="${date}">`
                 +     JSVIEW.createSelectDay(array[3])
                 +     JSVIEW.createSelectHour(array[4])
                 +     JSVIEW.createSelectMinuites(array[4])
                 +     `<span class="del_task">×</span>`
                 + `</li>`;
        $('#task_list').append(html);
        JSMOVE.moveHideDayContent(array[0], array[3]);
    }
};