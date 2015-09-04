import {
    player
}
from 'scripts/player.js';
import {
    movie
}
from 'scripts/movie.js';

describe('#player', function() {
    it('expect not to throw when initializing', function() {
        var playerIvan = player("Ivan", 0, 0, 0, 0, 0, 0);

        console.log(playerIvan);
        var expected = {
            _name: "Ivan",
            _totalTimelineScore: 0,
            _avgTimelineScore: 0,
            _timelineGamesCount: 0,
            _totalQuizzScore: 0,
            _avgQuizzScore: 0,
            _quizzGamesCount: 0
        };
        console.log(expected);
        expect(playerIvan).to.eql(expected);
    });
    it('expect to throw when totalTimelineScore is not a number', function() {
        expect(function() {
            player("Ivan", 'a', 0, 0, 0, 0, 0);
        }).to.throw();
    });
    it('expect to throw when avgTimelineScore is not a number', function() {
        expect(function() {
            player("Ivan", 0, undefined, 0, 0, 0, 0);
        }).to.throw();
    });
    it('expect to throw when timelineGamesCount is negative number', function() {
        expect(function() {
            player("Ivan", 0, 0, -1, 0, 0, 0);
        }).to.throw();
    });
    it('expect to throw when totalQuizzScore is not a number', function() {
        expect(function() {
            player("Ivan", 0, 0, 0, 's', 0, 0);
        }).to.throw();
    });
    it('expect to throw when avgQuizzScore is not a number', function() {
        expect(function() {
            player("Ivan", 0, 0, 0, 0, undefined, 0);
        }).to.throw();
    });
    it('expect to throw when quizzGamesCount is negative number', function() {
        expect(function() {
            player("Ivan", 0, 0, 0, 0, 0, -1);
        }).to.throw();
    });

});

describe('#movie', function() {
    it('expect not to throw when initializing', function() {
        var movieGost = movie("Gost", 'Luk', [], 1990, 3, 'www.poster');

        console.log(movieGost);
        var expected = {
            _title: "Gost",
            _director: 'Luk',
            _cast: [],
            _year: 1990,
            _imdbRating: 3,
            _posterURL: 'www.poster'
        };
        console.log(expected);
        expect(movieGost).to.eql(expected);
    });
    it('expect to throw when year is not a number', function() {
        expect(function() {
            movie("Gost", 'Luk', [], 'test', 3, 'www.poster');
        }).to.throw();
    });
    it('expect to throw when imdbRating is not a number', function() {
        expect(function() {
            movie("Gost", 'Luk', [], 1990, 'test', 'www.poster');
        }).to.throw();
    });
});
