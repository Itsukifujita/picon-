$(function(){
    JSMOVE.moveIndexLogin();
    $(document).on('click', '.add_task_comment', function () {
        $('#task_list').html('<li class="task"><input type="text" class="task_content"></li>')
        
    });
    $(document).on('click', '#login_button', function () {
        JSGET.getLoginUserId();
    });
    $(document).on('click', '#entry_button', function () {
        JSGET.getEntryUserId();
    });
    
});

