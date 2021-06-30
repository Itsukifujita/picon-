let result = false;
$(function(){
    JSMOVE.moveIndexLoginCheck();
    //ログイン処理
    $(document).on('click', '#login_button', function () {
        JSGET.getLoginUserId();
    });
    $(document).on('click', '#entry_button', function () {
        let name = $('#entry_login_name').val(),
            pass = $('#entry_login_pass').val();
        if (name.length === 0 || pass.length === 0) {
            $('#entry_error_message').html('名前とパスワードを入力してください');
        } else {
            JSGET.getEntryUserId(name, pass);
        }
    });
    //ログイン時テキストチェック
    $(document).on('blur', '.input_text', function () {
        let t = $(this).val().replace(/ /g, ''),
            te = t.replace(/　/g, ''),
            tex = te.replace(/,/g, ''),
            text = tex.replace(/、/g, '');
        $(this).val(text);
    });
    //タスクの追加
    $(document).on('click', '.add_task_comment', function () {
        let no_task = $('.no_task').length,
            sort_id = 1;
        if (no_task === 1) {
            $('#task_list').html(``);
        } else {
            sort_id = $('.task').length + 1;
        }
        JSGET.insertNewTask(sort_id);
    });
    //タスクの編集
    $(document).on('click', '.chenge_day', function () {
        let target = $(this).parent().children(),
            task_id = $(this).parent()[0].getAttribute('data-id'),
            day;
        if (target[2].style.display === 'none') {
            target[2].style.display = '';
            target[3].style.display = 'none';
            day = target[2].value;
        } else {
            target[2].style.display = 'none';
            target[3].style.display = '';
            day = target[3].value;
        }
        JSGET.updateDay(task_id, day);
    });
    $(document).on('change', '.task_detail', function () {
        let task_id = $(this).parent()[0].getAttribute('data-id'),
            t = $(this).val().replace(/ /g, ''),
            te = t.replace(/　/g, ''),
            tex = te.replace(/,/g, ''),
            text = tex.replace(/、/g, '');
        $(this).val(text);
        JSGET.updateMessage(task_id, text);
    });
    $(document).on('change', '.task_date', function () {
        let task_id = $(this).parent()[0].getAttribute('data-id'),
            day = $(this).val();
        JSGET.updateDay(task_id, day);
    });
    $(document).on('change', '.task_select_day', function () {
        let task_id = $(this).parent()[0].getAttribute('data-id'),
            day = $(this).val();
        JSGET.updateDay(task_id, day);
    });
    $(document).on('change', '.task_select_hour', function () {
        let target = $(this).parent().children(),
            task_id = $(this).parent()[0].getAttribute('data-id'),
            time = target[4].value + ':' + target[5].value
        JSGET.updateTime(task_id, time);
    });
    $(document).on('change', '.task_select_minutes', function () {
        let target = $(this).parent().children(),
            task_id = $(this).parent()[0].getAttribute('data-id'),
            time = target[4].value + ':' + target[5].value
        JSGET.updateTime(task_id, time);
    });
});

