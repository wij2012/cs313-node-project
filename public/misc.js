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
        //resultList.empty();
    }
    
    var raw = data;
    resultList.append("<p>" + raw + "</p>");
    console.log("data appended to html page");
}
