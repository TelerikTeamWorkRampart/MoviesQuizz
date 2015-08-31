import 'jquery';
import {view} from 'scripts/view';

// information about current player, score and game progress
var scoreboardView = (function () {
    var scoreboardViewInternal = Object.create(view);

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

                $.each(highScoreData, function (i, v) {
                    var $tableRow = $('<tr />').attr('colspan', 3);
                    var $playerName = $('<td />').text(v.playerName);
                    var $playerHighScore = $('<td />').text(v.playerHighScore);
                    var $playerGames = $('<td />').text(v.playerGames);

                    $tableRow
                        .append($playerName)
                        .append($playerHighScore)
                        .append($playerGames);

                    rows.push($tableRow);
                });

                //for (var i = 0; i < highScoreData.length; i++) {
                //    var $tableRow = $('<tr />').attr('colspan', 3);
                //    var $playerName = $('<td />').text(highScoreData[i].playerName);
                //    var $playerHighScore = $('<td />').text(highScoreData[i].playerHighScore);
                //    var $playerGames = $('<td />').text(highScoreData[i].playerGames);
                //
                //    $tableRow
                //        .append($playerName)
                //        .append($playerHighScore)
                //        .append($playerGames);
                //
                //    rows.push($tableRow);
                //}

                $highScoreTable.append(rows);

                $container
                    .find('div.gameBoard')
                    .empty()
                    .append($contentTitle)
                    .append($highScoreTable);
            }
        }
    });

    return scoreboardViewInternal;
})();

export {scoreboardView};