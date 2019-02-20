var socket = io();
socket.on('stream',function(image){
    $('#play').attr('src',image);
});
