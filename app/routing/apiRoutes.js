var friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        return res.json(friendsData);
    });

    app.get("/api/friends", function(req, res) {
        res.sendFile(Path2D.join(__dirname, "/api/friends"));
    });

    app.post("/api/friends", function(req, res) {
        var data = req.body;
        var friendName = req.body.name;
        var friendPhoto = req.body.photo;
        var friendScores = data.scores;

        var match = {
            name: "",
            photo: ""   
        };

        var bestDifference = Infinity 

        var scoreDiff;

        for (var i = 0; i < friendsData.length; i++) {
            var checkFriend = friendsData[i];
            newDifference = 0;
            console.log(checkFriend);
            for (var j = 0; j < checkFriend.scores.length; j++) {
                var checkFriendAnswers = checkFriend.scores[j];
                var currentUserAnswers = friendScores[j];
                newDifference += Math.abs(parseInt(currentUserAnswers) - parseInt(checkFriendAnswers));
                console.log(newDifference)
            }
            if (newDifference <= bestDifference) {
                match = checkFriend;
                bestDifference = newDifference;
                // console.log("================= ", match);

            }
        }

        console.log(match)
        friendsData.push(data);
        res.json(match);


    })
}



// module.exports = function(app) {
// app.get("/api/friends", function(req, res) {
//     res.json(friendsData);
// });

// app.post("/api/friends", function(req, res) {
//     var newFriend = req.body;
//     // console.log(newFriend);

//     var bestMatch = {};

//     for (var i = 0; i <newFriend.answers.length; i++) {
//         if(newFriend.answers[i] == "1 (Strongly Disagree)") {
//             newFriend.answers[i] = 1;
//         } else if (newFriend.answers[i] == "5 (Strongly Agree)") {
//             newFriend.answers[i] = 5;
//         } else {
//             newFriend.answers[i] = parseInt(newFriend.answers[i]);
//         }
//     }

//     var bestMatchIndex = 0;

//     var bestMatchDifference = 40;

//     for (var i = 0; i < friendsData.length; i++) {
//         var totalDifference = 0;

//         for (var index = 0; index < friendsData[i].answers.length; index++) {
//             var differenceInData = Math.abs(friendsData[i].answers[index] - newFriend.answers[index]);
//             totalDifference += differenceInData;
//         }

//         if (totalDifference < bestMatchDifference) {
//             bestMatchIndex = i;
//             bestMatchDifference = totalDifference;
//         }

//         bestMatch = friendsData[bestMatchIndex];

//         friendsData.push(newFriend);

//         res.json(bestMatch);
//     }
// })


// };