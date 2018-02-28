const socket = io();

socket.on('tmp', function(tmp) {
    console.log(tmp+"%");
    document.getElementById('temp').innerHTML = tmp+"%";
});