var socket = io();

var url = window.location.href;

//socket.emit('');

//console.log(window.location.href.split("=")[1]);
console.log(url.split("=")[1]);

var ACCESS_TOKEN = url.split("=")[1];

if (ACCESS_TOKEN == null){

    alert("not logged in");
    window.location = "groupme-message-counter.herokuapp.com"
}

function hideGroups() {
    $('#search_results').fadeOut();
}

