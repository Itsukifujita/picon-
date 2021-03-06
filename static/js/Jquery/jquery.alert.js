// jQuery Alert Dialogs Plugin
//
// Version 1.0
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 29 December 2008
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
//
// History:
//
//		1.00 - Released (29 December 2008)
//
// License:
//
//		This plugin is licensed under the GNU General Public License: http://www.gnu.org/licenses/gpl.html
//
// 2019/10/31 jError    メソッド追加
//            jMessage  メソッド追加
//            jAlert    callback指定すると、Cancelボタンが付加される。callback指定がなければOKのみ。
//                      「alertだけど、確認して処理に進みたい」場合に使える？
// 2020/09/04 jModal    メソッド追加
//            jClose    メソッド追加

(function($) {

	$.alerts = {

		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs

		// Public methods

		alert: function(message, title, callback) {
			if (typeof title === 'undefined') title = '警告';
			$.alerts._show(title, message, null, 'alert', function(result) {
				if (callback) callback(result);
			});
		},

		confirm: function(message, title, callback) {
			if (typeof title === 'undefined') title = '確認';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if (callback) callback(result);
			});
		},

		prompt: function(message, value, title, callback) {
			if (typeof title === 'undefined') title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if (callback) callback(result);
			});
		},

        error: function(message, title, callback) {
            if (typeof title === 'undefined') title = 'エラー';
            $.alerts._show(title, message, null, 'error', function(result) {
                if (callback) callback(result);
            });
        },

        message: function(message, title, callback) {
            if (typeof title === 'undefined') title = '確認';
            $.alerts._show(title, message, null, 'message', function(result) {
                if (callback) callback(result);
            });
        },

        modal: function(html, title, callback) {
            if (typeof title === 'undefined') title = '';
            $.alerts._show(title, html, null, 'modal', function(result) {
                if (callback) callback(result);
            });
        },

		// Private methods

		_show: function(title, msg, value, type, callback) {

			$.alerts._hide();
			$.alerts._overlay('show');

			$('BODY').append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');

			if ($.alerts.dialogClass) $('#popup_container').addClass($.alerts.dialogClass);

			$('#popup_container').css({
				position: 'fixed',
				zIndex: 99999,
				padding: 0,
				margin: 0
			});

			$('#popup_title').html(title);
			$('#popup_content').addClass(type);
			$('#popup_message').text(msg);
			$('#popup_message').html($('#popup_message').text().replace(/\n/g, '<br />'));

			$('#popup_container').css({
				minWidth: $('#popup_container').outerWidth(),
				maxWidth: $('#popup_container').outerWidth()
			});

			$.alerts._reposition();
			$.alerts._maintainPosition(true);

			switch (type) {
				case 'alert':
                    if (callback) {
                        $.alerts._createButtonOKCancel(callback);
                    } else {
                        $.alerts._createButtonOKonly(callback);
                    }
                    break;
                case 'error':
                case 'message':
                    $.alerts._createButtonOKonly(callback);
                    break;
				case 'confirm':
                    $.alerts._createButtonOKCancel(callback);
                    break;
				case 'prompt':
					$('#popup_message').append('<br /><input type="text" size="30" id="popup_prompt" />').after(`<div id="popup_panel"><input type="button" value="${$.alerts.okButton}" id="popup_ok" /> <input type="button" value="${$.alerts.cancelButton}" id="popup_cancel" /></div>`);
					$('#popup_prompt').width($("#popup_message").width());
					$('#popup_ok').click( function() {
						let val = $('#popup_prompt').val();
						$.alerts._hide();
						if (callback) callback(val);
					});
					$('#popup_cancel').click( function() {
						$.alerts._hide();
						if (callback) callback(null);
					});
					$('#popup_prompt, #popup_ok, #popup_cancel').keypress( function(e) {
						if (e.keyCode === 13) $('#popup_ok').trigger('click');
						if (e.keyCode === 27) $('#popup_cancel').trigger('click');
					});
					if (value) $('#popup_prompt').val(value);
					$('#popup_prompt').focus().select();
                    break;
                case 'modal':
                    break;
			}

			// Make draggable
			if ($.alerts.draggable) {
				try {
					$('#popup_container').draggable({handle: $('#popup_title')});
					$('#popup_title').css({cursor: 'move'});
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},

		_hide: function() {
			$('#popup_container').remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},

		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$('BODY').append('<div id="popup_overlay"></div>');
					$('#popup_overlay').css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
                    break;
				case 'hide':
					$('#popup_overlay').remove();
                    break;
			}
		},

		_reposition: function() {
			let top = (($(window).height() / 2) - ($('#popup_container').outerHeight() / 2)) + $.alerts.verticalOffset,
                left = (($(window).width() / 2) - ($('#popup_container').outerWidth() / 2)) + $.alerts.horizontalOffset;
			if (top < 0) top = 0;
			if (left < 0) left = 0;

			$('#popup_container').css({
				top: top + 'px',
				left: left + 'px'
			});
			$('#popup_overlay').height($(document).height());
		},

		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', function() {
							$.alerts._reposition();
						});
                        break;
					case false:
						$(window).unbind('resize');
                        break;
				}
			}
		},

        _createButtonOKonly: function(callback) {
            $('#popup_message').after(`<div id="popup_panel"><input type="button" value="${$.alerts.okButton}" id="popup_ok" /></div>`);
            $('#popup_ok').click( function() {
                $.alerts._hide();
                callback(true);
            });
            $('#popup_ok').focus().keypress( function(e) {
                if( e.keyCode === 13 || e.keyCode === 27 ) $('#popup_ok').trigger('click');
            });
        },

        _createButtonOKCancel: function(callback) {
            $('#popup_message').after(`<div id="popup_panel"><input type="button" value="${$.alerts.okButton}" id="popup_ok" /> <input type="button" value="${$.alerts.cancelButton}" id="popup_cancel" /></div>`);
            $('#popup_ok').click( function() {
                $.alerts._hide();
                if (callback) callback(true);
            });
            $('#popup_cancel').click( function() {
                $.alerts._hide();
                if (callback) callback(false);
            });
            $('#popup_ok').focus();
            $('#popup_ok, #popup_cancel').keypress( function(e) {
                if (e.keyCode === 13) $('#popup_ok').trigger('click');
                if (e.keyCode === 27) $('#popup_cancel').trigger('click');
            });
        }

	};

	// Shortuct functions
	jAlert = function (message, title, callback) {
		$.alerts.alert(message, title, callback);
	};

	jConfirm = function (message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};

    jError = function (message, title, callback) {
        $.alerts.error(message, title, callback);
    };

	jPrompt = function (message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};

    jMessage = function (message, title, callback) {
        $.alerts.message(message, title, callback);
    };

    jModal = function (html, title, callback) {
        $.alerts.modal(html, title, callback);
    };

    jClose = function () {
        $.alerts._hide();
    };

})(jQuery);