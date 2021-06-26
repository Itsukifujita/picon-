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
                  +     `<input type="text" class="task_detail" value="${res[i][2]}">`
                  +     `<input type="date" class="task_date" value="${date}">`
                  +     JSVIEW.createSelectDay(res[i][3])
                  +     JSVIEW.createSelectHour(res[i][4])
                  +     JSVIEW.createSelectMinuites(res[i][4])
                  + `</li>`;
        }
        $('#task_list').html(html);
        JSMOVE.moveSorttable();
    },
    createNoTask: function() {
        
    },
    createSelectDay: function(day) {
        let html = `<select class="task_select_day">`,
            array = ['毎日', '毎週月曜日', '毎週火曜日', '毎週水曜日', '毎週木曜日', '毎週金曜日', '毎週土曜日', '毎週日曜日'];
        for (let i in array) {
            if (String(i + 1) === day) {
                html += `<option value="${i}" selected>${array[i]}</option>`;
            } else {
                html += `<option value="${i}">${array[i]}</option>`;
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
                html += `<option value="${i}" selected>${array[i]}</option>`;
            } else {
                html += `<option value="${i}">${array[i]}</option>`;
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
                html += `<option value="${i}" selected>${array[i]}</option>`;
            } else {
                html += `<option value="${i}">${array[i]}</option>`;
            }
            
        }
        html += `</select>`;
        return html; 
    }
};