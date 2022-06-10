let game = {
    score:0,
    currentGame: [],
    playerMoves: [],
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
    //showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

module.exports = {game, newGame, showScore, addTurn}; //every new function must be added here to be exported to game.js