var dataBase = (function() {

    var apiKey = 'GsKdnuAPcWvn5BIr';
    var el = new Everlive(apiKey);
    var playerData = el.data('Player');
    var query = new Everlive.Query();

    function register(username, password, attr) {
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

            },
            function(error) {
                alert(JSON.stringify(error));
            });
    }

    function login(username, password) {
        el.authentication.login(username, password,
            function(data) {
                var accessToken = data.result.access_token;
                console.log("Successfully logged the user in! Received access token: " + accessToken);
            },
            function(error) {
                console.log("Unfortunately an error occurred: " + error.message);
            })
    }

    function logout() {
        el.authentication.logout(function() {
            alert("Logout successful!");
        }, function(err) {
            alert("Failed to logout: " + err.message);
        });
    }

    function getCurrentUser() {
        el.Users.currentUser()
            .then(function(data) {
                    data.result.Username;
                },
                function(error) {
                    alert(JSON.stringify(error));
                });
    }

    function update(totalTimelineScore, avgTimelineScore, timelineGamesCount, totalQuizzScore, avgQuizzScore, quizzGamesCount) {

        query.where().equal('Name', getCurrentUser()).done();

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
    }

    return {
        register, login, logout, update, getCurrentUser
    }
}());

export {dataBase};
