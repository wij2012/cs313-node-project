//function that handles all AJAX calls to retrieve or add data to/from the database
function callAjax(url, callback) {
	var xmlObj = new XMLHttpRequest();
	xmlObj.onreadystatechange = function () {
		if (xmlObj.readyState == 4 && xmlObj.status == 200) {
            callback(xmlObj.responseText);
            console.log("callback function called in callAjax");
		}
	}
	xmlObj.open("GET", url, true);
	xmlObj.send();
}

//function called when retreiving all the games in the database
function getAllGames(){
    console.log("getting all the games in the database....");
    var url = "/getGames";
    callAjax(url, handleGames);
}

//function called to organize and handle to data from the database 
//to be added to the html page from the database when getting the games
function handleGames(result){
    console.log("back from AJAX with result: " + result);
    console.log("data length: " + result[4]);
    var myObj = JSON.parse(result);
    console.log("result object: " , myObj.rows[0].name);
    var resultList;
    if(result.length > 0) {
        resultList = $("#data");
        resultList.empty();
    
        console.log("in the if statement");
        var insert = "<table><tr><th>Name</th><th>ESRB Rating</th><th>User Rating</th></tr>";
        for(var i = 0; i < myObj.rows.length; i++){
            insert += "<tr><td>" + myObj.rows[i].name + "</td>";
            console.log("myObj.rows[i].name" + myObj.rows[i].name);
            insert += "<td>" + myObj.rows[i].esrbrating + "</td>";
            console.log("myObj.rows[i].esrbrating" + myObj.rows[i].esrbrating);
            insert += "<td>" + myObj.rows[i].userrating + "</td>";
            console.log("myObj.rows[i].userrating" + myObj.rows[i].userrating);
        }
        insert += "</table>";

        //console.log("inserting this table: " + insert);
        resultList.append(insert);
        //console.log("data appended to html page");
    }
}

//get all games listed in a select operator
function getAllGamesListed(){
    console.log("getting all the games in the database for the select list....");
    var url = "/getGames";
    callAjax(url, handleGamesListed);
}

function handleGamesListed(result){
    console.log("back from AJAX with result: " + result);
    console.log("data length: " + result[4]);
    var myObj = JSON.parse(result);
    console.log("result object: " , myObj.rows[0].name);
    var resultList;
    //var resultList2;
    if(result.length > 0) {
        resultList = $("#data");
        resultList.empty();
        //resultList2 = $("data2");

        console.log("in the if statement");
        var insert = "<select name='gamelist' form='data' id='select'>";
        for(var i = 0; i < myObj.rows.length; i++){
            console.log("myObj.rows[i].name" + myObj.rows[i].name);
            console.log("myObj.rows[i].name" + myObj.rows[i].id);
            insert += "<option value=" + myObj.rows[i].id + "> " + myObj.rows[i].name + "</option>";
        }
        insert += "</select><br><br>";
        insert += "<button type='button' onclick='getReviews()'> Get all reviews for the above selected game </button>";

        resultList.append(insert);
        //resultList2.append(insert);
    }
}

function getReviews(){
    console.log("getting all the game reviews in the database....");
    var id = document.getElementById('select').value;
    console.log("value to search reviews for: " + id);
    var url = "/getReviews?id=" + id;
    callAjax(url, handleReviews);
}

function handleReviews(result){
    console.log("back from AJAX with reviews: " + result);
    var myObj = JSON.parse(result);

    var resultList;
    if(result.length > 0) {
        
    }
}
/*function postAGAME(){
    console.log("creating url to post a new game");
    var url = "/postNewGames?name=" + document.getElementById("name");
    console.log("name = " + document.getElementById("name"));
    url += "/rating=" + document.getElementById("rating");
    console.log("rating = " + document.getElementById("rating"));
    callAjax(url, gameInserted); 
}

//
function gameInserted(){
    var message = $('#message');
    message.empty();
    var insert = "New game added to the database!!";
    message.append(insert);
}*/

