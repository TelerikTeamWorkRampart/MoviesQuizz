import {
    player
}
from 'scripts/player.js';

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
