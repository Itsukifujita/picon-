const JSGET = {
    getUserId: function() {
        console.log($('#input_login_name').val());
        console.log($('#input_login_pass').val());
        debugger;
        $.ajax({
            url: '/login_member',
            type: 'POST',
            data: {value: $('#input_login_name').val(),
                   mode: MODE.RENEWAL
                  },
            contentType: 'application/json',
            async: true,
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