let game = {
    score:0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"],
    
}

function newGame() {
    game.score = 0
    game.playerMoves = []
    game.currentGame = []

    for (let circle of document.getElementsByClassName("circle")) {  //
        if (circle.getAttribute("data-listener") !== "true") {     //check attribute of each circle
            circle.addEventListener("click", (e) => {          // if not true, add event listener, pass event object as (e)
                if (game.currentGame.length > 0 && !game.turnInProgress){               //disable clicks during computers turn, length . 0 shows game is in progress
                let move = e.target.getAttribute("id");           //get click target's id(buttons 1 to 4) and store in 'move'
                game.lastButton = move;                         //store last button clicked to disable clicks during computers turn
                lightsOn(move);                                    //call lightsOn on whichever button is clicked
                game.playerMoves.push(move);                          //add to playerMoves array
                playerTurn();
                }                                          
            });
            circle.setAttribute("data-listener", "true");                // set attribute to true
        }
    }

    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = []   //clear player moves
    //from choices(buttons) get random button and push into currentGame array. * 4 generates num between 0 and 3 from choices array
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))])
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");    //add 'light class'
    setTimeout(() => {                                      //set time to remove light class
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    game.turnInProgress = true;    //turns have started
    game.turnNumber = 0;                 //set turn number
    let turns = setInterval(() => {      //sets interval/pause between light shown and next step in sequence
        lightsOn(game.currentGame[game.turnNumber]);    //use turnNumber as index number for currentGame array
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {  //if turnNumber is >= currentGame length, than sequenc is finished, so interval can be cleared
            clearInterval(turns);
            game,e.turnInProgress = false;      //intervals cleared, so game is finished
        }
        
    }, 800);
}

function playerTurn() {
    let i = game.playerMoves.length - 1;                  //get index of last element of playerMoves array
    if (game.currentGame[i] === game.playerMoves[i]) {    //then compare with same index of currentGame array
        if (game.currentGame.length === game.playerMoves.length) {     // if these are same length, it means the player must have got all correct and is at end of sequence
            game.score++;                //increment the score
            showScore();
            addTurn();                       //then add new turn
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn}; //every new function must be added here to be exported to game.js