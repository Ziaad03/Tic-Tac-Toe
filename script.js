function playerFactory(playerName,playerMark){
    let turn = false;
    const name = playerName;
    const mark = playerMark;

    const changeTurn = ()=>{
        turn = !(turn);
    }

    const getName = ()=>{
        return name;
    }

    const getMark = ()=>{
        return mark;
    }

    const getTurn = ()=>{
        return turn;
    }

    return {changeTurn, getName,getMark,getTurn};
}
const boardModule = (()=>{

    
    // make a 2d array to represent a board
    let board =[["","",""],["","",""],["","",""]];

    let playMarkAtBoard = (mark,i,j)=>{
        board[i][j] = mark;
    }

    function print(){
        console.log("haloo")
        for (let i = 0; i < 3; i ++){
            for (let j; j < 3; j++)
            console.log(board[i][j] + " ,")
        }
        console.log("\n")
    }

    const getBoard = ()=>{
        return board;
    }

    return {print, getBoard, playMarkAtBoard}



})();
function gameFactory(playerOneName,playerTwoName, gameBoardScreen,resultText,playerTurnText){
    
    // create two players with given name
    let player1 = playerFactory(playerOneName,"X")
    let player2 = playerFactory(playerTwoName,"O")
    
    // make the player with x marker play first
    player1.changeTurn()
    let gameBoard = boardModule
    // play game function
    function playYourTurn(i,j){
        // flag to alert if a player want to mark a taken spot
        let playedATakenSpot = false
       
       
        if ( gameStatus()){
            // get board
            let board = gameBoard.getBoard()
            
            if (player1.getTurn()){
                
               
                if (board[i][j] === ""){
                    gameBoard.playMarkAtBoard(player1.getMark(),i,j)
                    displayAtGameBoardScreen(i,j,player1.getMark())
                    
                }
                else{
                   playedATakenSpot = true}

            }
            
            if (player2.getTurn()){
               
                
                if (board[i][j] === ""){
                    gameBoard.playMarkAtBoard(player2.getMark(),i,j)
                    displayAtGameBoardScreen(i,j,player2.getMark())
                }
                else{
                    playedATakenSpot = true}
            }

            // change turns
            if (!playedATakenSpot){
                player1.changeTurn()
                player2.changeTurn()
            }

        }

        displayPlayerTurn()
        // check is some one won status
        checkGameResult()
       

    }

    function checkGameResult(){
        if (aPlayerWon()){
            playerTurnText.innerText = ""
            if (player2.getTurn()){
                resultText.innerHTML = player1.getName() + " won"
            }
            else if (player1.getTurn()){
               resultText.innerHTML = player2.getName() + " won"
            }
        }
        else if (boardFilled()){
            playerTurnText.innerText = ""
            resultText.innerHTML = "Tie"
        }

    }
    function aPlayerWon(){
        // check if a player won
        // check all rows
        let board = gameBoard.getBoard()
        if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0]!== ""){
            return true;
        }
        if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0]!== ""){
            return true;
        }
        if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0]!== ""){
            return true;
        }
        // check all columns
        if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0]!== ""){
            return true;
        }
        if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1]!== ""){
            return true;
        }
        if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2]!== ""){
            return true;
        }
        // check all diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0]!== ""){
            return true;
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0]!== ""){
            return true;
        }
        return false;



    }
    function boardFilled() {
        // check if the board is filled
        let board = gameBoard.getBoard()
        for (let i = 0; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if (board[i][j] === ""){
                    return false;
                }

            }
        }
        return true;


    }

    function gameStatus(){
        if (!aPlayerWon() && !boardFilled() ){
            return true;
        }
        else if (aPlayerWon()){
            return false;
        }
        else if (boardFilled()){
            return false;
        }
        
    }

    function displayAtGameBoardScreen(row,col,mark){
        if (row == 0){
            if (col == 0){
                gameBoardScreen.children[0].innerText = mark
            }
            else if (col == 1){
                gameBoardScreen.children[1].innerText = mark
            }
            else if (col == 2){
                gameBoardScreen.children[2].innerText = mark
            }

        }
        if (row == 1){
            if (col == 0){
                gameBoardScreen.children[3].innerText = mark
            }
            else if (col == 1){
                gameBoardScreen.children[4].innerText = mark
            }
            else if (col == 2){
                gameBoardScreen.children[5].innerText = mark
            }
        }
        if (row == 2){
            if (col == 0){
                gameBoardScreen.children[6].innerText = mark
            }
            else if (col == 1){
                gameBoardScreen.children[7].innerText = mark
            }
            else if (col == 2){
                gameBoardScreen.children[8].innerText = mark
            }
        }

    }


    function displayPlayerTurn(){
        if (player1.getTurn()){
            playerTurnText.innerText = player1.getName() + "'s turn"
        }
        else if (player2.getTurn()){
            playerTurnText.innerText = player2.getName() + "'s turn"
        }
    }
    // function to see which cell was clicked
    function play(){
        
        
        displayPlayerTurn()
        gameBoardScreen.children[0].addEventListener('click', ()=>{
           playYourTurn(0,0)
        });
        gameBoardScreen.children[1].addEventListener('click', ()=>{
            playYourTurn(0,1)
        });
        gameBoardScreen.children[2].addEventListener('click', ()=>{
            playYourTurn(0,2)
        });
        gameBoardScreen.children[3].addEventListener('click', ()=>{
            playYourTurn(1,0)
        });
        gameBoardScreen.children[4].addEventListener('click', ()=>{
            playYourTurn(1,1)
        });
        gameBoardScreen.children[5].addEventListener('click', ()=>{
            playYourTurn(1,2)
        });
        gameBoardScreen.children[6].addEventListener('click', ()=>{
            playYourTurn(2,0)
        });
        gameBoardScreen.children[7].addEventListener('click', ()=>{
            playYourTurn(2,1)
        });
        gameBoardScreen.children[8].addEventListener('click', ()=>{
            playYourTurn(2,2)
         });

        
    
    }


    return{play}



}


function displayGameFactory(){


    // get the start button
    const startGameButton = document.getElementById("start-game")
    let playerTurnText = document.getElementById("player-turn-text")
    
    const startGame =   startGameButton.addEventListener('click', ()=>{
        
        const playerOneName = document.getElementById("player-1").value
        const playerTwoName = document.getElementById("player-2").value
        if (playerOneName != "" && playerTwoName != "")
        {
              // get game Board 
            const gameBoard = document.getElementById("game-board")
            // make a game 
            let resultText = document.getElementById("game-result-text")
            let game = gameFactory(playerOneName,playerTwoName,gameBoard,resultText,playerTurnText)
            startGameButton.style.display = "none"
            game.play()
            
            
        }
        
    })

    return {startGame}

   
    
   
    



}



const displayGame = displayGameFactory()

