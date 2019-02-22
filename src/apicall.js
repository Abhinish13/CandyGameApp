
// if (!process.env.API_SERVICE_NAME) {
//     var apiServiceName = process.env.API_SERVICE_NAME.toUpperCase() || 'crome',
//         apiHost = process.env[apiServiceName + '_SERVICE_HOST'],
//         apiPort = process.env[apiServiceName + '_SERVICE_PORT'];
// } else
// {
 var apiHost = 'candygameapi.apps.d94a.example.opentlc.com';
    apiPort = 80;


//console.log(apiServiceName+'\n'+apiHost+'\n'+apiPort);
var callAPI = {

    loadDoc :function()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://${apiHost}:${apiPort}/leaderboard`, true);
    xhttp.send();
    // console.log(xhttp.toString());
},


    setScore :function (score) {
    var xhttp = new XMLHttpRequest();
    var params = "UID=CORS&name=CORS";

    var id = storageAPI.get('id');
    console.log(id);
    xhttp.open("GET", `http://${apiHost}:${apiPort}/setScore/${id}/${score}`, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://game.candy.apps.d94a.example.opentlc.com");
    xhttp.setRequestHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(params);
    
    console.log(xhttp.toString());
},
    createPlayer: function () {
    var xhttp = new XMLHttpRequest();

    var name = callAPI.requestName();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            storageAPI.set('id',this.responseText);
        }
    }

    xhttp.open("GET", `http://${apiHost}:${apiPort}/player/${name}`, true);
    xhttp.send();

    },
    requestName : function myFunction() {
        var txt;
        var person = prompt("Please enter your name:", "Player_Name");
        if (person == null || person == "") {
            txt = "User cancelled the prompt.";
        } else {
            txt = "Hello " + person + "! How are you today?";
        }
        // document.getElementById("demo").innerHTML = txt;
        return person;
    },
    removeId : function() {
        storageAPI.remove('id');
    }
};