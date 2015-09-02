(function() {
    describe('#player', function() {
        it('expect not to throw when initializing', function() {
            var playerIvan = player("Ivan", 0, 0, 0, 0, 0, 0);

            console.log(playerIvan);
            expected = {
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
        it('expect to throw when totalTimelineScore is negative number', function() {
            expect(function() {
                player("Ivan", -1, 1, 1, 1, 1, 1);
            }).to.throw();
        });

    });
}());
