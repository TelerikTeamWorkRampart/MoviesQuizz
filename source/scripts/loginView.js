import 'jquery';

// information about current player, score and game progress
var loginView = (function () {
    var loginViewInternal = Object.create({});

    Object.defineProperties(loginViewInternal, {
        showLoginForm: {
            value: function () {
                var $container = $('.container');

                var $formTitle = $('<h2 />').text('Login');

                var $formContainer = $('<form >').attr('role', 'form');
                var $formGroupUser = $('<div />').addClass('form-group');
                var $formGroupPassword = $('<div />').addClass('form-group');

                var $checkBoxContainer = $('<div />').addClass('checkbox');
                var $checkBoxLabel = $('<label />');
                var $checkBoxControl = $('<input />').attr('type', 'checkbox');

                var $submitButton = $('<button />').attr('type', 'submit').attr('data-for', 'login').addClass('btn btn-default').text('Submit');

                $formGroupUser.append($('<label />').attr('for', 'username').text('Username:'));
                $formGroupUser.append($('<input />').attr('type', 'text').attr('id', 'username').addClass('form-control'));

                $formGroupPassword.append($('<label />').attr('for', 'password').text('Password:'));
                $formGroupPassword.append($('<input />').attr('type', 'password').attr('id', 'password').addClass('form-control'));

                $checkBoxLabel
                    .append($checkBoxControl)
                    .append(' Remember me');
                $checkBoxContainer.append($checkBoxLabel);

                $formContainer
                    .append($formGroupUser)
                    .append($formGroupPassword)
                    .append($checkBoxContainer)
                    .append($submitButton);

                $container
                    .find('div.gameBoard')
                    .empty()
                    .append($formTitle)
                    .append($formContainer);
            }
        },
        showRegisterForm: {
            value: function () {
                var $container = $('.container');

                var $formTitle = $('<h2 />').text('Register');

                var $formContainer = $('<form >').attr('role', 'form');
                var $formGroupUser = $('<div />').addClass('form-group');
                var $formGroupPassword = $('<div />').addClass('form-group');

                var $submitButton = $('<button />').attr('type', 'submit').attr('data-for', 'register').addClass('btn btn-default').text('Submit');

                $formGroupUser.append($('<label />').attr('for', 'username').text('Username:'));
                $formGroupUser.append($('<input />').attr('type', 'text').attr('id', 'username').addClass('form-control'));

                $formGroupPassword.append($('<label />').attr('for', 'password').text('Password:'));
                $formGroupPassword.append($('<input />').attr('type', 'password').attr('id', 'password').addClass('form-control'));

                $formContainer
                    .append($formGroupUser)
                    .append($formGroupPassword)
                    .append($submitButton);

                $container
                    .find('div.gameBoard')
                    .empty()
                    .append($formTitle)
                    .append($formContainer);
            }
        },
        showPlayerInfo: {
            value: function (player) {
                var $container = $('.container');

                var $contentTitle = $('<h2 />').text('Player Information');

                var $panelContainer = $('<div />')
                    .addClass('panel')
                    .addClass('panel-info');
                var $panelTitle = $('<div />')
                    .addClass('panel-heading')
                    .text(player.name);
                var $panelBody = $('<div />').addClass('panel-body');

                var $playerData = $('<ul />');

                $.each(player, function (k, v) {
                    if (k.toLowerCase() === 'name') {
                        return;
                    }

                    var $key = $('<span />')
                        .css({'width': '100px', 'display': 'inline-block', 'text-transform': 'capitalize'})
                        .text(k);
                    var $value = $('<span />')
                        .addClass('label')
                        .addClass('label-info')
                        .text(v);

                    $playerData.append($('<li />')
                        .append($key)
                        .append($value));
                });

                $panelBody.append($playerData);
                $panelContainer
                    .append($panelTitle)
                    .append($panelBody);

                $container
                    .find('div.gameBoard')
                    .empty()
                    .append($contentTitle)
                    .append($panelContainer);
            }
        },
        registerClickCallback: {
            value: function (callback) {
                document.addEventListener('mousedown', function (ev) {
                    if (ev.buttons === 1 && ev.target.nodeName === 'BUTTON') {
                        var username = $('#username').val();
                        var password = $('#password').val();
                        var method = $('button').attr('data-for');

                        var auth = {
                            auth: method,
                            username: username,
                            password: password
                        };

                        callback(auth);
                    }
                }, false);
            }
        }
    });

    return loginViewInternal;
})();

export {loginView};
