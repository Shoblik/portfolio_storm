$(document).ready(function() {
moveHeader();
moveMain();
});

function moveHeader() {
    $('.title').css({
        'top': '24vh',
        'transition': '2s'
    })
}
function moveMain() {
    console.log('working');
    setTimeout(function() {
        $('.aboutMe, .about').css({
            'top': '7%',
            'transition': '1s'
        })
    }, 1800);
}