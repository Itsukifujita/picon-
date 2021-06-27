let result = false;
$(function(){
    JSMOVE.moveIndexLoginCheck();
    $(document).on('click', '.add_task_comment', function () {
        $('#task_list').html('<li class="task"><input type="text" class="task_content"></li>')
    });
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
    $(document).on('change', '#i', function () {
        
    });
    $(document).on('blur', '.input_text', function () {
        let t = $(this).val().replace(/ /g, ''),
            te = t.replace(/　/g, ''),
            tex = te.replace(/,/g, ''),
            text = tex.replace(/、/g, '');
        $(this).val(text);
    });
});

