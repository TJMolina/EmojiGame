
/*
Reglas: El final de cada nivel debe ser el inicio del siguiente
*/
const emojis = {
'-':' ',
'O':'🚪',
'X':'💣',
'2':'⛄',
'I':'😣',
'PLAYER1':'😘',
'PLAYER2':'😬',
'BOMB_COLLISION':'🤯',
'BOMB_COLLISION2':'🥶',
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
    IXXXXXXXXX
`);

maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`);




maps.push(`
    OXXXXXXXXX
    ---------X
    XXXXXXXX-X
    X--------X
    X-XXXXXXXX
    X--------X
    XXXXXXXX-X
    X--------X
    X-XXXXXXXX
    X-------IX
`);

maps.push(`
    I-X-X-X-X-
    ----------
    -X-X-X-X-X
    ----------
    X-X-X-X-X-
    ----------
    -X-X-X-X-X
    ----------
    X-X-X-X-X-
    --------O-
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
    XXX-----XX
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



maps2.push(`
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

maps2.push(`
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