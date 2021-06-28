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
    },
    moveJudgmentDate: function(date) {
        switch (date) {
            case DAY.EVERY:
            case DAY.MON:
            case DAY.TUE:
            case DAY.WED:
            case DAY.THU:
            case DAY.FRI:
            case DAY.SAT:
            case DAY.SUN:
                return JSMOVE.moveConvertDate(new Date(), 'YYYY-MM-DD');
                break;
            default:
                return JSMOVE.moveConvertDate(date, 'YYYY-MM-DD');
                break;
        }
    },
    moveConvertDate: function(beforeDate, format = 'YYYY年M月D日') {
        const func = {
            _padding: function (str) {
                return ('0' + str).slice(-2);
            }
        },
        date = new Date(beforeDate);
        format = format.replace(/YYYY/g, date.getFullYear());
        format = format.replace(/YY/g, func._padding(date.getFullYear()));
        format = format.replace(/MM/g, func._padding((date.getMonth() + 1)));
        format = format.replace(/M/g, (date.getMonth() + 1));
        format = format.replace(/DD/g, func._padding(date.getDate()));
        format = format.replace(/D/g, date.getDate());
        format = format.replace(/hh/g, func._padding(date.getHours()));
        format = format.replace(/h/g, date.getHours());
        format = format.replace(/mm/g, func._padding(date.getMinutes()));
        format = format.replace(/m/g, date.getMinutes());
        format = format.replace(/ss/g, func._padding(date.getSeconds()));
        format = format.replace(/s/g, date.getSeconds());
        return format;
    },
    moveHideDayContent: function(task_id, day) {
        let target_list = $('.task'),
            len = target_list.length,
            target;
        for (let i = 0; i < len; i++) {
            if (task_id === target_list[i].getAttribute('data-id')) {
                target = target_list[i];
            }
        }
        switch (day) {
            case DAY.EVERY:
            case DAY.MON:
            case DAY.TUE:
            case DAY.WED:
            case DAY.THU:
            case DAY.FRI:
            case DAY.SAT:
            case DAY.SUN:
                target.children[2].style.display = "none";
                break;
            default:
                target.children[3].style.display = "none";
                break;
        }
    },
    moveSorttable: function() {
        $('#task_list').sortable({
            placeholder: 'ui-placeholder',
            cursor: 'move',
            start: function (e, ui) {
                $(ui.helper).addClass('ui-boxshadow');
            },
            stop: function (e, ui) {
                $(ui.item).removeClass('ui-boxshadow');
                JSMOVE.moveSortTask();
                JSGET.updateSortId();
            }
        });
    },
    moveSortTask: function() {
        let list = $('#task_list').children(),
            len = list.length;
        for (let i = 0; i < len; i++) {
            list[i].setAttribute('data-sort', String(i + 1));
        }
    }
};