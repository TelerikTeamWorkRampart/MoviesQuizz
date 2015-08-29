import {gameTimelineModel} from 'scripts/gameTimelineModel';
import {player} from 'scripts/player';
import {movie} from 'scripts/movie';
import {globalView} from 'scripts/globalView';
import {gameboardTimelineView} from 'scripts/gameboardTimelineView';
import {loginView} from 'scripts/loginView';
import {dataBase} from 'scripts/dataBase';






var game = gameTimelineModel.init(player('STOYAN', 23, 12, 2,  3, 4, 1));
game.movies.push(movie('HotShots', 'Unknown', ['cast', 'who Cares'], 1991, 2.8, 'http://ia.media-imdb.com/images/M/MV5BMTQ4Mjg2NjY4NV5BMl5BanBnXkFtZTcwMjgwMDU1MQ@@._V1_SX300.jpg'));
game.gameboardMovies.push(movie('Rocky', 'Unknown', ['cast', 'who Cares'], 1980, 8.8, 'http://ia.media-imdb.com/images/M/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_SX300.jpg'));
console.log(game);


var view = globalView;
var gameView = gameboardTimelineView;
var auth = loginView;



view.draw();


//gameView.draw(game.gameboardMovies, game.movies[0]); // should always go after view.draw. The gameboardTimelineView expects 2 parameters: 1 is array of movies, 2 is a single current movie



//Database test
dataBase.register('JarJar', 'asdf', {score: 12});



//callbacks
function alertMe(input){
    alert(input);
}

// this is for testing purposes only
function showView(pageIndex){
   switch(pageIndex){
        case "2":
            gameView.draw(game.gameboardMovies, game.movies[0]);
            break;
        case "6":
            auth.showRegisterForm();
            break;
    }
}

view.registerClickCallback(showView);
auth.registerClickCallback(alertMe);


