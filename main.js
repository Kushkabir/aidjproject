song="";
leftwristX=0;
leftwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
rightwristX=0;
rightwristY=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelloaded)
poseNet.on("pose",gotPoses);
}
function gotPoses(results){
if(results.length >0){
console.log(results);
scoreleftwrist=results[0].pose.keypoints[9].score;
scorerightwrist=results[0].pose.keypoints[10].score;
console.log("score left wrist="+scoreleftwrist+" scorerightwrist="+scorerightwrist);
leftwristX=results[0].pose.leftWrist.x;
leftwristY=results[0].pose.leftWrist.y;
console.log("leftwristx= "+leftwristX+" ,leftwristy="+leftwristY);
rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log("rightwrist= "+rightwristX+" ,rightwristy="+rightwristY);
}
}
function modelloaded(){
    console.log("posenet is initialized");
}
function draw(){
image(video,0,0,600,500);
fill("#0000FF");
stroke("#0000FF");
if(scoreleftwrist > 0.2){
circle(leftwristX,leftwristY,20);
InnumberleftwristY=Number(leftwristY);
removedecimals=floor(InnumberleftwristY);
volume=removedecimals/500;
document.getElementById("volume").innerHTML="volume="+volume;
song.setVolume(volume);
}
if(scorerightwrist>0.2){
    circle(rightwristX,rightwristY,20);
    if(rightwristY>0 &&rightwristY<=100){
        document.getElementById("speed").innerHTML="Speed=0.5x";
        song.rate(0.5);
    }
    else if(rightwristY<100 &&rightWristY<=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightWrist<200 &&rightWristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWrist<300 &&rightWristY<=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(rightWristY>400){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}