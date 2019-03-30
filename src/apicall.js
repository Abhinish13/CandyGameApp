// if (!process.env.API_SERVICE_NAME) {
//     var apiServiceName = process.env.API_SERVICE_NAME.toUpperCase() || 'crome',
//         apiHost = process.env[apiServiceName + '_SERVICE_HOST'],
//         apiPort = process.env[apiServiceName + '_SERVICE_PORT'];
// } else
// {
//  var apiHost = 'candy-candy.apps.0302.example.opentlc.com';
var apiHost = 'candygameapi-candy.apps.prod.pdcloudex.com',
    apiPort = 443;


//console.log(apiServiceName+'\n'+apiHost+'\n'+apiPort);
var callAPI = {

    loadDoc: function () {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", `http://${apiHost}:${apiPort}/leaderboard`, true);
        xhttp.send();
        // console.log(xhttp.toString());
    },


    setScore: function (score) {
        var xhttp = new XMLHttpRequest();
        var params = null;

        var id = storageAPI.get('id');
        console.log(id);
        xhttp.open("GET", `http://${apiHost}:${apiPort}/setScore/${id}/${score}`, true);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://candygameapi.apps.d94a.example.opentlc.com");
        xhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("cache-control", "no-cache");
        xhttp.send(params);

        console.log(xhttp.getAllResponseHeaders());
    },
    createPlayer: function () {
        var xhttp = new XMLHttpRequest();

        var name = callAPI.requestName();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                storageAPI.set('id', this.responseText);
            }
        }

        xhttp.open("GET", `http://${apiHost}:${apiPort}/player/${name}`, true);
        xhttp.send();

    },
    requestName: function myFunction() {
        var txt;
        var person = prompt("Please enter your Email Address:", "Email Address");
        if (person == null || person == "") {
            txt = "User cancelled the prompt.";
        } else {
            txt = "Hello " + person + "! How are you today?";
        }
        // document.getElementById("demo").innerHTML = txt;
        return person;
    },
    removeId: function () {
        storageAPI.remove('id');
    }
};
