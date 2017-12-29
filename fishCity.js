new p5();
var charc = {
  x: 150,
  y: 100,
  r:0,
  spin: 0,
  draw:function () {
    translate(this.x,this.y);
    rectMode(CENTER);
    rotate(this.r);
    this.r = this.r + this.spin;
    rect(0,0,50,50);
    
    rectMode(CORNER);
    resetMatrix();
 },
};

var flip = 0; 
var x = 100;
var y = 100;
var yspeed = 0;
var grav = 1;
var timer = 0;
var lives = 3;
var score = 0;
var scorePlus = 0;
var fall = false;

var holex = 1000;
var holey = 350;

var holex2 = 1900;
var holey2 = 350;

var loseScreen = false;
var intro = false;
var game = true;
function setup () {
  createCanvas(1000,650);

}
function draw () {
    if(game === true && loseScreen === false){
        scorePlus = 1;
        background(100);
        fill(200);
        
        textSize(18);
        text("~Spam the SpaceBar, Shred Forever~",500,200);
        textSize(40);
        text("Lives: "+lives,600,100);
        if (lives<1){
            game = false;
            loseScreen = true;
            fall = false;
        }
        
        text("Score: "+score,100,100);
        rect(0,350,1500,600);
        noStroke();
        fill(100);
        //hole
        rect(holex-20,holey,150,300);
        holex = holex - 10;
        if(holex<-150){
            holex = 1000;
        }
        if(dist(charc.x,charc.y,holex,holey)<20){
            fall = true;
            yspeed = 10;
        }
        rect(holex2-10,holey2,100,300);
        holex2 =holex2 -10;
        if(holex2<-200){
            holex2 = 1300;
        }
        if(dist(charc.x,charc.y,holex2,holey2)<20){
            fall = true;
            yspeed = 10;
        }
        rectMode(CENTER); //sets our x,y to the mid
        //character
        fill(255);
        charc.draw();
        rectMode(CORNER);
        //gravity and jump
        charc.y = charc.y + yspeed;
        yspeed = yspeed + grav;
        if(key == ' ' && keyIsPressed){
          charc.spin = 0.3;
            if(timer<=1){
                timer = timer +1;
                //charc.spin = 0.4;
                yspeed = -15;
            }
        }
        if(fall === false){
            if(charc.y > 350){
                score = score + scorePlus;
                charc.y = 350;
                if(charc.y === 350){
                timer = 0;
                charc.spin = 0;
                charc.r = 0;
                } 
            }
        }
        if(fall === true){
            charc.spin = 0.3;
            //if(mousePressed){
            if(charc.y>650){
                background(255,0,0);
                charc.y = 650;
                if(charc.y === 650){
                    lives = lives - 1;
                    charc.x = 100;
                    charc.y = 100;
                    fall = false;
                    timer = 0;
                }    
            }
        //}
    }  
    }
    if(game === false && loseScreen === true){
        scorePlus = 0;
        background(0);
        textSize(36);
        fill(255);
       
        text("You're PARKOUR days are at an end..",100,250);
        fill(255,20,50);
        text("Your high score: " + score,200,350);
        fill(100);
        rect(200,375,300,100,100);
        fill(255);
        text("SPAM SPACE",225,425);
        /*
        if(mouseX>200 && mouseX<500){
            if(mouseY>375 && mouseY<475){
                if(mousePressed){
                    game = true;
                    loseScreen = false;
                }
            }
        }*/
        if(game === false && key == ' ' && keyIsPressed){
            game = true;
            loseScreen = false;
            lives = 3;
            
        }
    }
};