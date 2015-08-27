// movie module

var movie = function (title, director, cast, year, imdbRating, posterURL) {
        return Object.create(newmovie).init(title, director, cast, year, imdbRating, posterURL);
    }

var newmovie = (function () {

    var movieInternal = Object.create({});


    Object.defineProperties(movieInternal, {
        init: {
            value: function (title, director, cast, year, imdbRating, posterURL) {
                this.title = title; //string
                this.director = director; //string
                this.cast = cast; // array of strings
                this.year = year; // int
                this.imdbRating = imdbRating; //float
                this.posterURL = posterURL; // string
                return this;
            }
        },
        cast: {
            get: function () {
                return this._cast;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._cast = value;
            }
        },
        title: {
            get: function () {
                return this._title;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._title = value;
            }
        },
        director: {
            get: function () {
                return this._director;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._director = value;
            }
        },
        year: {
            get: function () {
                return this._year;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._year = value;
            }
        },
        imdbRating: {
            get: function () {
                return this._imdbRating;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._imdbRating = value;
            }
        },
        posterURL: {
            get: function () {
                return this._posterURL;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._posterURL = value;
            }
        },
    });
    return movieInternal;
}());


export {movie};
