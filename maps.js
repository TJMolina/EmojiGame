
/*
Reglas: El final de cada nivel debe ser el inicio del siguiente
*/
const emojis = {
'-':' ',
'O':'🚪',
'X':'💣',
'I':'😖',
'PLAYER':'😘',
'BOMB_COLLISION':'🤢',
'GAME_OVER':'🤯',
'WIN':'🏆',
'HEART': '❤️',
};

const maps = [];

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
    I-XXXXXXXX
    X--XXXX-XX
    XX----X-XX
    X--XX-X-XX
    X-XXX-X-XX
    X-XXX---XX
    X---XX-XXX
    --X--X-XXX
    -XXX---XXX
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