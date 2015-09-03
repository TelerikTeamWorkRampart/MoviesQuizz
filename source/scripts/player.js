var player = function(name, totalTimelineScore, avgTimelineScore, timelineGamesCount, totalQuizzScore, avgQuizzScore, quizzGamesCount) {
    return Object.create(newplayer).init(name, totalTimelineScore, avgTimelineScore, timelineGamesCount, totalQuizzScore, avgQuizzScore, quizzGamesCount);
}

var newplayer = (function() {
    var playerInternal = Object.create({});

    Object.defineProperties(playerInternal, {
        init: {
            value: function(name, totalTimelineScore, avgTimelineScore, timelineGamesCount, totalQuizzScore, avgQuizzScore, quizzGamesCount) {
                this.name = name; //string
                this.totalTimelineScore = totalTimelineScore; //float
                this.avgTimelineScore = avgTimelineScore; //float
                this.timelineGamesCount = timelineGamesCount; //int
                this.totalQuizzScore = totalQuizzScore; //float
                this.avgQuizzScore = avgQuizzScore; //float
                this.quizzGamesCount = quizzGamesCount; //int
                return this;
            }
        },
        name: {
            get: function() {
                return this._name;
            },
            set: function(value) {
                this._name = value;
            }
        },
        totalTimelineScore: {
            get: function() {
                return this._totalTimelineScore;
            },
            set: function(value) {
                if (isNaN(value)) {
                    throw Error("Not a valid number");
                };
                this._totalTimelineScore = value;
            }
        },
        avgTimelineScore: {
            get: function() {
                return this._avgTimelineScore;
            },
            set: function(value) {
                if (isNaN(value)) {
                    throw Error("Not a valid number");
                };
                this._avgTimelineScore = value;
            }
        },
        timelineGamesCount: {
            get: function() {
                return this._timelineGamesCount;
            },
            set: function(value) {
                if (value < 0) {
                    throw Error("Not a valid number");
                };
                this._timelineGamesCount = value;
            }
        },
        totalQuizzScore: {
            get: function() {
                return this._totalQuizzScore;
            },
            set: function(value) {
                // TODO: Add validators.............
                this._totalQuizzScore = value;
            }
        },
        avgQuizzScore: {
            get: function() {
                return this._avgQuizzScore;
            },
            set: function(value) {
                // TODO: Add validators.............
                this._avgQuizzScore = value;
            }
        },
        quizzGamesCount: {
            get: function() {
                return this._quizzGamesCount;
            },
            set: function(value) {
                if (value < 0) {
                    throw Error("Not a valid number");
                };
                this._quizzGamesCount = value;
            }
        }
    });
    return playerInternal;
}());

export {
    player
};
