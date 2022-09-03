const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');


let level=0;
let lives = 3;
let elementsSize;
let canvasSize;
let timeStart;
let timePlayer;
let timeInterval;

//setTimeout(()=>console.log('oli'),1000); se ejecuta una vez
//setInterval(()=>console.log('oli'),1000); se ejecuta constantemente

/*
const intervalo = setInterval(()=>console.log('oli'),1000); se ejecuta constantemente
clearInterval(intervalo); detiene el intervalo

*/


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

window.addEventListener('load',setCanvasSize);//apenas cargue la pagina
window.addEventListener('resize',setCanvasSize);//cada vez que cambia el tamaño de la ventana

function setCanvasSize(){
    
    if(window.innerHeight>window.innerWidth){
        canvasSize = window.innerWidth*0.7;
    }else{
        canvasSize = window.innerHeight * 0.7;
    }
    canvasSize = Number(canvasSize.toFixed(0));
    canvas.setAttribute('height',canvasSize);
    canvas.setAttribute('width',canvasSize);
    
    elementsSize = canvasSize / 10;
    elementsSize = fixNumber(elementsSize);
    /*
    canvas.setAttribute('width',window.innerWidth*0.75);
    canvas.setAttribute('height',window.innerHeight*0.5);
    */
    //window.innerHeight nos da el heigh de la pagina
    //window.innerWidth

    /*
    game.fillRect(0,0,100,100);//trazar area: x,y, width, height
    game.clearRect(0,0,100,100);//borrar area
    */
    /*
    game.font = '25px Verdana';//les da propiedades al texto
    game.fillStyle='purple';
    game.textAlign='center';
    game.fillText('Hola',10,10); //colocar texto
    */
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}




function startGame(){
    game.font = elementsSize+'px Verdana';
    game.textAlign = 'right';

    const map = maps[level];

if(!map){
    gameWin();
    return;
}

if(!timeStart){
    timeStart = Date.now();//me da la fecha actual en milisegundos
    timeInterval = setInterval(showTime, 100);
    showRecord();
}
const mapRows = map.trim().split('\n');//trim quita los espacios
const mapRowsCols = mapRows.map(row=>row.trim().split(''));
//                          map nos ayuda a hacer arreglos a partir
//                          de arreglos. row=> agarra por cada fila
//                          del arreglo y hace algo.


/*
    for (let i = 1; i <= 10; i++) {
    game.fillText(emojis['X'],elementsSize+15,elementsSize*i-10);
        
    }
*/
    showLives();


    game.clearRect(0,0,canvasSize,canvasSize);
    enemyPosition = [];
    mapRowsCols.forEach((row,rowI)=>{
        row.forEach((col,colI)=>{//rowI y colI me devuelven la posicion actual del arreglo
            const emoji = emojis[col];
            let posX=elementsSize*(colI+1);//el canvas no permite el numero 0
            let posY=elementsSize*(rowI+1);

            posX = fixNumber(posX+6);
            posY = fixNumber(posY);

            if(col == 'O'){
                if(!playerPosition.x && !playerPosition.y){
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
        });//fin de  row.forEach((col,colI)=>
    });//fin de mapRowsCols.forEach((row,rowI)=>

    //en mapRowsCols hago un foreach donde agarro los row y por cada row
    //hago un foreach donde agarro las col y por cada col hago el codigo
    

    /*otra forma de hacerlo
    for (let row = 1; row <= 10; row++) {
        for (let col = 1;  col<= 10; col++) {
            game.fillText(emojis[mapRowsCols[row-1][col-1]] ,10+elementsSize*col,elementsSize*row);
        }
    }*/
    movePlayer();

}

function movePlayer(){
    //ambis son bool, por eso el == entre player x y gift x
    const giftCollisionX = playerPosition.x.toFixed(0) == giftPosition.x.toFixed(0);
    const giftCollisionY = playerPosition.y.toFixed(0) == giftPosition.y.toFixed(0);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision){
        levelWin();
    }

    const enemyCollision = enemyPosition.find(enemy=>{
        const enemyCollisionX = enemy.x.toFixed(0) == playerPosition.x.toFixed(0);
        const enemyCollisionY = enemy.y.toFixed(0) == playerPosition.y.toFixed(0);
        return enemyCollisionX && enemyCollisionY;//si ambos son true devuelve true
    });

    if(enemyCollision){
        levelFail();
    }

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);

}

function levelWin(){
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail(){
    lives--;
    console.log('Chocaste');
    if(lives<=0){
    level = 0;
    lives = 3;
    clearInterval(timeInterval);
    timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin(){
    clearInterval(timeInterval);//detiene el tiempo
    console.log('Ganaste');
    setRecord();
}

function setRecord(){
    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;
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
    const heartsArray = Array(lives).fill(emojis['HEART']);//[lives], me crea un array con la cantidad de lives y lo lleno con emojis
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));
    
}

function showTime(){
    spanTime.innerHTML = Date.now()-timeStart;
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time');
    pResult.innerHTML='Vamos!';
}

btnUp.addEventListener('click',moveUp);//addEventListener es para reaccionar 
// a cierto evento causado por algo especificado, en este caso click
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);
btnDown.addEventListener('click',moveDown);
window.addEventListener('keydown', moveByKeys);//esta funcion siempre envia un parametro

function moveByKeys(event){
    //console.log(event);
    if(event.key=='ArrowUp')moveUp();
    else if(event.key == 'ArrowLeft')moveLeft();
    else if(event.key == 'ArrowRight')moveRight();
    else if(event.key == 'ArrowDown')moveDown();
    
    
}

function moveUp(){
    //console.log('Me quiero mover hacia arriba');
    if((playerPosition.y-elementsSize)>=elementsSize){
        //element size es 40, si la posicion Y - 40 es 0, ya salio del canvas 
        playerPosition.y -= elementsSize;
        playerPosition.y = fixNumber(playerPosition.y);
        startGame();
    }
}

function moveLeft(){
    //console.log('Me quiero mover hacia la izquierda');
    if((playerPosition.x-elementsSize)>=elementsSize){
    playerPosition.x -= elementsSize;
    playerPosition.x = fixNumber(playerPosition.x);
    startGame();
    }
}

function moveRight(){
    //console.log('Me quiero mover hacia la de recha');
    if((playerPosition.x+elementsSize)<=canvasSize+elementsSize){
    playerPosition.x += elementsSize;
    playerPosition.x = fixNumber(playerPosition.x);
    startGame();
    }
}

function moveDown(){
    //console.log('Me quiero mover hacia abajo');
    if((playerPosition.y+elementsSize)<=canvasSize){
    playerPosition.y += elementsSize;
    playerPosition.y = fixNumber(playerPosition.y);
    startGame();
    }
}