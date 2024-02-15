"use client";
import Table from "@/components/table/Table";
import styles from "./index.module.css";
import { Fragment, useEffect, useState } from "react";
import { preloadImages, emojis, maps, maps2, maps3 } from "@/utils/Maps";
import { OnlineAction } from "@/services/checkRecordOnline";
export default function Home() {
  preloadImages();
  let canvas;
  let game;
  let WhatPlayer;
  let WhatEnemy;
  const [isPaused, setPaused] = useState(true);
  let pause = true;
  let level = 0;
  let lives = 3;
  let elementsSize;
  let canvasSize;
  let timeStart;
  let timeInterval;
  let zona_actual = 1;
  let spanTime;
  let pResult;
  let btnPlay;

  const playerPosition = {
    x: undefined,
    y: undefined,
  };

  const giftPosition = {
    x: undefined,
    y: undefined,
  };
  const instakill = {
    x: undefined,
    y: undefined,
  };

  let enemyPosition = [];

  //hacer que los numeros no superen el esquema 0.00
  const fixNumber = (n) => Number(n.toFixed(2));

  //dibujar un elemento en el canvas, player - bomba - door etc
  function Dibujar(objeto, x, y) {
    game.drawImage(
      emojis[objeto],
      x - elementsSize,
      y - elementsSize,
      elementsSize,
      elementsSize
    );
  }

  //reajustar el canvas con el rezise de la ventana
  function setCanvasSize() {
    canvasSize =
      (window.innerHeight > window.innerWidth
        ? window.innerWidth
        : window.innerHeight) * 0.6;
    canvasSize = Number(canvasSize.toFixed(0));
    canvas.setAttribute("height", canvasSize);
    canvas.setAttribute("width", canvasSize);

    elementsSize = canvasSize / 10;
    elementsSize = fixNumber(elementsSize);

    playerPosition.x = undefined;
    //redibujar mapa
    switchDrawingLevel();
  }

  //se llama al precionar el boton start
  function start() {
    pause = false;
    setPaused(pause);
    timeStart = 0;
    timeInterval = setInterval(uploadTimer, 100);
  }

  //redibuja el mapa dependiendo del nivel actual
  function switchDrawingLevel() {
    game.font = elementsSize + "px Verdana";
    showLives();
    //icono del jugador
    WhatPlayer = "PLAYER" + zona_actual;
    switch (zona_actual) {
      case 1:
        WhatEnemy = "X";
        canvas.style.backgroundColor = "#feff9d";
        getMapLevel(maps);
        break;
      case 2:
        WhatEnemy = "2";
        canvas.style.backgroundColor = "#eeeeee";
        getMapLevel(maps2);
        break;
      case 3:
        WhatEnemy = "3";
        canvas.style.backgroundColor = "#ffbbf5";
        getMapLevel(maps3);
        break;
    }

    if (!pause) {
      movePlayer();
    }
  }
  function showLives() {
    const spanLives = document.querySelector("#lives");
    spanLives.innerHTML = "";
    //dibujar corazones segun las vidas del usuario
    for (let i = 0; i < lives; i++) {
      let img = document.createElement("img");
      img.setAttribute("src", "png/corazon.png");
      img.setAttribute("width", "25px");
      img.setAttribute("height", "25px");
      spanLives.append(img);
    }
  }

  //obtener le diseño del mapa del nivel actual
  function getMapLevel(zonas) {
    const map = zonas[level];
    const mapRow = map.trim().split("\n");
    const mapRowsCol = mapRow.map((row) => row.trim().split(""));
    imprimirMapa(mapRowsCol);
  }

  //dibujar el diseño obtenido del mapa del nivel actual
  function imprimirMapa(mapRowsCols) {
    game.clearRect(0, 0, canvasSize, canvasSize);
    enemyPosition = [];

    mapRowsCols.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        let posX = elementsSize * (colI + 1);
        let posY = elementsSize * (rowI + 1);

        posX = fixNumber(posX);
        posY = fixNumber(posY);
        switch (col) {
          //la O es el player
          case "O":
            if (!playerPosition.x) {
              playerPosition.x = posX;
              playerPosition.y = posY;
            }
            break;
          //La I es la puerta de pasar de nivel
          case "I":
            giftPosition.x = posX;
            giftPosition.y = posY;
            break;
          //La x es una bomba
          case "X":
            enemyPosition.push({ x: posX, y: posY });
            col = WhatEnemy; //cambiar al enemigo
            break;
          //La M es  el instakill
          case "M":
            instakill.x = posX;
            instakill.y = posY;
            //la disfrazo de puerta
            col = "I";
            break;
        }
        //minetras no haya sido un espacio, dibujo el contenido
        if (col != "-") Dibujar(col, posX, posY);
        //si el juego esta pausado y la columna es un jugador, lo dibujo en la posicion 0
        if (pause && col == "O") {
          Dibujar(
            WhatPlayer,
            playerPosition.x,
            playerPosition.y,
            elementsSize,
            elementsSize
          );
        }
      });
    });
  }

  function movePlayer() {
    //detectar que algo haya chocado con el jugador
    function colisionConJugador(X, Y) {
      const x = playerPosition.x.toFixed(2) == X;
      const y = playerPosition.y.toFixed(2) == Y;
      return x && y;
    }

    const giftCollision = colisionConJugador(
      giftPosition.x.toFixed(2),
      giftPosition.y.toFixed(2)
    );

    if (giftCollision) {
      levelWin();
    }

    const enemyCollision = enemyPosition.find((enemy) => {
      return colisionConJugador(enemy.x.toFixed(2), enemy.y.toFixed(2));
    });

    if (enemyCollision) {
      deadAnimation();
    }

    if (instakill.x) {
      const instakillCollision = colisionConJugador(
        instakill.x.toFixed(2),
        instakill.y.toFixed(2)
      );
      if (instakillCollision) {
        lives = 0;
        deadAnimation();
      }
    }
    Dibujar(
      WhatPlayer,
      playerPosition.x,
      playerPosition.y + 1,
      elementsSize,
      elementsSize
    );
  }

  function deadAnimation() {
    //si tiene una vida es que murio por completo, sino mostrar animacion normal
    WhatPlayer = lives == 1 ? "M" : "BOMB" + zona_actual;
    clearInterval(timeInterval);
    pause = true;
    setPaused(pause);
    setTimeout(oneFail, 1000);
  }

  //choco con algo, pierde una vida
  function oneFail() {
    lives--;
    pause = false;
    setPaused(pause);
    //simular una pausa de 1s
    timeInterval = setInterval(uploadTimer, 100);
    //si perdio todas las vidas, reiniciar.
    if (lives <= 0) reinicio();
    playerPosition.x = undefined;
    //redibujar mapa
    switchDrawingLevel();
  }

  //se llama cada vez que pasa un mapa
  const levelWin = () => {
    //si todavia no superó los 2 mapas de un mundo
    if (level < 1) level++;
    //pasar al siguiente mundo
    else {
      level = 0;
      zona_actual++;
      //superó los 3 mundos, gana
      if (zona_actual > 3) gameWin();
    }
    //volver a dibujar el mapa
    switchDrawingLevel();
  };

  //se llama al ganar o al perder las 3 vidas
  function reinicio() {
    level = 0;
    zona_actual = 1;
    lives = 3;
    pause = true;
    setPaused(pause);
    spanTime.innerHTML = "0";
    clearInterval(timeInterval);
    playerPosition.x = undefined;
    instakill.x = undefined;
  }

  //superó los 3 mundos, gana
  function gameWin() {
    reinicio();
    setRecord();
    showRecord();
  }

  //comparar el recor obtenido con el record local
  function setRecord() {
    const recordTime = localStorage.getItem("record_time");
    const playerTime = timeStart;
    OnlineAction.comprobar(playerTime);
    if (recordTime) {
      if (recordTime > playerTime) {
        localStorage.setItem("record_time", playerTime);
        pResult.innerHTML = "Superaste tu record.";
      } else {
        pResult.innerHTML = "No superaste tu record.";
      }
    } else {
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "Es tu primera vez, NUEVO RECORD!";
    }
  }

  //se llama un un interval cada 1s
  function uploadTimer() {
    timeStart++;
    spanTime.innerHTML = timeStart;
  }
  function showRecord() {
    //obtener el recor local
    const playerTime = localStorage.getItem("record_time");
    //si no hay record local, mostrar el tiempo obtenido en el juego
    document.querySelector("#record").innerHTML = playerTime
      ? playerTime
      : timeStart;
  }
  function moveByKeys(event) {
    if (event.key == "Enter") enter();
    if (!pause) {
      switch (event.key) {
        case "ArrowUp":
          moveUp();
          break;
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowDown":
          moveDown();
          break;
      }
    }
  }
  function enter() {
    //si el boton play no esta oculto
    if (btnPlay.style.display != "none") start();
  }
  function moveUp() {
    if (playerPosition.y - elementsSize >= elementsSize) {
      playerPosition.y -= elementsSize;
      playerPosition.y = fixNumber(playerPosition.y);
      switchDrawingLevel();
    }
  }
  function moveLeft() {
    if (playerPosition.x - elementsSize >= elementsSize) {
      playerPosition.x -= elementsSize;
      playerPosition.x = fixNumber(playerPosition.x);
      switchDrawingLevel();
    }
  }
  function moveRight() {
    if (playerPosition.x + elementsSize < canvasSize + elementsSize) {
      playerPosition.x += elementsSize;
      playerPosition.x = fixNumber(playerPosition.x);
      switchDrawingLevel();
    }
  }
  function moveDown() {
    if (playerPosition.y + elementsSize <= canvasSize) {
      playerPosition.y += elementsSize;
      playerPosition.y = fixNumber(playerPosition.y);
      switchDrawingLevel();
    }
  }
  useEffect(() => {
    canvas = document.querySelector("#game");
    game = canvas.getContext("2d");

    window.addEventListener("keydown", moveByKeys);
    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    spanTime = document.querySelector("#time");

    pResult = document.querySelector("#result");
    btnPlay = document.getElementById("play");
    btnPlay.addEventListener("click", start);
    showRecord();
    setTimeout(setCanvasSize, 100);
  }, []);

  return (
    <Fragment>
      <Table />
      <main className={styles.main}>
        <div className={styles.messages}>
          <p>
            Vidas: <span id="lives"></span>
          </p>
          <p className={styles.time}>
            Tiempo ⏳: <span id="time"></span>
          </p>
          <p>
            Record 🏁: <span id="record"></span>
          </p>
          <p id="result"></p>
        </div>

        <canvas className={styles.canvas} id="game"></canvas>

        <div className={styles.controllersContainer}>
          <button className={styles.up} id="up" onClick={moveUp}>
            Arriba
          </button>
          <button className={styles.left} id="left" onClick={moveLeft}>
            Izquierda
          </button>
          <button className={styles.right} id="right" onClick={moveRight}>
            Derecha
          </button>
          <button className={styles.down} id="down" onClick={moveDown}>
            Abajo
          </button>
          <div className={styles.menu}>
            <button
              className={styles.play}
              id="play"
              style={{
                display: `${isPaused ? "inline-block" : "none"}`,
              }}
            >
              Play
            </button>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
