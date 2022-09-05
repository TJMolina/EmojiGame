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


let pause = true;
let level=0;
let lives = 3;
let elementsSize;
let canvasSize;
let timeStart;
let timeInterval;
showRecord();

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPosition = [];

function fixNumber(n){
    return Number(n.toFixed(2));
}

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize(){
    if(!maps[level])return;//nuevo

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



function startGame(){
    game.font = elementsSize+'px Verdana';
    game.textAlign = 'right';
    const map = maps[level];

if(!map){
    gameWin();
    return;
}

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row=>row.trim().split(''));

    showLives();

    game.clearRect(0,0,canvasSize,canvasSize);
    enemyPosition = [];
    mapRowsCols.forEach((row,rowI)=>{
        row.forEach((col,colI)=>{
            const emoji = emojis[col];
            let posX=elementsSize*(colI+1);
            let posY=elementsSize*(rowI+1);

            posX = fixNumber(posX+6);
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
            }

            game.fillText(emoji,posX,posY);
        });
    });


    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);

    if(!pause){
        movePlayer();
}

}


function movePlayer(){
    let WhatPlayer = 'PLAYER';
    const giftCollisionX = playerPosition.x.toFixed(0) == giftPosition.x.toFixed(0);
    const giftCollisionY = playerPosition.y.toFixed(0) == giftPosition.y.toFixed(0);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision){
        levelWin();
    }

    const enemyCollision = enemyPosition.find(enemy=>{
        const enemyCollisionX = enemy.x.toFixed(0) == playerPosition.x.toFixed(0);
        const enemyCollisionY = enemy.y.toFixed(0) == playerPosition.y.toFixed(0);
        return enemyCollisionX && enemyCollisionY;
    });

    if(enemyCollision){
        deadAnimation();
        WhatPlayer='BOMB_COLLISION';
    }

    game.fillText(emojis[WhatPlayer],playerPosition.x,playerPosition.y);

}


    btnUp.addEventListener('click',moveUp);
    btnLeft.addEventListener('click',moveLeft);
    btnRight.addEventListener('click',moveRight);
    btnDown.addEventListener('click',moveDown);
    window.addEventListener('keydown', moveByKeys);


function levelWin(){
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail(){
    lives--;
    pause = false;
    timeInterval = setInterval(showTime,100);
    if(lives<=0){
    level = 0;
    lives = 3;
    pause = true;
    spanTime.innerHTML = '0';
    clearInterval(timeInterval);
    timeStart = undefined;
    btnPlay.style.visibility = 'visible';
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin(){
    clearInterval(timeInterval);
    setRecord();
    btnReset.style.visibility='visible';
}

function setRecord(){
    const recordTime = localStorage.getItem('record_time');
    const playerTime = timeStart;
    if(recordTime){
        if(recordTime>playerTime){
            localStorage.setItem('record_time',playerTime);
            pResult.innerHTML='Superaste el record.';
        }else{
            pResult.innerHTML='No superaste el record.';
        }
    }else{
        localStorage.setItem('record_time',playerTime);
        pResult.innerHTML='Es tu primera vez, NUEVO RECORD!';
        console.log({recordTime,playerTime});
    }
}

function showLives(){
    const heartsArray = Array(lives).fill(emojis['HEART']);
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));
    
}

function showTime(){
    timeStart++;
    spanTime.innerHTML = timeStart;
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time');
    pResult.innerHTML='Vamos!';
}

function deadAnimation(){
    clearInterval(timeInterval);
    pause = true;
    let timeout = setTimeout(levelFail,1000);
}

function moveByKeys(event){

    if(!pause){
        if(event.key=='ArrowUp')moveUp();
        else if(event.key == 'ArrowLeft')moveLeft();
        else if(event.key == 'ArrowRight')moveRight();
        else if(event.key == 'ArrowDown')moveDown();
    }
    
    
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
        if((playerPosition.x+elementsSize)<=canvasSize+elementsSize){
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
