// Importar las imágenes
const emojis = {};
const preloadImages = ()=>{
    const imagePaths = {
        '-': ' ',
        'O': '/png/puerta.png',
        'X': '/png/bomb.png',
        '2': '/png/2.png',
        '3': '/png/3.png',
        'I': '/png/objetivo.png',
        'PLAYER1': '/png/player1.png',
        'PLAYER2': '/png/player2.png',
        'PLAYER3': '/png/player3.png',
        'BOMB1': '/png/dead1.png',
        'BOMB2': '/png/dead2.png',
        'BOMB3': '/png/dead3.png',
        'M': '/png/m.png',
      };
    
      for (const key in imagePaths) {
        try{
            const img = new Image();
            img.src = imagePaths[key];
            emojis[key] = img;
        }
        catch(e){
            preloadImages();
            break;
        }
      }
}

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
export { preloadImages,emojis, maps, maps2, maps3 };
