var socket = io();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x = 0;
var y = 0;
var xV = 0;
var yV = 0;



function moveUp(){ 
        y = y -2;
}

function moveDown(){ 
        y = y + 2;
}

function drawBox() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(x, y, 20, 50);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, 800, 600);



    drawBox();

    requestAnimationFrame(draw);
}
draw();