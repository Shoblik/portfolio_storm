$(document).ready(function() {
   initializeApp();
});

function initializeApp() {
   leftToRightFlip();
}

function leftToRightFlip() {
    let screenWidth = window.innerWidth;
    let tileWidth = $('.flip-container').css('width');
    for (let i = 0; i < tileWidth.length; i++) {
        if (tileWidth[i] === 'p') {
            tileWidth = tileWidth.slice(0, i);
        }
    }
    let columnMultiplier = Math.ceil(screenWidth / tileWidth);

    let screenHeight = window.innerHeight;
    let tileHeight = $('.flip-container').css('height');
    for (let i = 0; i < tileHeight.length; i++) {
        if (tileHeight[i] === 'p') {
            tileHeight = tileHeight.slice(0, i);
        }
    }
    let rowMultiplier = Math.ceil(screenHeight / tileWidth);

    //column iterator
    let timer = 0;
    for (let row = 0; row < rowMultiplier; row++) {
        for (let column = 0; column < columnMultiplier; column++) {
            setTimeout(function() {
                    $($('.flipper')[row * 40 + column]).css('transform', 'rotateY(180deg)');
                }, timer);
                timer += 5;
            if (column + 1 === columnMultiplier) {
                timer = 0;
            }
        }
    }
}

// function createTile(tileCount) {
//     for (let i = 0; i < tileCount; i++) {
//
//     }
// }