$(function(){
    $(document).on('click', '.add_task_comment', function () {
        
    });
    $(document).on('click', '#login_button', function () {
        JSGET.getLoginUserId();
    });
    $(document).on('click', '#entry_button', function () {
        JSGET.getEntryUserId();
    });
    
});

