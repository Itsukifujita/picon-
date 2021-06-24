const JSGET = {
    getLoginUserId: function() {
        console.log({name: $('#input_login_name').val(), pass: $('#input_login_pass').val()});
        $.ajax({
            url: '/login_member',
            type: 'POST',
            data: {name: $('#input_login_name').val(),
                   pass: $('#input_login_pass').val()
                  },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            timeout: 30000
        }).done(function (res) {
            console.log(res);
            if (res === '0') {
                JSVIEW.viewLoginError();
            } else {
                
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },
    getEntryUserId: function() {
        $.ajax({
            url: '/entry_member',
            type: 'POST',
            data: {name: $('#input_entry_name').val(),
                   pass: $('#input_entry_pass').val()
                  },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            timeout: 30000
        }).done(function (res) {
            console.log(res);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
}