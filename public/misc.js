/*window.onload=function(){
    document.getElementById("displayGames").submit();
}*/

function callAjax(url, callback) {
	var xmlObj = new XMLHttpRequest();
	xmlObj.onreadystatechange = function () {
		if (xmlObj.readyState == 4 && xmlObj.status == 200) {
			callback(xmlObj.responseText);
		}
	}
	xmlObj.open("GET", url, true);
	xmlObj.send();
}

function getAllGames(){
    console.log("getting all the games in the database....");
    var url = "/getGames";
    callAjax(url, handleResults);
}

function handleResults(result){
    console.log("back from AJAX with result: " + result);
    if(data.length > 0) {
        var resultList = $("#data");
        resultList.empty();
    }
    
    var insert = "<table><tr><th>Name</th><th>ESRB Rating</th><th>User Rating</th><th>Link to Reviews</th><th>Link to Help Center</th></tr>";
    for(var i = 0; i < data.length; i++){
        insert += "<tr><td>" + data[i].name + "</td>";
        insert += "<td>" + data[i].esrbrating + "</td>";
        insert += "<td>" + data[i].userrating + "</td>";
        insert += "<td> <button type='button' onclick='dosomething()'> Reviews </button></td>";
        insert += "<td> <button type='button' onclick='dosomething()'> Help Center </button></td></tr>";
    }
    insert += "</table>";
    console.log("inserting this table: " + insert);
    resultList.append(insert);
    console.log("data appended to html page");
}

function dosomething(){
    console.log("help or review center");
}