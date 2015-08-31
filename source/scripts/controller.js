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

// game.gameboardMovies.push(movie('Rocky', 'Unknown', ['cast', 'who Cares'], 1980, 8.8, 'http://ia.media-imdb.com/images/M/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_SX300.jpg'));
// console.log(game);


var view = globalView;
var gameView = gameboardTimelineView;
var scoreView = scoreboardView;
var authView = loginView;

// for scoreboardView
function getHighScores(){
    var hs = [];

    return hs
}

view.draw();

//gameView.draw(game.gameboardMovies, game.movies[0]); // should always go after view.draw. The gameboardTimelineView expects 2 parameters: 1 is array of movies, 2 is a single current movie

//Movie generator test
movieGenerator.getMovie()
    .then(function(newMovie){
        console.log('New movie equals to ' + newMovie.title);
    })

//NEW GAME LOGIC:
function newGame(){
    var i,
        movs = []; // future array of prommisses
    game = gameTimelineModel.init(player('STOYAN', 23, 12, 2, 3, 4, 1));
    for (i = 0; i < 5; i++) {
        movs.push(movieGenerator.getMovie());
    };
    Promise.all(movs)
        .then(function(movsArr){
            game.gameboardMovies.push(movsArr[0]); //adding the first on the board
            console.log(game.gameboardMovies);
            movsArr.splice(0, 1);
            _.each(movsArr, function(el){
                game.movies.push(el);
            })
            console.log(game.movies);
        })
        .then(function(){
            gameboardTimelineView.draw(game.gameboardMovies, game.movies[0]);
        });
}



//Database get all players
// dataBase.getAllPlayersSortedByTotalTimeLineScore().then(function(res){
//     console.log('Asynchronous result deivered to the controller' + res);
// });

//callbacks
function alertMe(input) {
    alert(input);
}

function authEventHandler(input) {
    switch(input.auth){
        case 'register':
            console.log(input);
            var attrs = {
                Email: input.username +'@telerik.com',
                DisplayName: input.username
            };
            dataBase.register(input.username, input.password, attrs);
            break;
        case 'login':
            dataBase.login(input.username, input.password).then(function (data) {
                if (data.hasOwnProperty('result')) {
                    // this method accepts JSON object and shows all of its properties by key->value pairs
                    // must have property "name"
                    authView.showPlayerInfo({name: 'Ivan', games: 5});
                }
            }, function(error){
                view.showMessage(error.message);
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
        case "4":
            scoreView.showLoadingImage();
            dataBase.getAllPlayersSortedByTotalTimeLineScore()
            .then(function(res){
                var highScore = [];
                res = res.result;
                _.each(res, function(el){
                    highScore.push({
                        playerName: el.Name,
                        playerHighScore: el.TotalTimelineScore,
                        playerGames: el.TimelineGamesCount
                    });
                });
                return highScore;
            })
            .then(function(highScore){
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
            dataBase.logout(); // this should return promise too
            // dataBase.logout().then(function(data){  });
            view.showMessage('Successfully logged out!');
            break;
    }
}

view.registerClickCallback(showView);
authView.registerClickCallback(authEventHandler);


