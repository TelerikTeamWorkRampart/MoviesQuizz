var dataBase = (function() {

    var apiKey = 'GsKdnuAPcWvn5BIr';
    var el = new Everlive(apiKey);
    var playerData = el.data('Player');
    var query = new Everlive.Query();

    function register(username, password, attr) {
        var promise = new Promise(function(resolve, reject) {
            el.Users.register(username, password, attr,
                function(data) {
                    var player = {
                        Name: username,
                        TotalTimelineScore: 0,
                        AvgTimelineScore: 0,
                        TimelineGamesCount: 0,
                        TotalQuizzScore: 0,
                        AvgQuizzScore: 0,
                        QuizzGamesCount: 0
                    };
                    playerData.create(player);
                    console.log(JSON.stringify(data));
                    resolve(data);

                },
                function(error) {
                    //alert(JSON.stringify(error));
                    reject(error);
                });
        });
        return promise;
    }

    function login(username, password) {
        var promise = new Promise(function(resolve, reject) {

            el.authentication.login(username, password,
                function(data) {
                    var accessToken = data.result.access_token;
                    //console.log("Successfully logged the user in! Received access token: " + accessToken);
                    console.log("Successfully logged the user in!");
                    resolve(data);
                },
                function(error) {
                    console.log("Unfortunately an error occurred: " + error.message);
                    reject(error);
                });
        });
        return promise;
    }

    function logout() {
        var promise = new Promise(function(resolve, reject) {
            el.authentication.logout(function(data) {
                //alert("Logout successful!");
                resolve(data);
            }, function(error) {
                alert("Failed to logout: " + error.message);
                reject(error);
            });
        });
        return promise;
    }

    function getCurrentUser() {
        var promise = new Promise(function(resolve, reject) {

            el.Users.currentUser()
                .then(function(data) {
                        console.log(data.result);
                        resolve(data);
                    },
                    function(error) {
                        alert(JSON.stringify(error));
                        reject(error);
                    });
        });
        return promise;
    }

    function getAllPlayersSortedByTotalTimeLineScore() {
        var promise = new Promise(function(resolve, reject) {

            query.orderDesc('TotalTimelineScore');

            playerData.get(query)
                .then(function(data) {
                        console.log(data.result);
                        resolve(data);
                    },
                    function(error) {
                        alert(JSON.stringify(error));
                        reject(error);
                    });
        });
        return promise;
    }

    function update(totalTimelineScore, avgTimelineScore, timelineGamesCount, totalQuizzScore, avgQuizzScore, quizzGamesCount) {

        el.Users.currentUser()
            .then(function(data) {
                    var currentUserName = data.result.Username;

                    query.where().equal('Name', currentUserName).done();

                    playerData.get(query)
                        .then(function(res) {
                            console.log(res.result);
                        })

                    playerData.update({
                        TotalTimelineScore: totalTimelineScore,
                        AvgTimelineScore: avgTimelineScore,
                        TimelineGamesCount: timelineGamesCount,
                        TotalQuizzScore: totalQuizzScore,
                        AvgQuizzScore: avgQuizzScore,
                        QuizzGamesCount: quizzGamesCount
                    }, query)

                },
                function(error) {
                    alert(JSON.stringify(error));
                });
    }

    return {
        register, login, logout, update, getCurrentUser, getAllPlayersSortedByTotalTimeLineScore
    }
}());

export {
    dataBase
};
