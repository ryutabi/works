$(window).on('load', function() {
    $('#opening-wrapper').fadeIn(1500);
    setTimeout(type, 1500);
    setTimeout(fadeOut, 5500);

    setTimeout(() => {
        location.href = 'home.html';
    }, 7500);

})

function type() {
    $('#opening').t({
        speed: 55,
        blink: 500
    });
}

 function fadeOut() {
    $('#opening-wrapper').fadeOut(1500);
}