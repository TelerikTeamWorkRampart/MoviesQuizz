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

view.draw();

function newGame() {
    var i,
        movs = []; // future array of prommisses
    game = gameTimelineModel.init(player('STOYAN', 23, 12, 2, 3, 4, 1));
    for (i = 0; i < 3; i++) {
        movs.push(movieGenerator.getMovie());
    }

    gameView.showLoadingImage('New Game');
    Promise.all(movs)
        .then(function (movsArr) {
            game.gameboardMovies.push(movsArr[0]); //adding the first on the board
            movsArr.splice(0, 1);
            _.each(movsArr, function (el) {
                game.movies.push(el);
            });
        })
        .then(function () {
            gameboardTimelineView.draw(game.gameboardMovies[0], game.movies[0]);
        });
}

function authEventHandler(input) {
    switch (input.auth) {
        case 'register':
            console.log(input);
            var attrs = {
                Email: input.username + '@telerik.com',
                DisplayName: input.username
            };
            dataBase.register(input.username, input.password, attrs).then(function (data) {
                view.showMessage('You have successfully registered!', 'success');
            }, function (error) {
                view.showMessage(error.message, 'warning');
            });

            break;
        case 'login':
            dataBase.login(input.username, input.password).then(function (data) {
                if (data.hasOwnProperty('result')) {
                    // this method accepts JSON object and shows all of its properties by key->value pairs
                    // must have property "name"
                    authView.showPlayerInfo({name: 'Ivan', games: 5});
                }
            }, function (error) {
                view.showMessage(error.message, 'warning');
            });

            break;
    }
}

// this is for testing purposes only
function showView(pageIndex) {
    switch (pageIndex) {
        case "2":
            newGame();
            //gameView.draw(game.gameboardMovies, game.movies[0]);
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
                    scoreView.draw(highScore); //highScore is returned asynch from the previous call to the model
                })

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
                console.log(error);
                view.showMessage(error.message, 'warning');
            });

            break;
    }
}

view.registerClickCallback(showView);
authView.registerClickCallback(authEventHandler);


