import {gameTimelineModel} from 'scripts/gameTimelineModel';
import {player} from 'scripts/player';
import {movie} from 'scripts/movie';
import {globalView} from 'scripts/globalView';
import {gameboardTimelineView} from 'scripts/gameboardTimelineView';
import {loginView} from 'scripts/loginView';
import {scoreboardView} from 'scripts/scoreboardView';
import {dataBase} from 'scripts/dataBase';
import {movieGenerator} from 'scripts/movieGenerator';
import _ from 'underscore';

var game;
var view = globalView;
var gameView = gameboardTimelineView;
var scoreView = scoreboardView;
var authView = loginView;

// for scoreboardView
function getHighScores() {
    var hs = [];

    return hs
}

view.draw();

//Movie generator test
// movieGenerator.getMovie()
//     .then(function (newMovie) {
//         //console.log('New movie equals to ' + newMovie.title);
//     })

function newGame() {
    var i,
        movs = []; // future array of prommisses
    game = gameTimelineModel.init(player('STOYAN', 23, 12, 2, 3, 4, 1));
    for (i = 0; i < 3; i++) {
        movs.push(movieGenerator.getMovie());
    }

    view.showLoadingImage('New Game');
    Promise.all(movs)
        .then(function (movsArr) {
            game.gameboardMovies.push(movsArr[0]); //adding the first on the board
            movsArr.splice(0, 1);
            _.each(movsArr, function (el) {
                game.movies.push(el);
            });
        })
        .then(function () {
            gameView.draw(game.gameboardMovies[0], game.movies[0]);
        });
}

function authClickedEventHandler(input) {
    switch (input.auth) {
        case 'register':
            var attrs = {
                Email: input.username + '@telerik.com',
                DisplayName: input.username
            };
            dataBase.register(input.username, input.password, attrs)
                .then(function (data) {
                    view.showMessage('You have successfully registered!', 'success');
                }, function (error) {
                    view.showMessage(error.message, 'warning');
                });

            break;
        case 'login':
            dataBase.login(input.username, input.password)
                .then(function (data) {
                    if (data.hasOwnProperty('result')) {
                        authView.showPlayerInfo({name: 'Ivan', games: 5});
                    }
                }, function (error) {
                    view.showMessage(error.message, 'warning');
                });

            break;
    }
}

function showView(pageIndex) {
    switch (pageIndex) {
        case "2":
            newGame();

            break;
        case "3":
            if (typeof(window.$) === 'undefined') {
                alert('jQuery not loaded!');
             }
            $('.gameBoard').load('/resources/instructions.html');
            
            break;    
        case "4":
            scoreView.showLoadingImage('Score Board');

            dataBase.getAllPlayersSortedByTotalTimeLineScore()
                .then(function (res) {
                    var highScore = [];
                    res = res.result;
                    _.each(res, function (el) {
                        highScore.push({
                            playerName: el.Name,
                            playerHighScore: el.TotalTimelineScore,
                            playerGames: el.TimelineGamesCount
                        });
                    });
                    return highScore;
                })
                .then(function (highScore) {
                    scoreView.draw(highScore);
                });

            break;
        case "6":
            authView.showLoginForm();

            break;
        case "7":
            authView.showRegisterForm();

            break;
        case "8":
            view.showLoadingImage('Logout');

            dataBase.logout().then(function () {
                view.showMessage('Successfully logged out!', 'success');
            }, function (error) {
                view.showMessage(error.message, 'warning');
            });

            break;
    }
}

function timeLineClickedEventHandler(button) {
    switch (button) {
        case 'Prev':
            console.log('Prev button clicked');
            break;
        case 'Next':
            console.log('Next button clickedS');
            break;
    }
}


view.registerClickCallback(showView);
authView.registerClickCallback(authClickedEventHandler);
gameView.registerClickCallback(timeLineClickedEventHandler);


