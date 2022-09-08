
/*
Reglas: El final de cada nivel debe ser el inicio del siguiente
*/
const emojis = {
'-':' ',
'O':'🚪',
'X':'💣',
'2':'⛄',
'3':'🔥',
'I':'😣',
'PLAYER1':'😘',
'PLAYER2':'😬',
'PLAYER3':'😓',
'BOMB1':'🤯',
'BOMB2':'🥶',
'BOMB3':'🥵',
'M':'☠️',
'WIN':'🏆',
'HEART': '❤️',
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