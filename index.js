var express = require("express");
var app = express();

const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://helpreviewsuser:iamhelpreviewsuser@localhost:5432/helpreviews";
const pool = new Pool({connectionString: connectionString/*, ssl:true*/});

app.set("port", 5000)
.use(express.static(__dirname + "/public"))
.use(express.urlencoded())
.use(express.json())
//get all games
.get("/getGames", getGames)
//post new games
.post("/postNewGames", postNewGames)
//post help requests and responses
.post("/postHelpRequest", postHelpRequest)
.post("/postHelpResponse", postHelpResponse)
//get help requests and responses
.get("/seeHelpRequests", getHelpRequests)
.get("/seeHelpResponses", getHelpResponses)
//post review of a game
.post("/postReview", postReview)
//get reviews of a game
.get("/getReviews", getReviews)
.listen(app.get("port"), function(){
    console.log("listening on port: " + app.get("port"));
});

function getGames(req, res){
    console.log("getting all games....");
    var sql = "SELECT name, esrbrating, userrating FROM games";
    var params = [];
    pool.query(sql, params, function(err, result){
        if(err){
            console.log("An error occured with the DB: " + err);
            //callback(err, null);
        }
        
        console.log("result before json.stringify: " + result);
 
        var data = JSON.stringify(result.rows);
        console.log("Found DB result: " + result.rows);
        res.json(result);
    });
}

function postNewGames(req, res){
    console.log("posting new game to database");
    var name = req.body.name;
    console.log("game name: " + name);
    var rating = req.body.rating;
    console.log("esrb rating: " + rating);
    var sql = "INSERT INTO games (name, esrbrating) VALUES ($1::varchar, $2::varchar);";
    var params = [name, rating];
    pool.query(sql, params, function(err, result){
        if(err){
            console.log("An error occured with the DB: " + err);
            //callback(err, null);
        }
        
        else{
            console.log("game inserted successfully!!!")
            res.end();
        }
    });
}

function postHelpRequest(req, res){
    //post a new request for help
    console.log("posting a help request....");
    var helpRequest = {id: 4,
                       created_by: 4,
                       game_id: 3,
                       comment: "Ralof keeps dropping dead outside helgen for no reason at all!! Help!!"};
    res.json(helpRequest);
}

function postHelpResponse(req, res){
    //post a response to a help request
    console.log("posting help response....");  
    var helpResponse = {id: 2,
                        created_by: 1,
                        helping: 4,
                        comment: "I've never seen that bug before. Are you using any mods at all? If so which ones and what do they do?"};
    res.json(helpResponse);
}

function getHelpRequests(req, res){
    //get the requests for help    
    console.log("getting help requests...");
    var helpRequests = [{id: 1, created_by: 2, game_id: 3, comment: "I am in the theives guild and have tried to find Runes real name but no one in the game can answer me. Is it possible to find out his real name? If so wehre do I go?"},
                         {id: 2, created_by: 1, helping: 4, comment: "I've never seen that bug before. Are you using any mods at all? If so which ones and what do they do?"}];
    res.json(helpRequests);
}

function getHelpResponses(req, res){
    //get the responses for help    
    console.log("getting help responses...");
    var helpResponses = [{id: 1, created_by: 1, helping: 1, comment: "THis is one of those things in skyrim that the developers must have had plans to finish but never had a chance too. There are a few of these throughout the game."},
                         {id: 2, created_by: 1, helping: 4, comment: "I've never seen that bug before. Are you using any mods at all? If so which ones and what do they do?"}];
    res.json(helpResponses);
}

function postReview(req, res){
    //post a review    
    console.log("posting a game review....");
    var reviewPost = {created_by: 3,
                      game_id: 4,
                      rating: 5,
                      comment: "This is a great game. I love the lego version of the original trilogy. Nostalgia much?"};
    res.json(reviewPost)
}

function getReviews(req, res){
    //get reviews for a game    

    /*var reviewGet = [{id: 1, created_by: 1, game_id: 3, rating: 5, comment: "This is a highly addictive game. By far the best one that bethesda has released yet. 5/5 to SKyrim!!"},
                     {id: 2, created_by: 3, game_id: 2, rating: 3, comment: "The ending was terrible! I feel like i just spent three games making my own character just to get this cookie-cutter garbage."},
                     {id: 3, created_by: 3, game_id: 4, rating: 5, comment: "This is a great game. I love the lego version of the original trilogy. Nostalgia much?"}];*/
    //res.json(reviewGet);

}
