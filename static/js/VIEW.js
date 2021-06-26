const JSVIEW = {
    viewLoginError: function() {
        $('#login_error_message').html('ログインに失敗しました');
    },
    createTask: function(res){
        let html = ``,
            len = res.length;
        for (let i = 0; i < len; i++) {
            html += `<li class="task" data-id="${res[i][0]}">`
                  +     `<input type="text" name="task_name" class="task_detail" value="${res[i][1]}">`
                  +     `<input type="date" class="task_date">`
                  +     JSVIEW.createSelectDay(res[i][2])
                  +     JSVIEW.createSelectHour(res[i][3])
                  +     JSVIEW.createSelectMinuites(res[i][3])
                  + `</li>`;
        }
        $('#task_list').html(html);
    },
    createNoTask: function() {
        
    },
    createSelectDay: function(day) {
        let html = `<select class="task_select_day">`,
            array = ['毎日', '毎週月曜日', '毎週火曜日', '毎週水曜日', '毎週木曜日', '毎週金曜日', '毎週土曜日', '毎週日曜日'];
        for (let i in array) {
            html += `<option value="${i}">${array[i]}</option>`;
        }
        html += `</select>`;
        return html;
    },
    createSelectHour: function(time) {
        let html = `<select class="task_select_hour">`,
            array = ['00', '01', '02', '03','04', '05', '06', '07','08', '09', '10', '11','12', '13', '14', '15','16', '17', '18', '19','20', '21', '22', '23','24'];
        for (let i in array) {
            html += `<option value="${i}">${array[i]}</option>`;
        }
        html += `</selected>`;
        return html;
    },
    createSelectMinuites: function(time) {
        let html = `<select class="task_select_minutes">`,
            array = ['00', '15', '30', '45'];
        for (let i in array) {
            html += `<option value="${i}">${array[i]}</option>`;
        }
        html += `</selected>`;
        return html; 
    }
};