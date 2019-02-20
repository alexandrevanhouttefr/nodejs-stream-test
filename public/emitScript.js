var canvas = document.getElementById("preview");
var context = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 700;

context.width = canvas.width;
context.height = canvas.height;

var video = document.getElementById("video");
var socket = io();

function loadCamera(stream){
    video.srcObject = stream;
    //video.src = window.URL.createObjectURL(stream);
    console.log("Camera connected");
}

function loadFail(){
    console.log("Camera not connected");
}

function viewVideo(video,context){
    context.drawImage(video,0,0,context.width,context.height);
    socket.emit('stream',canvas.toDataURL('image/webp'));
}

$(function() {
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true, audio: false}, loadCamera, loadFail);
    }
    setInterval(function() {
        viewVideo(video, context);
    }, 0.1);
})
