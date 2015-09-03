import {gameTimelineModel} from 'scripts/gameTimelineModel';
import {player} from 'scripts/player';
import {movie} from 'scripts/movie';
import {globalView} from 'scripts/globalView';
import {homeView} from 'scripts/homeView';
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
homeView.draw();

//Movie generator test
// movieGenerator.getMovie()
//     .then(function (newMovie) {
//         //console.log('New movie equals to ' + newMovie.title);
//     })

function newGame() {
    var i,
        movs = []; // future array of prommisses



    view.showLoadingImage('New Game');
    dataBase.getCurrentUser()
        .then(function(user){
            var usr;
            if(user === null){
                usr = 'guest';
            } else {
                usr = user.result
            }
            game = gameTimelineModel.init(usr);
        })
        .then(function(){
            for (i = 0; i < 5; i++) {
                movs.push(movieGenerator.getMovie());
            }
            Promise.all(movs)
                .then(function (movsArr) {
                    game.gameboardMovies.push(movsArr[0]); //adding the first on the board
                    movsArr.splice(0, 1);
                    _.each(movsArr, function (el) {
                        game.movies.push(el);
                    });
                })
                .then(function () {
                    gameView.draw(game.gameboardMovies, game.movies[0], game.score);
            });
        })
}

function pullMovies(count){
    var i = 0,
        newMovies = [];
    for (i = 0; i < count; i++) {
        movieGenerator.getMovie()
            .then(function(mov){
                game.movies.push(mov);
                console.log('movie added');
            })
    };
}

function timelineClick(button){
    var prev = game.gameboardMovies[button - 1] || null;
    var next = game.gameboardMovies[button] || null;
    var current = (JSON.parse(JSON.stringify(game.movies[0]))); //deep clone
    if ((!prev && next.year >= current.year)
        || (prev.year <= current.year && !next)
        || (prev.year <= current.year && next.year >= current.year)){
        //SUCCESS LOGIC GOES HERE
        game.score += 10;
        game.gameboardMovies.splice(button, 0, current);
        game.movies.splice(0, 1);
        gameView.draw(game.gameboardMovies, game.movies[0], game.score);
        gameView.blink(true);
    } else {
        //fAIL LOGIC GOES HERE
        game.score -= 10;
        game.movies.splice(0, 1);
        gameView.draw(game.gameboardMovies, game.movies[0], game.score);
        gameView.blink(false);
    }

    if(game.movies.length < 5){
        pullMovies(3);
    }
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
                        view.userUpdate(input.username);
                    }
                }, function (error) {
                    view.showMessage(error.message, 'warning');
                });

            break;
    }
}

function showView(pageIndex) {
    switch (pageIndex) {
        case "1":
            homeView.draw();

            break;
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
                view.userUpdate('guest');
            }, function (error) {
                view.showMessage(error.message, 'warning');
            });
            break;
    }
}

function timeLineClickedEventHandler(button) {
    timelineClick(button);
}


view.registerClickCallback(showView);
authView.registerClickCallback(authClickedEventHandler);
gameView.registerClickCallback(timeLineClickedEventHandler);


