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

var game = gameTimelineModel.init(player('STOYAN', 23, 12, 2, 3, 4, 1));

game.gameboardMovies.push(movie('Rocky', 'Unknown', ['cast', 'who Cares'], 1980, 8.8, 'http://ia.media-imdb.com/images/M/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_SX300.jpg'));
console.log(game);


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
    .then(function (data) {
        var movieJSON = JSON.parse(data);
        var testMovie = {
                title: movieJSON.Title,
                director: movieJSON.Director,
                cast: movieJSON.Actors,
                year: movieJSON.Year,
                imdbRating: movieJSON.imdbRating,
                posterURL: movieJSON.Poster
        };
        game.movies.push(testMovie);
        console.log(testMovie);
    });



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
            console.log(input);
            dataBase.login(input.username, input.password);
            break;
    }
}

// this is for testing purposes only
function showView(pageIndex) {
    switch (pageIndex) {
        case "2":
            gameView.draw(game.gameboardMovies, game.movies[0]);
            break;
        case "4":
            scoreView.showLoading();
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
    }
}

view.registerClickCallback(showView);
authView.registerClickCallback(authEventHandler);


