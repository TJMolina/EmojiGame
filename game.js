const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
let btnReset = document.querySelector('#reset');
let btnPlay = document.querySelector('#play');
let WhatPlayer;
let WhatEnemy;
let pause = true;
let level=0;
let lives = 3;
let elementsSize;
let canvasSize;
let timeStart;
let timeInterval;
let zona_actual;

showRecord();

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
}
const instakill = {
    x: undefined,
    y: undefined,
}

let enemyPosition = [];
const fixNumber = n=>Number(n.toFixed(2));
function Dibujar(objeto,x,y){
game.drawImage(emojis[objeto],x-elementsSize,y-elementsSize,elementsSize,elementsSize);
}


window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);
function setCanvasSize(){
    if(!maps[level])return;

    if(window.innerHeight>window.innerWidth){
        canvasSize = window.innerWidth*0.6;
    }else{
        canvasSize = window.innerHeight * 0.6;
    }
    canvasSize = Number(canvasSize.toFixed(0));
    canvas.setAttribute('height',canvasSize);
    canvas.setAttribute('width',canvasSize);
    
    elementsSize = canvasSize / 10;
    elementsSize = fixNumber(elementsSize);


    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();


}

function start(){
    pause = false;
    btnPlay.style.visibility='hidden';
    timeStart=0;
    timeInterval = setInterval(showTime, 100);
}

function cambiodezona(){
    if(zona_actual==1){
    WhatPlayer='PLAYER1';
    WhatEnemy = 'X';
    canvas.style.backgroundColor='#feff9d';
    }else if(zona_actual==2){
        WhatPlayer='PLAYER2';
        WhatEnemy = '2';
        canvas.style.backgroundColor='#eeeeee';
    }else{
      WhatPlayer='PLAYER3';
      WhatEnemy = '3';
      canvas.style.backgroundColor='#ffbbf5';
    }
}

function startGame(){
    game.font = elementsSize+'px Verdana';
    game.textAlign = 'right';
    showLives();
    if(level<maps.length){
        zona_actual = 1;
        level1()
    }
    else if((level-maps.length)<maps2.length){
        zona_actual = 2;
        level2()
    }else if((level-(maps.length+maps2.length))<=maps3.length){
      zona_actual = 3;
      level3();
    }
    if(!pause){movePlayer()}
}

function level1(){
    const map = maps[level];
    const mapRow = map.trim().split('\n');
    const mapRowsCol = mapRow.map(row=>row.trim().split(''));
    imprimirMapa(mapRow,mapRowsCol,map);
}
function level2(){
    const map = maps2[level-maps.length];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row=>row.trim().split(''));
    imprimirMapa(mapRows,mapRowsCols,map);
}
function level3(){
  const map = maps3[level-(maps.length+maps2.length)];
    if(!map){
    pause = true;
    gameWin();
}else{
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row=>row.trim().split(''));
    imprimirMapa(mapRows,mapRowsCols,map);}
}
function imprimirMapa(mapRows,mapRowsCols,map){
    game.clearRect(0,0,canvasSize,canvasSize);
    enemyPosition = [];
    instakill.x=undefined;
    instakill.y=undefined;
    cambiodezona();
    
    mapRowsCols.forEach((row,rowI)=>{
        row.forEach((col,colI)=>{
            let posX=elementsSize*(colI+1);
            let posY=elementsSize*(rowI+1);

            posX = fixNumber(posX);
            posY = fixNumber(posY);
            
            if(col == 'O'){
                if(!playerPosition.x){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }else if(col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if(col=='X'){
                enemyPosition.push({
                    x: posX,
                    y: posY,
                });
                col=WhatEnemy;//cambiar al enemigo
            }else if(col=='M'){
                instakill.x = posX;
                instakill.y = posY;
                col = 'I';
            }
            if(col!='-')Dibujar(col,posX,posY);
           if(pause&&col=='O'){game.drawImage(emojis[WhatPlayer],playerPosition.x-elementsSize,playerPosition.y-elementsSize,elementsSize,elementsSize)}
        });
    });
}


function movePlayer(){
        WhatPlayer = 'PLAYER'+zona_actual;
        function colisionConJugador(X,Y){
            const x = playerPosition.x.toFixed(2) == X;
            const y = playerPosition.y.toFixed(2) == Y;
            return x&&y;
        }

    const giftCollision = colisionConJugador(giftPosition.x.toFixed(2),giftPosition.y.toFixed(2));
    if(giftCollision){levelWin()}

    const enemyCollision = enemyPosition.find(enemy=>{
        return colisionConJugador(enemy.x.toFixed(2),enemy.y.toFixed(2));
    });
    if(enemyCollision){deadAnimation();}
    
    if(instakill.x){
        const instakillCollision = colisionConJugador(instakill.x.toFixed(2),instakill.y.toFixed(2));
        if(instakillCollision){lives=0;deadAnimation()}
    }
    game.drawImage(emojis[WhatPlayer],playerPosition.x-elementsSize,playerPosition.y-elementsSize+1,elementsSize,elementsSize);
    
}

    btnUp.addEventListener('click',moveUp);
    btnLeft.addEventListener('click',moveLeft);
    btnRight.addEventListener('click',moveRight);
    btnDown.addEventListener('click',moveDown);
    window.addEventListener('keydown', moveByKeys);

const levelWin=()=>{level++;startGame();}

function reinicio(){
    level = 0;
    lives = 3;
    pause = true;
    spanTime.innerHTML = '0';
    clearInterval(timeInterval);
    timeStart = undefined;
    btnReset.style.visibility = 'hidden';
    btnPlay.style.visibility = 'visible';
    playerPosition.x = undefined;
    showRecord();
    startGame();
}


function levelFail(){
    lives--;
    pause = false;
    timeInterval = setInterval(showTime,100);
    if(lives<=0){reinicio()}
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin(){
    clearInterval(timeInterval);
    setRecord();
    btnReset.style.visibility = 'visible';
}

function setRecord(){
    console.log('set record');
    const recordTime = localStorage.getItem('record_time');
    const playerTime = timeStart;
    if(recordTime){
        if(recordTime>playerTime){
          if(playerTime>160)
          {
            localStorage.setItem('record_time',playerTime);
            pResult.innerHTML='Superaste tu record.';
          }
        }else{
            pResult.innerHTML='No superaste tu record.';
        }
    }else{
        localStorage.setItem('record_time',playerTime);
        pResult.innerHTML='Es tu primera vez, NUEVO RECORD!';
    }
    if(playerTime>160)
    {
      comprobar(playerTime);
    }
    
}

function showLives(){
    const heartsArray = Array(lives).fill(emojis[lives]);
    spanLives.innerHTML = "";

    heartsArray.forEach(corazo=>{
        let img = document.createElement('img');
        img.setAttribute("src","png/corazon.png");
        img.setAttribute("width","25px");
        img.setAttribute("height","25px");
        spanLives.append(img);
    }); 


}

function showTime(){
    timeStart++;
    spanTime.innerHTML = timeStart;
}

function showRecord(){spanRecord.innerHTML = localStorage.getItem('record_time');pResult.innerHTML='Vamos!';}

function deadAnimation(){
    if(lives==1)WhatPlayer = 'M';
        else WhatPlayer='BOMB'+zona_actual;
    clearInterval(timeInterval);
    pause = true;
    setTimeout(levelFail,1000);
}

function moveByKeys(event){
    if(!pause){
        if(event.key=='ArrowUp')moveUp();
        else if(event.key == 'ArrowLeft')moveLeft();
        else if(event.key == 'ArrowRight')moveRight();
        else if(event.key == 'ArrowDown')moveDown();
    }
    if(event.key == 'Enter')enter();
}

function enter(){
  if(btnPlay.style.visibility != 'hidden')start();
  else if(btnReset.style.visibility == 'visible')reinicio();
}

function moveUp(){
    if(!pause){
        if((playerPosition.y-elementsSize)>=elementsSize){
            playerPosition.y -= elementsSize;
            playerPosition.y = fixNumber(playerPosition.y);
            startGame();
        }
    }
}
function moveLeft(){
    if(!pause){
        if((playerPosition.x-elementsSize)>=elementsSize){
            playerPosition.x -= elementsSize;
            playerPosition.x = fixNumber(playerPosition.x);
            startGame();
            }
    }
}

function moveRight(){
    if(!pause){
        if((playerPosition.x+elementsSize)<canvasSize+elementsSize){
            playerPosition.x += elementsSize;
            playerPosition.x = fixNumber(playerPosition.x);
            startGame();
            }
    }

}

function moveDown(){
    if(!pause){
        if((playerPosition.y+elementsSize)<=canvasSize){
            playerPosition.y += elementsSize;
            playerPosition.y = fixNumber(playerPosition.y);
            startGame();
            }
    }
}

activarTabla();
