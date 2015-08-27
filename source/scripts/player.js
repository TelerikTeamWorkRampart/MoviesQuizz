var player = (function () {
    var playerInternal = Object.create({});

    Object.defineProperties(playerInternal, {
        init: {
            value: function (name, totalTimelineScore, avgTimelineScore, timelineGamesCount,  totalQuizzScore, avgQuizzScore, quizzGamesCount) {
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
            get: function () {
                return this._name;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._name = value;
            }
        },
        totalTimelineScore: {
            get: function () {
                return this._totalTimelineScore;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._totalTimelineScore = value;
            }
        },
        avgTimelineScore: {
            get: function () {
                return this._avgTimelineScore;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._avgTimelineScore = value;
            }
        },
        timelineGamesCount: {
            get: function () {
                return this._timelineGamesCount;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._timelineGamesCount = value;
            }
        },
        totalQuizzScore: {
            get: function () {
                return this._totalQuizzScore;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._totalQuizzScore = value;
            }
        },
        avgQuizzScore: {
            get: function () {
                return this._avgQuizzScore;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._avgQuizzScore = value;
            }
        },
        quizzGamesCount: {
            get: function () {
                return this._quizzGamesCount;
            },
            set: function (value) {
                // TODO: Add validators.............
                this._quizzGamesCount = value;
            }
        }
    });
    return playerInternal;
}());

export {player}
