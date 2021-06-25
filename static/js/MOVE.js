const JSMOVE = {
    moveIndexLoginCheck: function() {
        if ($('#task_list')[0]) {
            JSMOVE.moveLoadTaskList();
        }
    },
    moveLoadTaskList: function() {
        let count = 0;
        JSGET.getUserTask();
        check = setInterval(function() {
            if (result) {
                clearInterval(check);
                JSGET.getLineId();
                if (result === NO_DATA) {
                    JSVIEW.createNoTask();
                } else {
                    JSVIEW.createTask(result);
                }
            }
            count++;
            if (count === 300) {
                clearInterval(check);
                $('#index_error').html('データ読み込み失敗（タイムアウト）');
            }
        }, 100);
    },
    moveMakeTaskData: function(res) {
        let array,
            len,
            task_list = [];
        if (res === NO_DATA) {
            result = NO_DATA;
        } else {
            array = res.split('#');
            len = array.length - 1;
            for (let i = 0; i < len; i++) {
                task_list.push(array[i].split(','));
            }
            result = task_list;
        }
    }
};