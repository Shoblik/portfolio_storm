let rowMultiplier = null;
let columnMultiplier = null;

$(document).ready(function() {
    parseTileDimensions();
    initializeApp();
});

function initializeApp() {
    setInterval(function() {
        bottomLeftToTopRight();
    }, 3500);
}
function parseTileDimensions() {
    let screenWidth = window.innerWidth;
    let tileWidth = $('.flip-container').css('width');
    for (let i = 0; i < tileWidth.length; i++) {
        if (tileWidth[i] === 'p') {
            tileWidth = tileWidth.slice(0, i);
        }
    }
    columnMultiplier = Math.floor(screenWidth / tileWidth);

    let screenHeight = window.innerHeight;
    let tileHeight = $('.flip-container').css('height');
    for (let i = 0; i < tileHeight.length; i++) {
        if (tileHeight[i] === 'p') {
            tileHeight = tileHeight.slice(0, i);
        }
    }
    rowMultiplier = Math.ceil(screenHeight / tileWidth);
}


function bottomLeftToTopRight() {
    //column iterator
    let timer = 0;
    for (let row = 0; row < rowMultiplier; row++) {
        for (let column = 0; column < columnMultiplier; column++) {
            setTimeout(function() {
                $($('.flipper')[row * (columnMultiplier + 1) + column]).toggleClass('flipped');
            }, timer);
            timer += 100;
            if (column + 1 === columnMultiplier) {
                timer = 0;
            }
        }
    }
}

function leftToRight() {
    let timer = 0;
    for (let row = 0; row < rowMultiplier; row++) {
        for (let column = 0; column < columnMultiplier; column++) {
            setTimeout(function() {
                $($('.flipper')[row * columnMultiplier + column]).toggleClass('flipped');
                if (row === 0 && column === 0) {
                    console.log($($('.flipper')[row * columnMultiplier + column]))
                }
            }, timer);
            timer += 100;
            if (column + 1 === columnMultiplier) {
                timer = 0;
            }
        }
    }
}

