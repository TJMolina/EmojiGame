// Importar las imágenes
const player1 = new Image();player1.src = 'png/player1.png';
const player2 = new Image();player2.src = 'png/player2.png';
const player3 = new Image();player3.src = 'png/player3.png';
const bomb1 = new Image();bomb1.src = 'png/bomb.png';
const bomb2 = new Image();bomb2.src = 'png/2.png';
const bomb3 = new Image();bomb3.src = 'png/3.png';
const door = new Image();door.src = 'png/puerta.png';
const dead1 = new Image();dead1.src = 'png/dead1.png';
const dead2 = new Image();dead2.src = 'png/dead2.png';
const dead3 = new Image();dead3.src = 'png/dead3.png';
const m = new Image();m.src = 'png/m.png';
const obj = new Image(); obj.src = 'png/objetivo.png';

// Crear un objeto con las imágenes
const emojis = {
  '-': ' ',
  'O': door,
  'X': bomb1,
  '2': bomb2,
  '3': bomb3,
  'I': obj,
  'PLAYER1': player1,
  'PLAYER2': player2,
  'PLAYER3': player3,
  'BOMB1': dead1,
  'BOMB2': dead2,
  'BOMB3': dead3,
  'M': m,
};

// Crear un array de mapas
const maps = [];

maps.push(`
    OXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    --------IX
`);

maps.push(`
    IXXXXXXXXX
    ---------X
    XXXXXXXX-X
    X--------X
    X-XXXXXXXX
    X--------X
    XXXXXXXX-X
    X--------X
    X-XXXXXXXX
    X-------OX
`);

const maps2 = [];

maps2.push(`
    O------XXX
    XX-XXX--XX
    XX-XXX-XXX
    XX-XXX-XXX
    ----XX----
    -XXXXXXXX-
    ---X-I----
    XX-X-XX-XX
    XX----X-XX
    XXX--X--XX
`);

maps2.push(`
    I------XXX
    XX-XXX--XX
    XX-XXX-XXX
    XX-X---XXX
    --XX-XX---
    -XXX-XXXX-
    ---X-O--X-
    XX-X-XX-XX
    XX----X-XX
    XXX-----XX
`);

const maps3 = [];

maps3.push(`
    OXXXXXXXXX
    ---X---XXX
    -XX--X-XXX
    ----XX-XXX
    X--XX---XX
    X-XXX-X-XX
    X--XX-I-XX
    X-X---X-XX
    XX--XXX-XX
    XXXXXXXXXX
`);

maps3.push(`
    XXXXMXXXXX
    XXXX-XXXXX
    X--------X
    IXXX-XXX-X
    ---X--XX-X
    --XXX-XX-X
    X--XXO----
    X-XXXX-XXX
    --------XX
    XXXXXXXXXX
`);

// Exportar las imágenes y los mapas
export { emojis, maps, maps2, maps3 };
