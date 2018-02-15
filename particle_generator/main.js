$(document).ready(function () {
    launch.renderHistorySelection();

    const el = document.getElementById('contentWrapper');
    el.addEventListener('touchmove', function(e) {
        for (let i=0; i<launch.multiplier; i++) {
            launch.newCircle(e.touches[0].clientX, e.touches[0].clientY);
        }
    })

        $('#contentWrapper').on('mousemove', function () {
            for(let i=0; i<launch.multiplier; i++) {
                launch.newCircle(event.clientX, event.clientY);
            }
            if (rocketShipOption) {
                launch.rocketBoost();
            } else {
                $('.rocket > img').css({'visibility': 'hidden'});
            }
        });
    $('#contentWrapper').on('click', function(e) {
            for (let i = 0; i < launch.splatterMultiplier; i++) {
                launch.newCircle(event.clientX, event.clientY);
            }
    });
    $('.navbar').on('mouseover', function () {
        $('.rocket > img').css({'visibility': 'hidden'});
    })
    $('.navbar').on('mouseout', function () {
        $('.rocket > img').css({'visibility': 'visible'});
    });
    $('#contentWrapper').on('transitionend', '.circle', function () {
        $(this).remove();
    });
    $('.linkedIn').on('click', function() {
        var win = window.open('https://www.linkedin.com/in/simon-hoblik-335073148/', '_blank');
        win.focus();
    });
    $('.github').on('click', function() {
        var win = window.open('https://github.com/Shoblik', '_blank');
        win.focus();
    });
    $('.webPortfolio').on('click', function() {
        var win = window.open('https://simonhoblik.com', '_blank');
        win.focus();
    });
    $('.resetBtn').on('click', function() {
       launch =  new Makecircles(4, 80);
       if ($('.randomColorBtn').hasClass('btn-success')) {
           $('.randomColorBtn').removeClass('btn-success').addClass('btn-danger');
       }
       $('.colorDiv').remove();
        $('#randomTransitionTime')[0].checked = true;
        $('.randomTransTime').addClass('selected');

        $('#randomSizeCheckbox')[0].checked = true;
        $('.randomSize').addClass('selected');

        $('#linearTransitionCheckbox')[0].checked = true;
        $('.linearTransition').addClass('selected');

        $('#randomResizeCheckbox')[0].checked = false;
        $('.randomResize').removeClass('selected');

        $('#').css('background-color', 'black');
       $('input').val('');
    });
    $('.multiplierInput').on('input', function() {
        let multiplierInput = $('.multiplierInput').val();
        if (multiplierInput > 1) {
            launch.multiplier = multiplierInput;
        }
        if (multiplierInput > 4 && !launch.seenMultiplierMessage) {
            launch.seenMultiplierMessage = true;
            let message = $('<h3>').addClass('instructions fadeIn').text('Generating particles at rates higher than 4x may cause performance issues').css('color', 'red');
            $('.instructionsContainer').append(message);
            setTimeout(function() {
                $('.instructions').css({
                    'opacity': '0',
                    'transition': '2s'
                });
            }, 4000);
            setTimeout(function() {
                $('.instructionsContainer').empty();
            }, 6000);
        }
    });
    $('.splatterInput').on('input', function() {
       let splatterMultiplier =  $('.splatterInput').val();
       if (splatterMultiplier > 1) {
           launch.splatterMultiplier = splatterMultiplier;
       }
       if (splatterMultiplier > 150 && !launch.seenSplatterMessage) {
           launch.seenSplatterMessage = true;
           let message = $('<h3>').addClass('instructions fadeIn').text('Generating particle splatters at rates higher than 150 particles per click may cause performance issues').css('color', 'red');
           $('.instructionsContainer').append(message);
           setTimeout(function() {
               $('.instructions').css({
                   'opacity': '0',
                   'transition': '2s'
               });
           }, 5000);
           setTimeout(function() {
               $('.instructionsContainer').empty();
           }, 7000);
       }
    });
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
    });
    $('#ballSizePx').on('input', function () {
        launch.maxSize = $('#ballSizePx').val();
        $('.ballSize').addClass('selected');
    });
    $('#transitionTime').on('input', function () {
        launch.transitionTime = $('#transitionTime').val();
        $('.transTime').addClass('selected');
    });
    $('#randomSizeCheckbox').on('click', function() {
        $('.randomSize').toggleClass('selected');
    });
    $('#transitionDelayInput').on('input', function () {
        launch.transitionDelay = $('#transitionDelayInput').val();
        $('.transDelay').addClass('selected');
    });
    $('#randomTransitionTime').on('click', function() {
        $('.randomTransTime').toggleClass('selected');
    });
    $('#linearTransitionCheckbox').on('click', function() {
        $('.linearTransition').toggleClass('selected');
    });
    $('#randomResizeInput').on('input', function() {
        if ($('#randomResizeCheckbox').is(':checked')) {
            $('.randomResize').addClass('selected');
        }
        launch.maxRandomSizeTransition = $('#randomResizeInput').val();
    });
    $('#randomResizeCheckbox').on('click', function() {
        if ($('#randomResizeCheckbox').is(':checked')) {
            $('.randomResize').addClass('selected');
        } else {
            $('.randomResize').removeClass('selected');
        }
    });
    $('.customColorBtn').on('click', function() {
        $('.historyDiv').removeClass('showHistoryDiv');
        $('.colorSelectionDiv').toggleClass('showColorSelection');
    });
    $('.addColor').on('click', launch.addColor);
    $('.saveBtn').on('click', function() {
        $('.historyDiv').toggleClass('showHistoryDiv');
    })
    $('.randomColorBtn').on('click', function() {
       if ($('.randomColorBtn').hasClass('btn-danger')) {
           $('.randomColorBtn').removeClass('btn-danger').addClass('btn-success').text('Random Color: Off');
           launch.randomColor = false;
       } else {
           $('.randomColorBtn').removeClass('btn-success').addClass('btn-danger').text('Random Color: On');
           launch.randomColor = true;
       }
    });
    $('.newColorInput').on('click', function() {
        $(document).keypress(function (e) {
            if (e.which === 13 && $('.newColorInput').val() !== '') {
                launch.addColor();
            }
        });
    });
    $('.saveSelection').on('click', launch.storeSelection)

    $('.colorSelectionDiv').on('click', '.colorDeleteBtn', function(e) {
        let colorIndex = $('.colorDeleteBtn').index(this);
        launch.colorArr.splice(colorIndex, 1);
        $(this).parent().remove();
    });
    //custom background color in the menu
    $('.customizeBackground').on('click', function() {
        $(document).keypress(function (e) {
            if (e.which == 13) {
                let input = $('.customizeBackground').val();
                let tempInput = input.split(',');
                if (tempInput.length > 1) {
                    //rgb input
                    $('#contentWrapper').css('background-color', 'rgb('+tempInput[0]+','+tempInput[1]+','+tempInput[2]+')');
                } else {
                    $('#contentWrapper').css('background-color', input);
                }
            }
        });
    });
    $('#transDirection').on('click', function() {
        if (!launch.directionInstructions) {
            $('.transDirection').toggleClass('selected');
        } else {
            launch.directionInstructions = false;
            $('.transDirection').toggleClass('selected');
            let h1 = $('<h1>').addClass('instructions').text('use arrow keys to change particle direction');
            $('.instructionsContainer').append(h1);

            setTimeout(function() {
                $('.instructions').fadeOut(1000);
                    setTimeout(function() {
                        $('.instructionsContainer').empty();
                    }, 6000);
                }, 5000);
        }
    });

    $('.navbar-toggle').on('click', function() {
        if (!launch.openMenu) {
            launch.openMenu = true;
        } else {
            launch.openMenu = false;
        }
    });
    //instructions that run on page load
    function displayInstructions(instructions) {
        $('.instructions').fadeOut(1000);
        let h1 = $('<h1>').addClass('instructions').text(instructions[displayInstructions.count]);
        setTimeout(function() {
            $('.instructionsContainer').append(h1);

            if (displayInstructions.count === 1 && !launch.openMenu) {
                setTimeout(function() {
                    $('.navbar-toggle').click();
                }, 2000);
                // setTimeout(function() {
                //     $('.navbar-toggle').click();
                // }, 6000);
            }
        }, 1000);
        displayInstructions.count++;
    };
    displayInstructions.count = 0;

    $(document).keydown(function (e) {
        if (e.which === 39) {
            //move balls right
            launch.direction = 'left';
        }
        else if (e.which === 37) {
            //move balls left
            launch.direction = 'right';
        }
        else if (e.which === 38) {
            launch.direction = 'top';
        }
        else if (e.which === 40) {
            launch.direction = 'bottom';
        }
    });

    let instructInterval = setInterval(function() {
        const instructions = ['make use of the settings menu to customize your experience.', 'use your arrow keys to change the direction of particle movement','Finally check out my Web Portfolio and Github', ''];
        if (displayInstructions.count < instructions.length) {
            displayInstructions(instructions);
        } else {
            clearInterval(instructInterval);
            $('.instructionsContainer').empty();
        }
    }, 4000);
    $('.openAll').on('click', function() {
        console.log($('.navbar-toggle').attr('aria-expanded'));
        if ($('.openAll').text() === 'open all') {
            if (!launch.openMenu) {
                $('.navbar-toggle').click();
            }
            launch.openMenu = true;
            $('.colorSelectionDiv').addClass('showColorSelection');
            $('.historyDiv').addClass('showHistoryDiv');
            $('.openAll').addClass('closeAll').text('close all');
        } else {
            if (launch.openMenu) {
                $('.navbar-toggle').click();
            }
            launch.openMenu = false;
            $('.colorSelectionDiv').removeClass('showColorSelection');
            $('.historyDiv').removeClass('showHistoryDiv');
            $('.openAll').removeClass('closeAll').text('open all');
        }
    });
    $('.cursor').on('click', function() {
        $('#contentWrapper').toggleClass('hideCursor');
        if ($('#contentWrapper').hasClass('hideCursor')) {
            $('.cursor').text('Show Cursor');
        } else {
            $('.cursor').text('Hide Cursor');
        }
    })

});
var rocketShipOption = false;


function Makecircles(maxTransTime, maxSize) {
    this.transitionDelay = 0;
    this.maxSize = maxSize;
    this.multiplier = 1;
    this.splatterMultiplier = 50;
    this.seenMultiplierMessage = false;
    this.seenSplatterMessage = false;
    this.randomColor = true;
    this.colorArr = [];
    this.openMenu = false;
    this.direction = 'left';
    this.directionInstructions = true;
    this.randomDirectionArr = ['top', 'right', 'bottom', 'left'];
    this.randomDirectionIndex = 0;
    this.getRandom = function (max) {
        return Math.floor(Math.random() * max) + 1;
    };
    this.newCircle = function (x,y) {
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

        if (this.randomColor) {
            var backgroundColor = 'rgb(' + this.getRandom(255) + ',' + this.getRandom(255) + ',' + this.getRandom(255) + ')';
        } else {
            if (this.colorArr.length === 1) {
                var backgroundColor = this.colorArr[0];
            } else {
                function randomNum(max) {
                    return Math.floor(Math.random() * max);
                }
                let randomIndex = randomNum(this.colorArr.length);
                var backgroundColor = this.colorArr[randomIndex];
            }
        }

        var newCircle = $('<div>').addClass('circle').css({
            // 'top': event.clientY + 'px',
            // 'left': event.clientX + 'px',
            'top': y + 'px',
            'left': x + 'px',
            'background-color': backgroundColor,
            'transition': transTime + 's',
            'height': size + 'px',
            'width': size + 'px',
            'transition-delay': this.transitionDelay + 's',
        });
        this.circleDiv = newCircle;
        this.renderCircleOnDOM(this.circleDiv);
        this.setting1(this.circleDiv);
    };
    this.circleDiv = null;
    this.size = function () {
        return this.getRandom(this.maxSize);
    };
    this.maxRandomSizeTransition = 200;
    this.transitionTime = maxTransTime;
    this.renderCircleOnDOM = function (newCircle) {
        $('#contentWrapper').append(newCircle);
    };
    this.setting1 = function (circle) {
            if ($('#linearTransitionCheckbox').is(':checked')) {
                var topTransition = Math.floor(Math.random() * 101) + '%';
            } else {
                var topTransition = $(circle).css('top') + 'px';
            }
            if ($('#randomResizeCheckbox').is(':checked')) {
                var size = this.getRandom(this.maxRandomSizeTransition);
            } else {
                var size = $('.circle').css('width');
            }
            setTimeout( () => {
                ////////////////////Strong hand

                if ($('#transDirection').is(':checked')) {
                    this.direction = this.randomDirectionArr[this.randomDirectionIndex];
                    if (this.randomDirectionIndex < 3) {
                        this.randomDirectionIndex++;
                    } else {
                        this.randomDirectionIndex = 0;
                    }
                }
                if (this.direction === 'left') {
                    $(circle).css({
                        'transition-timing-function': 'linear',
                        'left': '115%',
                        'top': topTransition,
                        'height': size + 'px',
                        'width': size + 'px',
                    });
                }
                else if (this.direction === 'right') {
                    $(circle).css({
                        'transition-timing-function': 'linear',
                        'left': '-15%',
                        'top': topTransition,
                        'height': size + 'px',
                        'width': size + 'px',
                    });
                }
                else if (this.direction === 'top') {
                    $(circle).css({
                        'transition-timing-function': 'linear',
                        'left': topTransition,
                        'top': '-15%',
                        'height': size + 'px',
                        'width': size + 'px',
                    });
                }
                else if (this.direction === 'bottom') {
                    $(circle).css({
                        'transition-timing-function': 'linear',
                        'left': topTransition,
                        'top': '115%',
                        'height': size + 'px',
                        'width': size + 'px',
                    });
                }
                ///////////////////
            if ($(circle).css('left') > 114) {
                $(circle).remove();
            }
        }, 0)
    };
    this.appendColorDiv = function(newColor) {
        for (let i=0; i<newColor.length; i++) {
            let colorDiv = $('<div>').addClass('colorDiv').text('').css('background-color', newColor[i]);
            let deleteBtn = $('<span>').addClass('colorDeleteBtn glyphicon glyphicon-remove');
            $(colorDiv).append(deleteBtn);
            $('.colorSelectionDiv').append(colorDiv);
            $('.newColorInput').val('');
        }
    }
    this.addColor = ()=> {
        let newColor = $('.newColorInput').val();
        let newColorArr = newColor.split(',');
        if (newColorArr.length === 1) {
            newColor = newColor.replace(" ", '');
        } else {
            newColor = 'rgb('+newColorArr[0]+','+newColorArr[1]+','+newColorArr[2]+')';
        }
        launch.colorArr.push(newColor);
        this.appendColorDiv([newColor]);
    };
    this.renderHistorySelection = ()=> {
        $('.selectionNameContainer').empty();
        var historyObj = JSON.parse(localStorage.getItem('particleHistory'));
        for (var index in historyObj) {
            let selectionDiv = $('<div>').addClass('selectionDiv').on('click', this.selectHistoryItem);
            let h3 = $('<h3>').addClass('selectionTitle').text(index);
            $(selectionDiv).append(h3);
            $('.selectionNameContainer').prepend(selectionDiv);
        }
    };
    this.selectHistoryItem = (e)=> {
        let storageKey = e.currentTarget.textContent;
        let historyObj = JSON.parse(localStorage.getItem('particleHistory'));
        this.colorArr = historyObj[storageKey];

        $('.colorDiv').remove();
        this.appendColorDiv(this.colorArr);
    };
    this.storeSelection = () => {
        let selectionName = $('.selectionName').val();
        selectionName = selectionName.replace(' ', '_');
        var historyObj = JSON.parse(localStorage.getItem('particleHistory'));
        if (historyObj === null) {
            historyObj = {};
            // localStorage.setItem('particleHistory', JSON.stringify(historyObj));
        }
        historyObj[selectionName + ''] = this.colorArr;
        localStorage.setItem('particleHistory', JSON.stringify(historyObj));
        let selectionDiv = $('<div>').addClass('selectionDiv').on('click', this.selectHistoryItem);
        let h3 = $('<h3>').addClass('selectionTitle').text(selectionName);
        $(selectionDiv).append(h3);
        $('.selectionNameContainer').prepend(selectionDiv);
    };
    this.rocketBoost = function () {
        $('.rocket').css({
            'top': event.screenY + 'px',
            'left': event.screenX + 'px',
        });
    };
    this.renderHistorySelection();

}

var launch = new Makecircles(4, 80);
