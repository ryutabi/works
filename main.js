$('#opening-wrapper').fadeIn(1500);
setTimeout(type, 1500);
setTimeout(fadeOut, 5500);
setTimeout(showHome, 7000);

function type() {
    $('#opening').t({
        speed: 55,
        blink: 500
    });
}

 function fadeOut() {
    $('#opening-wrapper').fadeOut(1500);
}

 function showHome() {
    $('#main').fadeIn(1000);
}

$('home').click(function() {
    $('#main').fadeIn(1000);
})