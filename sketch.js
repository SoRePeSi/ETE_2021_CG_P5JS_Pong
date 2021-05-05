// Hey there

// Parâmetros iniciais (sem loop)
// Initial parameters (no loop)
function setup(){
  gameOn = false;
  winner = 0;
  
  // Parâmetros da bola
  // Ball parameters
  ballX = window.innerWidth/2;
  ballY = window.innerHeight/2;
  ballR = 24;
  createCanvas(window.innerWidth, window.innerHeight);
  speedX = 3;
  speedY = 2;
  
  // Parâmetros dos jogadores
  // Player parameters
  leftUp = false;
  leftDown = false;
  rightUp = false;
  rightDown = false;
  
  widthLR = window.innerWidth/30;
  playerXL = window.innerWidth/10;
  playerXR = window.innerWidth*9/10;
  playerYL = (window.innerHeight-widthLR)/2;
  playerYR = (window.innerHeight-widthLR)/2;
  speedL = 5;
  speedR = 5;
  heightL = window.innerHeight/6;
  heightR = window.innerHeight/6;
  
  // Parâmetros do placar
  // Scoreboard parameters
  pontoL = 0;
  pontoR = 0;
  winL = 0;
  winR = 0;
  placar = pontoL + " " + winL +"/"+ winR + " " + pontoR;
}

// Em loop
// Looping
function draw() {
  background(0);
  
  drawPlacar();
  
  // Movimento dos jogadores
  // Player movement
  keyPressed = function(){
    // Esquerda
    if(keyCode==87){
      leftUp = true;
    }
    if(keyCode==83){
      leftDown = true;
    }
    // Direita
    if(keyCode==38){
      rightUp = true;
    }
    if(keyCode==40){
      rightDown = true;
    }
  }
  keyReleased = function(){
    // Esquerda
    if(keyCode==87){
        leftUp = false;
    }
    if(keyCode==83){
        leftDown = false;
    }
    // Direita
    if(keyCode==38){
      rightUp = false;
    }
    if(keyCode==40){
      rightDown = false;
    }
  }
  
  // Esquerda
  // Left
  if((leftUp==true)&&(playerYL>0)){
    playerYL -= speedL;
  }
  if((leftDown==true)&&(playerYL+heightL<window.innerHeight)){
    playerYL += speedL;
  }
  // Direita
  // Right
  if((rightUp==true)&&(playerYR>0)){
    playerYR -= speedR;
  }
  if((rightDown==true)&&(playerYR+heightR<window.innerHeight)){
    playerYR += speedR;
  }
  
  // Jogo correndo, telas de início e fim de jogo
  // Game going, game start and end screens
  if(gameOn==true){
    GoleiroEsquerdo = Goleiro(playerXL, playerYL, widthLR, heightL, 87, 83);
    GoleiroDireito = Goleiro(playerXR-widthLR, playerYR, widthLR, heightR, 38, 40);

    ball(ballX, ballY, 25);
  }
  else if(gameOn==false){
    if(winner==0){
      
      textAlign(CENTER);
      fill("#FFFFFF");
      textSize(30);
      text("Press space to start", window.innerWidth/2, window.innerHeight/2);
      
      keyPressed = gameStart();
    }
    else{
      if(winL>winR){
        winner = 1;
      }
      else if(winR>winL){
        winner = 2;
      }
      
      textSize(60);
      textAlign(CENTER);
      fill("#FFFFFF");
      text("P"+winner+" WINS!", window.innerWidth/2, window.innerHeight/2);
      textSize(30);
      text("Press space to restart", window.innerWidth/2, window.innerHeight/2+50);
      
      keyPressed = gameStart();
    }
  }
}

// Bola
// Ball
function ball(x, y, r){
  var ball = circle(x, y, r);
  ballX += speedX;
  ballY += speedY;
  
  collision();
}

// Objeto jogador
// Player object
function Goleiro(posX, posY, wid, hei, u, d){

  rect(posX, posY, wid, hei);
}

// Definições de colisão da bola
// Ball collision definitions
function collision(){
  // Colisão com as paredes
  // Wall collision
  if(ballX>=window.innerWidth-ballR/2){
    speedX *= -1;
    pontuacao("l", "parede");
  }
  else if(ballX<=ballR/2){
    speedX *= -1
    pontuacao("r", "parede");
  }
  // Colisão com o teto
  // Ceiling collision
  if((ballY>=window.innerHeight-ballR/2)||(ballY<=ballR/2)){
    speedY = speedY*-1
  }
  
  // Colisão com os jogadores
  // Player collision
  
  // Esquerdo
  // Left
  if((speedX<0)&&(ballX-12.5<=playerXL+widthLR)&&(ballX>=playerXL+widthLR)&&(ballY+12.5>=playerYL)&&(ballY-12.5<=playerYL+heightL)){
    speedX *= -1;
    pontuacao("l", "raquete");
  }
  if((speedX>0)&&(ballX+12.5>=playerXL)&&(ballX<=playerXL)&&(ballY+12.5>=playerYL)&&(ballY-12.5<=playerYL+heightL)){
    speedX *= -1;
  }
  // Direito
  // Right
  if((speedX>0)&&(ballX+12.5>=playerXR-widthLR)&&(ballX<=playerXR-widthLR)&&(ballY+12.5>=playerYR)&&(ballY-12.5<=playerYR+heightR)){
    speedX *= -1;
    pontuacao("r", "raquete");
  }
  if((speedX<0)&&(ballX-12.5<=playerXR)&&(ballX>=playerXR)&&(ballY+12.5>=playerYR)&&(ballY-12.5<=playerYR+heightR)){
     speedX *= -1;
     }
}

// Contador de pontuação
// Score counter
function pontuacao(goleiro, onde){
  var ponto;
  
  if(goleiro=="l"){
    if(onde=="parede"){
      ponto = 10;
      winL++;
      
      if(winL%2==0){
        heightL = heightL*3/4;
      }
    }
    else if(onde=="raquete"){
      ponto = 5;
    }
    ponto *= pow(10, ceil(winL/3));
    pontoL += ponto;
  }
  else if(goleiro=="r"){
    if(onde=="parede"){
      ponto = 10;
      winR++;
      
      if(winR%2==0){
        heightR = heightR*3/4;
      }
    }
    else if(onde=="raquete"){
      ponto = 5;
    }
    ponto *= pow(10, ceil(winR/3));
    pontoR += ponto;
  }
  placar = pontoL + " " + winL +"/"+ winR + " " + pontoR;
  ponto = 0;
  
  if(onde=="parede"){
    if((winR+winL)%5==0){
      if(speedX>0){
        speedX++;
      }
      else{
        speedX--;
      }
      if(speedY>0){
        speedY++;
      }
      else{
        speedY--;
      }
      speedL += 2;
      speedR += 2;
    }
  }
  
  if(winL==10){
    gameOn = false;
    winner = 1;
  }
  else if(winR==10){
    gameOn = false;
    winner = 2;
  }
}

// Desenhar o placar
// Draw scoreboard
function drawPlacar(){
  textSize(40);
  textAlign(CENTER);
  fill("#FFFFFF");
  text(placar, window.innerWidth/2, window.innerHeight/10);
}

// Iniciar jogo
// Start game
function gameStart(){
  if(keyCode==32){
    winner = 0;
    gameOn = true;
    winL = 0;
    winR = 0;
    pontoL = 0;
    pontoR = 0;

    playerYL = (window.innerHeight-widthLR)/2;
    playerYR = (window.innerHeight-widthLR)/2;
    speedL = 5;
    speedR = 5;
    heightL = window.innerHeight/6;
    heightR = window.innerHeight/6;

    ballX = window.innerWidth/2;
    ballY = window.innerHeight/2;
    speedX = 3;
    speedY = 2;


    placar = pontoL + " " + winL +"/"+ winR + " " + pontoR;
    drawPlacar();
  }
}