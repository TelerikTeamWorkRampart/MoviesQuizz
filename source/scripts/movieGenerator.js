var movieGenerator = (function() {
    var movieGenerator = Object.create({});
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
        getMovie: {
            value: function() {
                var index = (Math.random() * movies.length) | 0;
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
                return promise;

            }
        }
    });

    return movieGenerator;
}());

export {
    movieGenerator
}
