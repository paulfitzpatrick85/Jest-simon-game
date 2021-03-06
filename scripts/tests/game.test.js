/**
 * @jest-environment jsdom
 */

//lines 6 and 7 appeared themselves and seem to cause tests to not run at all
// const { beforeAll, test } = require("@jest/globals"); 
// const { describe } = require("yargs");
const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require("../game");   //every new function must be added here

jest.spyOn(window, "alert").mockImplementation(() => { })    //checks if alert has been called. alert is amethod of the window object

 beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
});


describe("newGame works correctly", () => {
    beforeAll(() => {                         //runs before all tests
        game.score = 42;                      //setup game with fake value to check if newGame function resets it
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
   test("Should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toEqual(1);  //will contain 1 move thats being pushed onto it
    });
    test("Should set playermoves to zero", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    test("Should set currentGame to zero", () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true", () => {
        //newGame();
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;           //reset state each time
        game.currentGame = [];    //reset state each time
        game.playerMoves = [];    //reset state each time
        addTurn();               //run function to add new turn to array
    });
    afterEach(() => {              //reset state after each test
        game.score = 0;           
        game.currentGame = [];    
        game.playerMoves = [];        
    });
    test("addTurn adds a new turn to the game", () => {
      addTurn();
      expect(game.currentGame.length).toBe(2);            //should be 2 from being called on lines 67 and 75
  });
  //check if correct class is added to button to 'light it up'
    test("should add correct class to ight up the butttons", () => {
        let button = document.getElementById(game.currentGame[0]);  //using currentgame array because there'll always be at least 1 in it
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light")
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;     //set number to test
        showTurns();              //reset turn number
        expect(game.turnNumber).toBe(0);  //test that number is now 0
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);  //push turn from gameplay before each, into playerMoves 
        playerTurn();                  //calling to check that player turn matches computer turn
        expect(game.score).toBe(1);    //expect score to increase if turns match
    });      
    test("should call alert if move is wrong", () => {
        game.playerMoves.push("wrong");     //string "wrong" is pushed into playerMoves
        playerTurn();            //when playerTurn is called, alert will be called
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);  //expected to be true while computer showing its turns
    });            
    //clicking during comps turn
    test("clicking during computer sequence should fail", () => {
        showTurns();      //start comp seqeunce
        game.lastButton = "";   //reset last button key, should now be empty
        document.getElementById("button2").click();   //should be no id there if clicks are disabled, should not set value of game.lastButton
        expect(game.lastButton).toEqual("");  //check that still empty
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    })
    test("lastButton key exists", () => {
        expect("lastButtonr" in game).toBe(true);
    })
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    })
    test("turnInProgress key value is false", () => {  //checking for default value in turnInProgress key,line 7 of game.js
        expect("turnInProgress" in game).toBe(true);
    })
});