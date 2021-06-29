const JSGET = {
    getLoginUserId: function() {
        $.ajax({
            url: '/login_member',
            type: 'POST',
            data: {name: $('#input_login_name').val(),
                   pass: $('#input_login_pass').val()
                  },
            dataType: "json",
            timeout: 30000
        }).done(function (res) {
            if (String(res) === NO_DATA) {
                $('#login_error_message').html('名前またはパスワードが間違っています')
            } else {
                window.location = '/';
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    getEntryUserId: function(name, pass) {
        $.ajax({
            url: '/entry_member',
            type: 'POST',
            data: {name: name,
                   pass: pass
                  },
            dataType: "json",
            timeout: 30000
        }).done(function (res) {
            if (String(res) === NO_DATA) {
                $('#entry_error_message').html('新規登録に失敗しました')
            } else {
                window.location = '/login';
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    getUserTask: function() {
        $.ajax({
            url: '/get_task',
            type: 'POST',
            data: {data: NO_DATA,
                  },
            dataType: "text",
            async: true,
            timeout: 30000
        }).done(function (res) {
            JSMOVE.moveMakeTaskData(res);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    getLineId: function() {
        let html = ``;
        $.ajax({
            url: '/get_lineid',
            type: 'POST',
            data: {data: NO_DATA,
                  },
            dataType: "text",
            timeout: 30000
        }).done(function (res) {
            if (String(res) === NO_DATA) {
                html += `<p class="line_nologin_comment">あなたはまだLINE側で登録できていません</p>`
                      + `<p class="line_nologin_comment">QRコードからお友達登録してください</p>`;
            } else {
                html += `<p class="line_login_comment">友達登録ありがとうございます</p>`
                      + `<p class="line_login_comment">時間がきたらpicon'からメッセージが届きます</p>`;
            }
            $('#line_check_comment').html(html)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    insertNewTask: function(sort_id) {
        let day = JSMOVE.moveConvertDate(new Date(), 'YYYY-MM-DD'),
            array;
        $.ajax({
            url: '/insert_newtask',
            type: 'POST',
            data: {day: day,
                   sortid: sort_id
                  },
            dataType: "text",
            timeout: 30000
        }).done(function (res) {
            console.log(res);
            if (res === NO_DATA) {
                $("#index_error").html('タスクの追加失敗');
            } else {
                array = res.split(',');
                JSVIEW.addTask(array);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    updateSortId: function() {
        let list = $('#task_list').children(),
            len = list.length,
            taskid_list = [],
            sortid_list = [];
        for (let i = 0; i < len; i++) {
            taskid_list.push(list[i].getAttribute('data-id'));
            sortid_list.push(list[i].getAttribute('data-sort'));
        }
        $.ajax({
            url: '/update_sortid',
            type: 'POST',
            data: {taskid: taskid_list.join('-'),
                   sortid: sortid_list.join('-'),
                   num: len
                  },
            dataType: "text",
            timeout: 30000
        }).done(function (res) {
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    updateDay: function(task_id, day) {
        $.ajax({
            url: '/update_day',
            type: 'POST',
            data: {taskid: task_id,
                   day: day
                  },
            dataType: "text",
            timeout: 30000
        }).done(function (res) {
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    updateMessage: function(task_id, message) {
        $.ajax({
            url: '/update_message',
            type: 'POST',
            data: {taskid: task_id,
                   message: message
                  },
            dataType: "text",
            timeout: 30000
        }).done(function (res) {
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    updateTime: function(task_id, time) {
        $.ajax({
            url: '/update_time',
            type: 'POST',
            data: {taskid: task_id,
                   time: time
                  },
            dataType: "text",
            timeout: 30000
        }).done(function (res) {
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
}