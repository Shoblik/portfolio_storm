function initializeApp() {
    reset(false);
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            if (window.matchMedia("(orientation: portrait)").matches) {
                changeOrientationMessage();
            } else {
                try {
                    let message = document.querySelector('.orientationMessage');
                    message.parentNode.removeChild(message);
                }
                catch(err) {
                    console.log('The device is already in portrait mode');
                }
            }
        }, 100);
    });
    if (window.matchMedia("(orientation: portrait)").matches) {
        changeOrientationMessage();
    }

    const card = document.getElementsByClassName("card");
    //attach click handlers
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', cardHandler);
    }
    document.querySelector("#settingsBtn").addEventListener('click', function() {
        changeSettings();
    });
    document.querySelector(".close").addEventListener('click', function() {
        document.querySelector(".modal").style.display = 'none';
        document.querySelector(".modal-body").innerHTML = '';
        document.querySelector(".modal-footer").innerHTML = '';
    });

    document.querySelector(".reset").addEventListener('click', function() {
        const modal = document.querySelector(".modal");
        modal.style.display = 'none';
        modal.style.transition = '1s';
        reset(true);
    });
//Close the modal when the user click anywhere other than the modal
    window.onclick = function(event) {
        if (event.target == document.querySelector('.modal')) {
            document.querySelector('.modal').style.display = 'none';
            document.querySelector('.modal-body').innerHTML = '';
            document.querySelector('.modal-footer').innerHTML = '';
        }
    }
}
var totalCards = 0;
var cardCount = 0;
var timesPlayed = -1;
var tryCount = 0;
var accuracy = 0;
var matchCount = 0;
var compTotalCards = 0;
var compMatchCount = 0;
var compAccuracy = 0;
var first;
var second;
var firstCard;
var secondCard;
var playerOne = true;
var compMemory = [];
var pickAnotherCard = true;
var chanceOfRemembering = 8;

function changeOrientationMessage() {
        let div = document.createElement('div');
        div.classList.add('orientationMessage');
        let message = document.createElement('h3');
        message.innerText = 'Please turn your device to landscape mode to view this app';
        message.classList.add('orientationText');
        div.appendChild(message);

        document.querySelector('body').appendChild(div);

}

function reset(slowDown) {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.modal-body').innerHTML = '';
    document.querySelector('.modal-footer').innerHTML = '';
    playerOne = true;
    timesPlayed++;
    let cardArray = document.querySelectorAll('.card');
    for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].style.transition = '1s';
        cardArray[i].childNodes[1].classList.remove('foundCard', 'compFoundCard');
        cardArray[i].classList.remove('backFlip', 'seen');
        cardArray[i].style.transition = '1s';
    }
    totalCards = 0;
    cardCount = 0;
    tryCount = 0;
    accuracy = 0;
    matchCount = 0;
    first;
    second;
    firstCard;
    secondCard;
    compMemory = [];
    compMatchCount = 0;
    compTotalCards = 0;
    compAccuracy = 0;

    document.querySelector('.userPoints').innerHTML = '0';
    document.querySelector('.compPoints').innerHTML = '0';
    document.querySelector('.timesPlayed').innerHTML = '' + timesPlayed;
    document.querySelector('.accuracy').innerHTML = accuracy.toFixed(1) + '%';
    document.querySelector('.compAccuracy').innerHTML = accuracy.toFixed(1) + '%';
    document.querySelector('.tryCount').innerHTML = tryCount + '';
    /////////////////////////////////////////////////////////
        const staticImgArray = [
            'images/engineer.png',
            'images/nuclear_bomb.png',
            'images/microscope.png',
            'images/miner2.png',
            'images/nuclearExplosion.png',
            'images/plutoniumAtom.png',
            'images/radioactive.png',
            'images/rocket_icon.png',
            'images/powerPlant.png',
            'images/engineer.png',
            'images/nuclear_bomb.png',
            'images/microscope.png',
            'images/miner2.png',
            'images/nuclearExplosion.png',
            'images/plutoniumAtom.png',
            'images/radioactive.png',
            'images/rocket_icon.png',
            'images/powerPlant.png'
        ];
        var imgArr = staticImgArray.slice();
        var staticCardArr = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];
        var cardArr = staticCardArr.slice();
        var cards = document.querySelectorAll('.front');

        function shuffleDeck() {
            for (var i=0;i<cards.length;i++) {
                var randomNum = Math.floor((Math.random() * cardArr.length));
                cards[i].style.backgroundImage = 'url('+imgArr[randomNum]+')';
                cards[i].style.backgroundPosition = 'center';
                cards[i].style.backgroundSize = '140%';
                cards[i].style.backgroundRepeat = 'no-repeat';
                cards[i].setAttribute('compare', cardArr[randomNum] + '');
                cardArr.splice(randomNum, 1);
                imgArr.splice(randomNum, 1);
            }
        }
        if (!slowDown) {
            shuffleDeck();
        }
        else {
            setTimeout(function() {
                shuffleDeck();
            }, 1000);
        }
    }
function cardHandler(event) {
    if (cardCount === 0 && playerOne === true) {
        //if it's the first card store that card and increase card count to 1
        firstCard = event.target;
        first = firstCard.parentNode.firstElementChild.getAttribute('compare');
        firstCard.parentNode.classList.add('backFlip');
        cardCount++;
    }
    else if (cardCount === 1) {
        //if its the second card store that card and we'll perform a conditional check
        secondCard = event.target;
        second = secondCard.parentNode.firstElementChild.getAttribute('compare');
        if (secondCard.parentNode.classList.contains('backFlip')) {
            cardCount = 1;
            return;
        }
        secondCard.parentNode.classList.add('backFlip');
        totalCards++;
        cardCount++;
        document.querySelector('.tryCount').innerHTML = totalCards + '';
        compare();
    }

}

function compare() {
    if (first === second) {
        //if the cards match things match here and card count get's reset to 0
        setTimeout(function() {
            firstCard.parentNode.firstElementChild.classList.add('foundCard');
            secondCard.parentNode.firstElementChild.classList.add('foundCard');
            cardCount = 0;
        }, 500);
        matchCount++;
        accuracy = (matchCount / totalCards) * 100;
        document.querySelector('.accuracy').innerHTML = accuracy.toFixed(1) + '%';

        if (first === second && compMatchCount+matchCount === 9) {
            ////////////////////////////////End of Game user last turn////////////////////////////////////////////////
            timesPlayed++;
            document.querySelector('.timesPlayed').innerHTML = timesPlayed + '';
            playerOne = true;
            whoWon();
        }
        setTimeout(function() {
            document.querySelector('.userPoints').innerHTML = matchCount + '';
        }, 1000);
    }
    else {
        //If the cards don't match flip them back over and set cardCount to 0
        setTimeout(function() {
            firstCard.parentNode.style.transition = '1s';
            secondCard.parentNode.style.transition = '1s';
            firstCard.parentNode.classList.remove('backFlip');
            secondCard.parentNode.classList.remove('backFlip');
            cardCount = 0;
            if (playerOne === true) {
                accuracy = (matchCount / totalCards) * 100;
                document.querySelector('.accuracy').innerHTML = accuracy.toFixed(1) + '%';
            }
            playerOne = false;

            let turnEle = document.querySelector('.turn');
            turnEle.innerHTML = 'CPU\'s Turn';
            turnEle.style.color = 'red';
            turnEle.style.transition = '1s';

            AI();
        }, 1000);
    }
}

////////////////AI implementation//////////////////////////////////////////////////
function AI() {
    if (playerOne !== true) {

        setTimeout(function () {
            pickAnotherCard = true;
            //Store the cards it has seen into computer memory
            var compMemoryRandomNum = Math.floor((Math.random() * 10) + 1);
            if (compMemoryRandomNum <= chanceOfRemembering) {
                compMemory.push(first, second);
                firstCard.parentNode.classList.add('seen');
                secondCard.parentNode.classList.add('seen');
            }
            //Pick a card randomly and flip it
            var cardsNotFlipped = document.querySelectorAll('DIV[class*=card]:not(.backFlip):not(.seen)');
            if(cardsNotFlipped.length === 0) {
                let cards = document.querySelectorAll('.card');
                for (let i=0; i<cards.length; i++) {
                    cards[i].classList.remove('seen');
                }
                cardsNotFlipped = document.querySelectorAll('DIV[class*=card]:not(.backFlip):not(.seen)');
            }
            var randomCard = Math.floor((Math.random() * cardsNotFlipped.length));
            cardsNotFlipped[randomCard].classList.add('backFlip');
            //look at the cards compare value, if it exists in the computers memory, find it
            first = cardsNotFlipped[randomCard].firstElementChild.getAttribute('compare');

            setTimeout(function () {
                var seenCard = 0;
                for (var i = 0; i < compMemory.length - 1; i++) {
                    if (compMemory[i] == first) {
                        seenCard++;
                    }
                    //////////////End the game if the comp finds the last card
                    if (compMemory[i] == first && seenCard === 2 && compMatchCount+matchCount === 8) {
                        let twoCards = document.querySelectorAll("[compare='"+first+"']");
                        twoCards[0].parentNode.classList.add('backFlip');
                        twoCards[1].parentNode.classList.add('backFlip');
                        twoCards[0].classList.add('compFoundCard');
                        twoCards[1].classList.add('compFoundCard');

                        compMatchCount++;
                        compTotalCards++;
                        compAccuracy = (compMatchCount / compTotalCards) * 100;
                        document.querySelector('.compAccuracy').innerHTML = compAccuracy.toFixed(1) + '%';

                        document.querySelector('.compPoints').innerHTML = compMatchCount + '';
                        playerOne = true;
                        pickAnotherCard = false;
                        seenCard = 0;
                        whoWon();
                        return;

                    }
                    else if (compMemory[i] == first && seenCard === 2 && compMatchCount+matchCount !== 8) {
                        let twoCards = document.querySelectorAll("[compare='"+first+"']");

                        twoCards[0].parentNode.classList.add('backFlip');
                        twoCards[1].parentNode.classList.add('backFlip');
                        twoCards[0].classList.add('compFoundCard');
                        twoCards[1].classList.add('compFoundCard');

                        compMatchCount++;
                        compTotalCards++;
                        compAccuracy = (compMatchCount / compTotalCards) * 100;
                        document.querySelector('.compAccuracy').innerHTML = compAccuracy.toFixed(1) + '%';

                        setTimeout(function() {
                            document.querySelector('.compPoints').innerHTML = compMatchCount + '';
                        }, 1000);
                        playerOne = false;
                        pickAnotherCard = false;
                        seenCard = 0;
                        AI();
                        break;
                    }
                    playerOne = true;
                }
            }, 1000);


            setTimeout(function () {
                cardsNotFlipped = document.querySelectorAll('DIV[class*=card]:not(.backFlip)');

                randomCard = Math.floor((Math.random() * cardsNotFlipped.length));
                if (pickAnotherCard === true) {
                    cardsNotFlipped[randomCard].classList.add('backFlip');
                    var second = cardsNotFlipped[randomCard].firstElementChild.getAttribute('compare');
                    if (compMemoryRandomNum <= chanceOfRemembering) {
                        compMemory.push(first);
                        compMemory.push(second);
                    }
                    if (first == second) {
                        let twoCards = document.querySelectorAll("[compare='"+first+"']");
                        twoCards[0].classList.add('compFoundCard');
                        twoCards[1].classList.add('compFoundCard');


                        compMatchCount++;
                        compTotalCards++;
                        compAccuracy = (compMatchCount / compTotalCards) * 100;
                        document.querySelector('.compAccuracy').innerHTML = compAccuracy.toFixed(1) + '%';
                        setTimeout(function() {
                            document.querySelector('.compPoints').innerHTML = compMatchCount + '';
                        }, 1000);
                        playerOne = false;
                        AI();

                    }
                    else {

                        setTimeout(function () {
                            playerOne = true;
                            let firstCards = document.querySelectorAll("[compare='"+first+"']");
                            let secondCards = document.querySelectorAll("[compare='"+second+"']");
                            firstCards[0].parentNode.classList.remove('backFlip');
                            firstCards[1].parentNode.classList.remove('backFlip');
                            secondCards[0].parentNode.classList.remove('backFlip');
                            secondCards[1].parentNode.classList.remove('backFlip');
                            firstCards[0].parentNode.classList.add('seen');
                            secondCards[0].parentNode.classList.add('seen');

                            let turnEle = document.querySelector('.turn');
                            turnEle.innerHTML = 'Your Turn!';
                            turnEle.style.color = 'lightGreen';
                            turnEle.style.transition = '1s';

                            compTotalCards++;
                            compAccuracy = (compMatchCount / compTotalCards) * 100;
                            document.querySelector('.compAccuracy').innerHTML = compAccuracy.toFixed(1) + '%';
                        }, 1000);
                    }
                }
            }, 1000);
        }, 1000);
    }

}
function whoWon() {
    let h1 = document.createElement('h1');
    let content = document.createElement('h2');
    let modal = document.querySelector('.modal-body');

    if (matchCount > compMatchCount) {
        //user wins
        h1.innerHTML = 'You Win!';
        content.innerHTML = 'You have gathered more nuclear resources than your opponent. Nuclear domination is assured';
    }
    if (matchCount < compMatchCount) {
        //comp wins
        h1.innerHTML = 'You Lose.';
        content.innerHTML = 'Your opponent has gathered more nuclear resources and will have a larger arsenal than you.';
    }
    else if (matchCount === compMatchCount) {
        //tie
        h1.innerHTML = 'Tie';
        content.innerHTML = 'New nuclear resources have been discovered try again to break the stalemate'
    }
    modal.appendChild(h1);
    modal.appendChild(content);

    let resetBtn = document.createElement('button');
    resetBtn.classList.add('reset');
    resetBtn.innerHTML = 'Play Again';
    resetBtn.addEventListener('click', function() {
        reset(true);
    });
    document.querySelector('.modal-footer').appendChild(resetBtn);
    document.querySelector('.modal').style.display = 'block';
}
///////////////////////////////////Settings////////////////////////////////////////////////////

function changeSettings () {
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Settings';
    h1.style.textDecoration = 'underline';

    let h2 = document.createElement('h2');
    h2.innerHTML = 'CPU difficulty';
    h2.style.textAlign = 'center';

    let btnDiv = document.createElement('div');
    btnDiv.classList.add('buttonWrapper');

    let easyBtn = document.createElement('button');
    easyBtn.innerHTML = 'Easy';
    easyBtn.classList.add('difficultyBtn', 'easy');
    easyBtn.addEventListener('click', function () {
        chanceOfRemembering = 6;
        document.querySelector('.difficulty').innerHTML = 'Easy';
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.modal-body').innerHTML = '';
    });

    let mediumBtn = document.createElement('button');
    mediumBtn.classList.add('difficultyBtn', 'medium');
    mediumBtn.innerHTML = 'Medium';
    mediumBtn.addEventListener('click', function () {
        chanceOfRemembering = 8;
        document.querySelector('.difficulty').innerHTML = 'Medium';
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.modal-body').innerHTML = '';
    });

    let hardBtn = document.createElement('button');
    hardBtn.classList.add('difficultyBtn', 'hard');
    hardBtn.innerHTML = 'Hard';
    hardBtn.addEventListener('click', function () {
        chanceOfRemembering = 10;
        document.querySelector('.difficulty').innerHTML = 'Hard';
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.modal-body').innerHTML = '';
    });

    btnDiv.appendChild(easyBtn);
    btnDiv.appendChild(mediumBtn);
    btnDiv.appendChild(hardBtn);

    let modalBody = document.querySelector('.modal-body');
    modalBody.appendChild(h1);
    modalBody.appendChild(h2);
    modalBody.appendChild(btnDiv);
    document.querySelector('.modal').style.display = 'block';
}