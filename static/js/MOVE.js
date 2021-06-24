const JSMOVE = {
    moveIndexLogin: function() {
        if ($('#task_list')[0]) {
            let res = JSGET.getUserTask();
            JSVIEW.createTask(res);
        }
    }
};