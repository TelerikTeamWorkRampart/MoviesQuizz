import 'jquery';

// information about current player, score and game progress
var scoreboardView = (function () {
    var scoreboardViewInternal = Object.create({});

    Object.defineProperties(scoreboardViewInternal, {
        draw: {
            value: function (highScoreData) {
                var $container = $('.container');
                var $contentTitle = $('<h2 />').text('Score Board');

                var $highScoreTable = $('<table />').addClass('table');
                var $headerRow = $('<tr />')
                    .append($('<th />').text('Player Name'))
                    .append($('<th />').text('Player High Score'))
                    .append($('<th />').text('Player Games'));

                $highScoreTable.append($headerRow);

                var rows = [];

                for (var i = 0; i < highScoreData.length; i++) {
                    var $tableRow = $('<tr />').attr('colspan', 3);
                    var $playerName = $('<td />').text(highScoreData[i].playerName);
                    var $playerHighScore = $('<td />').text(highScoreData[i].playerHighScore);
                    var $playerGames = $('<td />').text(highScoreData[i].playerGames);

                    $tableRow
                        .append($playerName)
                        .append($playerHighScore)
                        .append($playerGames);

                    rows.push($tableRow);
                }

                $highScoreTable.append(rows);

                $container
                    .find('div.gameBoard')
                    .empty()
                    .append($contentTitle)
                    .append($highScoreTable);
            }
        },
        registerClickCallback: {
            value: function (callback) {
                document.addEventListener('mousedown', function (ev) {
                    if (ev.buttons === 1 && ev.target.nodeName === 'A') {
                        var link = $(ev.target);
                        var pageIndex = $(link).attr('data-id');
                        var activeItem = $(link).parent();

                        clearActiveItem();
                        setActiveItem(activeItem);

                        callback(pageIndex);
                    }
                }, false);
            }
        }
    });

    return scoreboardViewInternal;
})();

export {scoreboardView};