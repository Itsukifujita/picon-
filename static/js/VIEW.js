const JSVIEW = {
    viewLoginError: function() {
        $('#login_error_message').html('ログインに失敗しました');
    },
    createTask: function(res){
        let html = ``,
            len = res.length;
        for (let i = 0; i < len; i++) {
            html += `<li class="task" data-id="${res[i][0]}">`
                  +     `<input type="text" name="task_name" class="task_detail">`
                  +     `<input type="date" class="task_date">`
                  +     JSVIEW.createSelectDay()
                  +     `<option value="rei">00</option>`
               + `<option value="ich">01</option>`
               + `<option value="nii">02</option>`
               + `<option value="san">03</option>`
               + `<option value="sii">04</option>`
            + `<option value="goo">05</option>`
            + `<option value="rok">06</option>`
            + `<option value="sit">07</option>`
            + `<option value="hat">08</option>`
            + `<option value="kuu">09</option>`
            + `<option value="juu">10</option>`
            + `<option value="jui">11</option>`
            + `<option value="jun">12</option>`
            + `<option value="jus">13</option>`
            + `<option value="juy">14</option>`
            + `<option value="jug">15</option>`
            + `<option value="jur">16</option>`
            + `<option value="jna">17</option>`
            + `<option value="juh">18</option>`
            + `<option value="juk">19</option>`
            + `<option value="nij">20</option>`
            + `<option value="nji">21</option>`
            + `<option value="njn">22</option>`
            + `<option value="njs">23</option>`
            + `<option value="njy">24</option>`
            + `</select>` 
            + `<select>`
            + `<option value="zer">00</option>`
            + `<option value="qua">15</option>`
            + `<option value="hal">30</option>`
            + `<option value="thr">45</option>`
            + `</select>`;
        
            $('#task_list').html('<li class="task"><input type="text" class="task_content"></li>')
        }
    },
    createNoTask: function() {
        
    },
    createSelectDay: function() {
        let html = `<select class="task_select_day">`,
            array = ['毎日', '毎週月曜日', '毎週火曜日', '毎週水曜日', '毎週木曜日', '毎週金曜日', '毎週土曜日', '毎週日曜日'];
        for (let i in array) {
            html += `<option value="${i}">${array[i]}</option>`
        }
        html += `</select>`;
        return html;
    },
    createSelectHour: function() {
        
    },
    createSelectMinuites: function() {
        
    }
};