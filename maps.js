/*
Reglas: El final de cada nivel debe ser el inicio del siguiente
*/
var player1 = new Image();player1.src = 'png/player1.png';
var player2 = new Image();player2.src = 'png/player2.png';
var player3 = new Image();player3.src = 'png/player3.png';
var bomb1 = new Image();bomb1.src = 'png/bomb.png';
var bomb2 = new Image();bomb2.src = 'png/2.png';
var bomb3 = new Image();bomb3.src = 'png/3.png';
var door = new Image();door.src = 'png/puerta.png';
var dead1 = new Image();dead1.src = 'png/dead1.png';
var dead2 = new Image();dead2.src = 'png/dead2.png';
var dead3 = new Image();dead3.src = 'png/dead3.png';
var m = new Image();m.src = 'png/m.png';
var obj = new Image(); obj.src = 'png/objetivo.png';



const emojis = {
'-':' ',
'O':door,
'X':bomb1,
'2':bomb2,
'3':bomb3,
'I':obj,
'PLAYER1':player1,
'PLAYER2':player2,
'PLAYER3':player3,
'BOMB1':dead1,
'BOMB2':dead2,
'BOMB3':dead3,
'M':m,
};

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



/*
maps.push(`
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
`);



*/