var sanic
var base1, base2, base3;
var star, starImg
var spikes, spikes2, spikesImg;

var bg;
var PLAY = 1;
var END = 0;
var WIN = 2;

var background_music;

var gameState = PLAY

function preload(){
    bg = loadImage("images/background.png")
    baseImg = loadImage("images/base.png")
    sanicStanding = loadAnimation("./images/sanic_stand.png", "images/sanic_standing2.png")
    sanicJumping = loadAnimation("./images/sanic1.png", "images/sanic2.png")
    starImg = loadImage("./images/star.png")
    spikesImg = loadImage("./images/spike.png")
    background_music = loadSound("background_music.mp3")
}


function setup(){
    createCanvas(windowWidth, windowHeight)
   

    entry = createSprite(100, windowHeight/2 +106, 300, 100);
    entry.addImage("base", baseImg);
    entry.scale = 0.06;

    exit = createSprite(windowWidth - 100, windowHeight/2 +106, 300, 100);
    exit.addImage("base", baseImg);
    exit.scale = 0.06;
    exit.setCollider("rectangle", 0, - 800, exit.width - 300,100)
    spikes = createSprite(exit.x -40, exit.y - 60, 10, 10)
    spikes.addImage("spikes", spikesImg)
    spikes.scale = 0.3

    spikes2 = createSprite(exit.x +30, exit.y - 60, 10, 10)
    spikes2.addImage("spikes", spikesImg)
    spikes2.scale = 0.3

    base1 = createSprite(windowWidth/2 -150, windowHeight/2 + 100, 300, 100);
    base1.addImage("base", baseImg);
    base1.scale = 0.03;
    base1.velocityY = -1
    base1.setCollider("rectangle", 0, - 800, base1.width - 150,100)

    invB1 = createSprite(base1.x, base1.y+ 20, 100, 10)
    invB1.visible = false
    invB1.velocityY = -1;


    base2 = createSprite(windowWidth/2, 100, 300, 100);
    base2.addImage("base", baseImg);
    base2.scale = 0.03;
    base2.velocityY = 2
    base2.setCollider("rectangle", 0, - 800, base2.width - 150,100)
  
    invB2 = createSprite(base2.x, base2.y+ 20, 100, 10)
    invB2.visible = false;
    invB2.velocityY = 2;

    base3 = createSprite(windowWidth/2+150 , windowHeight/2 + 100, 300, 100);
    base3.addImage("base", baseImg);
    base3.scale = 0.0209848;
    base3.velocityY = -3
    base3.setCollider("rectangle", 0, - 800, base3.width - 150,100)
    
    invB3 = createSprite(base3.x, base3.y+ 20, 30, 10)
    invB3.visible = false;
    invB3.velocityY = -3;

    star = createSprite(base3.x, base3.y,10,10)
    star.addImage("star", starImg)
    star.scale = 0.01

    /*entry.debug = true;
    base1.debug = true;
    base2.debug = true;
    base3.debug = true
    exit.debug = true;*/

    sanic = createSprite(100, windowHeight/2 +10, 50,50)
    sanic.addAnimation("standing", sanicStanding)
    sanic.addAnimation("jumping", sanicJumping)
    sanic.scale = 0.1489636


    resetButton = createImg("images/reset.png")
    resetButton.position(windowWidth - 100, 50)
    resetButton.size(40,40)
    resetButton.mouseClicked(reset)
}


function draw(){
    background(bg)
    if(!background_music.isPlaying()){
        background_music.play()
        background_music.setVolume(0.2)
    }

    if(gameState === PLAY){
        if(sanic.collide(base1) || sanic.collide(base2) || sanic.collide(base3)|| sanic.collide(entry) ){
            sanic.changeAnimation("standing")
        }
        if(sanic.collide(exit)){
            gameState = WIN
        }
    
         // making him jump 



    sanic.velocityY = sanic.velocityY + 0.8004227
    

   

    if(sanic.isTouching(star)){
        star.visible = false;
        spikes.destroy(); 
        spikes2.destroy();
    }
    if(sanic.y < 10){
        sanic.x = 100 
        sanic.y = windowHeight/2 +10
    }

    if(sanic.y > windowHeight - 50.0000005 || sanic.isTouching(invB1) || sanic.isTouching(invB2) ||sanic.isTouching(invB3) ||sanic.isTouching(spikes)||sanic.isTouching(spikes2)){
        gameState = END
    }


    if(base1.y < 50||base1.y > windowHeight - 50){
        base1.velocityY = -(base1.velocityY);
        invB1.velocityY = -(invB1.velocityY);
    }

    if(base2.y < 100 || base2.y > windowHeight - 100){
        base2.velocityY = -(base2.velocityY);
        invB2.velocityY = -(invB2.velocityY);
    }
   
    if(base3.y < 20 || base3.y > windowHeight - 80){
        base3.velocityY = -(base3.velocityY)
        invB3.velocityY = -(invB3.velocityY);
    }

    }
    else if(gameState === END){
        sanic.remove()
        fill("red")
        textSize(30)
        text("You lose, joe dies!", windowWidth/2 - 100, windowHeight/2)
    }
    else if(gameState === WIN){
        sanic.changeAnimation("standing")
        fill("white")
        textSize(30)
        text("You won sanic,!", windowWidth/2 - 100, windowHeight/2)
        sanic.velocityY = 0
    }


    drawSprites()
}

function keyPressed(){
    if(keyCode === 32){
        sanic.velocityY = -5
        sanic.changeAnimation("jumping")
    }

    if(keyCode === RIGHT_ARROW){
        sanic.x = sanic.x + 7
    }

}

function reset(){
   location.reload()
}
