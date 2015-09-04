import _ from 'underscore';
var movieGenerator = (function() {
    var movieGenerator = Object.create({});
    var used = [100000];
    var movies = [
        'The Shawshank Redemption',
        'The Godfather',
        'The Godfather: Part II',
        'The Dark Knight',
        'Pulp Fiction',
        '12 Angry Men',
        "Schindler's List",
        'The Good, the Bad and the Ugly',
        'The Lord of the Rings: The Return of the King',
        'Fight Club',
        'The Lord of the Rings: The Fellowship of the Ring',
        'Star Wars: Episode V - The Empire Strikes Back',
        'Forrest Gump',
        'Inception',
        'Die Hard',
        'Pretty Woman',
        'American Beauty',
        "One Flew Over The Cuckoo's Nest",
        'The Lord of the Rings: The Two Towers',
        'Goodfellas',
        'The Matrix ',
        'Star Wars: Episode IV: A New Hope',
        'Seven Samurai',
        'Interstellar',
        'City of God',
        'Se7en',
        'The Usual Suspects',
        'The Silence of the Lambs',
        "It's a Wonderful Life",
        'Once Upon a Time in the West',
        'Leon: The Professional',
        'Life Is Beautiful',
        'Casablanca',
        'Indiana Jones and the Raiders of the Lost Ark',
        'American History X',
        'Saving Private Ryan',
        'City Lights',
        'Spirited Away',
        'Psycho',
        'Rear Window',
        'Whiplash',
        'Intouchables',
        'Modern Times',
        'Terminator 2: Judgment Day',
        'Memento',
        'The Green Mile',
        'The Pianist',
        'The Departed',
        'Apocalypse Now',
        'Gladiator',
        'Sunset Boulevard',
        'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        'Back to the Future'
    ];

    Object.defineProperties(movieGenerator, {
        init: {
            value: function(){
                used = [100000];
                return this;
            }
        },
        getMovie: {
            value: function() {
                var index,
                    illegal;

                function getIndex(){
                    index = (Math.random() * movies.length) | 0;
                    illegal = _.some(used, function(element){
                        element === index;
                    });
                    if (illegal){
                        getIndex();
                    } else{
                        used.push(index);
                        return;
                    }
                }

                getIndex();

                //http://www.omdbapi.com/?t=beauty&y=&plot=short&r=json
                var url = "http://www.omdbapi.com/?t=" + movies[index] + "&y=&plot=short&r=json";

                var httpRequest = new XMLHttpRequest();
                httpRequest.open('GET', url, true);

                var promise = new Promise(function(resolve, reject) {
                    httpRequest.onreadystatechange = function() {
                        if (httpRequest.readyState === 4) {
                            var statusType = (httpRequest.status / 100) | 0;
                            switch (statusType) {
                                case 2:
                                    console.log('Success!');
                                    resolve(httpRequest.responseText);
                                    break;
                                case 4:
                                case 5:
                                    console.log('Error!')
                                    reject(httpRequest.responseText);
                                    break;
                            }
                        }
                    };
                });
                httpRequest.send(null);
                var newMovie = promise
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
                        return testMovie;
                    });
                return newMovie;

            }
        }
    });

    return movieGenerator;
}());

export {
    movieGenerator
}
