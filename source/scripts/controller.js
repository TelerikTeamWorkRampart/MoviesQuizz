import {gameTimelineModel} from 'scripts/gameTimelineModel';
import {player} from 'scripts/player';
import {movie} from 'scripts/movie';
import {globalView} from 'scripts/globalView';
import {homeView} from 'scripts/homeView';
import {creditsView} from 'scripts/creditsView';
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
var gameLength = 4;
var movieGen;

// for scoreboardView
function getHighScores() {
    var hs = [];

    return hs
}

view.draw();
homeView.draw();

//Movie generator test
// movieGen.getMovie()
//     .then(function (newMovie) {
//         //console.log('New movie equals to ' + newMovie.title);
//     })

function newGame() {
    var i,
        movs = []; // future array of prommisses

    movieGen  = movieGenerator.init();

    view.showLoadingImage('New Game');
    dataBase.getCurrentUser()
        .then(function (user) {
            var usr;
            if (user === null) {
                usr = 'guest';
            } else {
                usr = user.result
            }

            game = gameTimelineModel.init(usr);
        })
        .then(function () {
            for (i = 0; i < 5; i++) {
                movs.push(movieGen.getMovie());
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
                    gameView.draw(game.gameboardMovies, game.movies[0], game.score, game.progress, gameLength);
                });
        })
}

function pullMovies(count) {
    var i = 0,
        newMovies = [];
    for (i = 0; i < count; i++) {
        movieGen.getMovie()
            .then(function (mov) {
                game.movies.push(mov);
                console.log('movie added');
            })
    }
}

function endGame(player, score){
    if(player){
        player = player.Username;
    } else {
        player = 'Guest';
    }
    
    dataBase.getCurrentPlayerByName()
    .then(function(user){
        dataBase.update((user.result[0].TotalTimelineScore+score),0,user.result[0].TimelineGamesCount+1,0,0,0);
    });
    gameView.endGame(player, score);
}

function timelineClick(button) {
    var prev
    if(button > 0){
        prev = game.gameboardMovies[button - 1];
    } else {
        prev = null;
    }

    var next;
    if(button <= game.movies.length){
        next = game.gameboardMovies[button];
    } else {
        next = null;
    }

    var current = (JSON.parse(JSON.stringify(game.movies[0]))); //deep clone
    if ((!prev && next.year >= current.year)
        || (prev.year <= current.year && !next)
        || (prev.year <= current.year && next.year >= current.year)) {
        //SUCCESS LOGIC GOES HERE
        game.score += 10;
        game.gameboardMovies.splice(button, 0, current);
        game.movies.splice(0, 1);
        game.progress ++;
        gameView.draw(game.gameboardMovies, game.movies[0], game.score, game.progress, gameLength);
        gameView.blink(true);
        if(game.progress === gameLength){
            endGame(game.player, game.score);
        }
    } else {
        //fAIL LOGIC GOES HERE
        game.score -= 10;
        game.movies.splice(0, 1);
        gameView.draw(game.gameboardMovies, game.movies[0], game.score, game.progress, gameLength);
        gameView.blink(false);
    }

    if (game.movies.length < 5) {
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
                        dataBase.getCurrentUser().then(function (data) {
                            var userDetails = {
                                name: data.result.Username,
                                registerDate: data.result.CreatedAt.toString()
                            };
                            authView.showPlayerInfo(userDetails);
                            view.userUpdate(userDetails.name);
                            console.log('HIHI ' + dataBase.getCurrentPlayerByName());
                        }, function () {
                            view.showMessage('Cannot get user information', 'warning');
                        });

                    }
                }, function (error) {
                    view.showMessage(error.message, 'warning');
                });

            break;
    }
}

function navClickedEventHandler(pageIndex) {
    switch (pageIndex) {
        case "1": // home
            homeView.draw();

            break;
        case "2": // new game
            newGame();

            break;
        case "3": // game instructions
            if (typeof(window.$) === 'undefined') {
                alert('jQuery not loaded!');
            }

            $('.gameBoard').load('/resources/instructions.html');

            break;
        case "4": // score board
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
        case "5": // credits
            creditsView.draw();
            break;
        case "6": // login
            authView.showLoginForm();

            break;
        case "7": // register
            authView.showRegisterForm();

            break;
        case "8": // logout
            view.showLoadingImage('Logout');
            dataBase.logout()
                .then(function () {
                    view.showMessage('Successfully logged out!', 'success');
                    view.userUpdate('guest');
                }, function (error) {
                    view.showMessage(error.message, 'warning');
                });

            break;
    }
}

function timeLineClickedEventHandler(button) {
    if(button === 'newGame'){
        newGame();
    } else {
        timelineClick(button);
    }

}

view.registerClickCallback(navClickedEventHandler);
authView.registerClickCallback(authClickedEventHandler);
gameView.registerClickCallback(timeLineClickedEventHandler);


