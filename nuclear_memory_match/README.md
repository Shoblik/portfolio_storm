# Nuclear Memory Match

My first attempt at building an Artificial Intelligence that users can play against (more details below). This challenging memory game revolves around gaining more nuclear resources than your opponent in an effort to secure nuclear dominance. If you correctly match a card you get to keep playing until you do not match a card. Built without the need for external libraries or frameworks this project was later revisited and programmed with the jQuery library as a fun aside project, this revision also improved the Artificial Intelligence because of ideation that resulted from other projects that featured AI.

### Built with

Core JavaScript

## The Artificial Intelligence
I created a memory space where the AI stores cards values that it has seen. When it's the AI's turn to play it does not choose cards that it has seen due to classes denoting cards that it has seen. To factor in a bit of human error on the easy difficulty the AI has a 60% chance of remembering the cards its seen, medium difficulty gets an 80% chance of remembering, and the hard AI remembers 100% of cards that it sees. Once the AI chooses its first card, it checks the value of the card against what it has in its memory space and if it finds the correspoding card the AI flips it and moves on, otherwise it picks another card that it has not seen yet in hopes of matching by accident or storing the newly mapped card in its memory. While not unbeatable on the hard mode it does take a bit of strategy and a minute amount of luck because once my AI maps out the cards it steamrolls you at the end. Improvments to the AI are listed below.

## Author

* **Simon Hoblik** 

## In Development
* Create a secondary smaller memory space that always remembers the last two or three cards that have been shown.
* If the computer flips its second card and it doesn't match run the cards value through the AI memory to check if it has seen that card before, if it has then flip those two next turn. 
* Dynamically create cards to enable a variable amount of cards in a game.
