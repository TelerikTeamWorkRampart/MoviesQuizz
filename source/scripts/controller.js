import {gameTimelineModel} from 'scripts/gameTimelineModel';
import {player} from 'scripts/player';
import {movie} from 'scripts/movie';

var game = gameTimelineModel.init('stoyan');
game.movies.push(movie.init('title', 'director', 'cast', 'year', 'imdbRating', 'posterURL'));
console.log(game);
