$(document).ready(function () {
    //// REmove the mouseover to get back to our previous working product
    // $('.contentWrapper').on('mouseover', function () {
        $('.contentWrapper').on('mousemove', function () {
            // if (circleLimit < 0) {


                launch.newCircle();
                circleLimit = 0;
            // } else {
            //     // circleLimit++;
            // }
            if (rocketShipOption) {
                launch.rocketBoost();
            } else {
                $('.rocket > img').css({'visibility': 'hidden'});
            }
        });

    // });
    $('.navbar2').on('mouseover', function () {
        $('.rocket > img').css({'visibility': 'hidden'});
    })
    $('.navbar2').on('mouseout', function () {
        $('.rocket > img').css({'visibility': 'visible'});
    })
    // shortcut for making everything dissapear on click
    // $('body').on('click', function() {
    //     $('.circle').remove();
    // })

    $('.contentWrapper').on('transitionend', '.circle', function () {
        $(this).remove();
    });
var circleLimit = 0;
    //*****************Toggle the rocket****************************//
    $('.rocketToggle').on('click', function () {
        if ($('.rocketToggle').hasClass('selected')) {
            $('.rocketToggle').toggleClass('selected');
            $('.rocket > img').css({'visibility': 'hidden'});
            rocketShipOption = false;
        } else {
            $('.rocketToggle').addClass('selected');
            $('.rocket > img').css({'visibility': 'visible'});
            rocketShipOption = true;
        }
    })
    ///////////////////Ball size/////////////////////////////////////////////////
    $('#ballSizePx').on('click', function () {
        $(document).keypress(function (e) {
            if (e.which == 13) {
                launch.maxSize = $('#ballSizePx').val();
                $('.ballSize').addClass('selected');

            }
        });
    });
    $('#transitionTime').on('click', function () {
        $(document).keypress(function (e) {
            if (e.which == 13) {
                launch.transitionTime = $('#transitionTime').val();
                $('.transTime').addClass('selected');

            }
        });
    });
    $('#randomSizeCheckbox').on('click', function() {
        $('.randomSize').toggleClass('selected');
    });
    $('#transitionDelayInput').on('click', function () {
        $(document).keypress(function (e) {
            if (e.which == 13) {
                launch.transitionDelay = $('#transitionDelayInput').val();
                $('.transDelay').addClass('selected');
            }
        });
    });
    $('#randomTransitionTime').on('click', function() {
        $('.randomTransTime').toggleClass('selected');
    })
    $('#linearTransitionCheckbox').on('click', function() {
        $('.linearTransition').toggleClass('selected');
    })

});
var rocketShipOption = false;


function Makecircles(maxTransTime, maxSize) {
    this.transitionDelay = 0;
    this.maxSize = maxSize;
    this.getRandom = function (max) {
        return Math.floor(Math.random() * max) + 1;
    };
    this.newCircle = function () {

        if ($('#randomSizeCheckbox').is(':checked')) {
            var size = this.size();
        } else {
            var size = this.maxSize;
        }

        if ($('#randomTransitionTime').is(':checked')) {
            var transTime = this.getRandom(this.transitionTime);
        } else {
            var transTime = this.transitionTime;
        }


        var newCircle = $('<div>').addClass('circle').css({
            'top': event.clientY + 'px',
            'left': event.clientX + 'px',
            // 'top': '50vh',
            // 'left': '20%',
            'background-color': 'rgb(' + this.getRandom(255) + ',' + this.getRandom(255) + ',' + this.getRandom(255) + ')',
            'transition': transTime + 's',
            'height': size + 'px',
            'width': size + 'px',
            'transition-delay': this.transitionDelay + 's',
        });

        this.circleDiv = newCircle;

        this.renderCircleOnDOM(this.circleDiv);

        this.setting1(this.circleDiv);


    }
    this.circleDiv = null;
    this.size = function () {
        return this.getRandom(this.maxSize);
    };
    this.maxRandomSizeTransition = 200;
    this.transitionTime = maxTransTime;
    this.renderCircleOnDOM = function (newCircle) {

        $('body').append(newCircle); //If problems test by making this global
    };
    this.setting1 = function (circle) {

            if ($('#linearTransitionCheckbox').is(':checked')) {
                var topTransition = Math.floor(Math.random() * 101) + '%';
            } else {
                var topTransition = $(circle).css('top') + 'px';
            }
            if ($('#randomResizeCheckbox').is(':checked')) {
                console.log(this);
                var size = this.getRandom(this.maxRandomSizeTransition);
            } else {
                var size = $('.circle').css('width');
            }
            setTimeout(function () {
            $(circle).css({
                'transition-timing-function': 'linear',
                'left': '120%',
                // 'top': Math.floor(Math.random() * window.screen.height) + 'px',
                'top': topTransition,
                'height': size + 'px',
                'width': size + 'px',

                // 'left':getRandom(window.screen.width) + 'px',
            });
            if ($(circle).css('left') > 100) {
                $(circle).remove();
            }
        }, 0)
    };

    this.rocketBoost = function () {
        $('.rocket').css({
            'top': event.screenY + 'px',
            'left': event.screenX + 'px',

        });
    }
    // this.shootBalls = function() {
    //     setInterval(function() {
    //         if ($('.circle').length < 600) {
    //             this.newCircle();
    //
    //         }
    //     },500);
    // }


}

var launch = new Makecircles(7, 80);

// var launch = new Makecircles(8, 100);

// setInterval(function() {
//     console.log('working');
//     if ($('.circle').length < 600) {
//         launch.newCircle();
//     }
// }, 500);

// function makeCircles() {
//
//             var size = getRandom(50);
//             var newCircle = $('<div>').addClass('circle').css({
//                 'top': event.clientY + 'px',
//                 'left': event.clientX + 'px',
//                 'background-color': 'rgb(' + getRandom(255) + ',' + getRandom(255) + ',' + getRandom(255) + ')',
//                 'transition': getRandom(7) + 's',
//                 'height': size + 'px',
//                 'width': size + 'px',
//
//             });
//             $('body').append(newCircle);
//             setTimeout(function () {
//                 mobility(newCircle);
//             }, 0);
//
// }
//
// function getRandom(max) {
//     return Math.floor(Math.random() * max);
// }
// function mobility(circle) {
//     $(circle).css({
//         'transition-timing-function': 'linear',
//         'left': '105%',
//         // 'top': getRandom(window.screen.height) + 'px',
//         // 'left':getRandom(window.screen.width) + 'px',
//     })
//     console.log($(circle).position()['left']/window.screen.width * 100)
//     if ($(circle).position()['left']/window.screen.width * 100 >= 94) {
//         $(circle).remove();
//     }
// }