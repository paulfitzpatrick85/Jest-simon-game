let game = {
    score:0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"],
    
}

function newGame() {
    game.score = 0
    game.playerMoves = []
    game.currentGame = []
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
    game.turnNumber = 0;                 //set turn number
    let turns = setInterval(() => {      //sets interval/pause between light shown and next step in sequence
        lightsOn(game.currentGame[game.turnNumber]);    //use turnNumber as index number for currentGame array
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {  //if turnNumber is >= currentGame length, than sequenc is finished, so interval can be cleared
            clearInterval(turns);
        }
        
    }, 800);
}

module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns}; //every new function must be added here to be exported to game.js