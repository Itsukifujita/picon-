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
            if (String(res) === '0') {
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
    getEntryUserId: function() {
        $.ajax({
            url: '/entry_member',
            type: 'POST',
            data: {name: $('#entry_login_name').val(),
                   pass: $('#entry_login_pass').val()
                  },
            dataType: "json",
            timeout: 30000
        }).done(function (res) {
            if (String(res) === '0') {
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
            url: '/entry_member',
            type: 'POST',
            data: {name: $('#entry_login_name').val(),
                   pass: $('#entry_login_pass').val()
                  },
            dataType: "json",
            timeout: 30000
        }).done(function (res) {
            return res;
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
}