import {movie} from 'scripts/movie';


var gameTimelineModel = (function () {
    var modelInternal = Object.create({});

    Object.defineProperties(modelInternal, {
        init: {
            value: function (player) {
                this.score = 0; //float
                this.player = player; //string
                this.progress = 0; // int
                this.gameboardMovies = [] // arr of ordered movies
                this.movies = []; // arr of movies
                this.timer = 10 //int (seconds)
                return this;
            }
        },
        score: {
            get: function () {
                return this._score;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._score = value;
            }
        },
        player: {
            get: function () {
                return this._player;
            },
            set: function (value) {
                // Receives either a player object or falls back to guest
                // TODO: Add validators.............
                this._player = value;
            }
        },
        progress: {
            get: function () {
                return this._progress;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._progress= value;
            }
        },
        movies: {
            get: function () {
                return this._movies;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._movies = value;
            }
        },
        timer: {
            get: function () {
                return this._timer;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._timer = value;
            }
        },
        update: {
            value: function(){
                //TODO: update the current round timer ( -1 second every second) and check if more movies need to be loaded in the movies array (if movies.length becomes lower than 2, then getMovies(2))
            }
        },
        getMovies: {
            value: function(count){
                // TODO: add count movies to the movies array.
                // Check if they are already present in the movies or gameboardMovies arrays and if true, skip them and try with other.
            }
        }
    });
    return modelInternal;
}());

export {gameTimelineModel}
