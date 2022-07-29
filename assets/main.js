let playerone = `assets/image/player1.png`; //***inserer img depuis dossier */
let playertwo = `assets/image/player2.png`;
let currentPlayer = playerone;
let score1 = 0;
let score2 = 0;
let round = 1;
let gameOver = false
let gridGravity = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41]

]
const winningConditions = [
    //les victoires horizontales
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
    //les victoires verticales
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
    //les victoires diagonales haut -> droite
    [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
    [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
    [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],
    //les victoires diagonales haut -> gauche
    [6, 12, 18, 24], [5, 11, 17, 23], [4, 10, 16, 22], [3, 9, 15, 21],
    [13, 19, 25, 31], [12, 18, 24, 30], [11, 17, 23, 29], [10, 16, 22, 28],
    [20, 26, 32, 38], [19, 25, 31, 37], [18, 24, 30, 36], [17, 23, 29, 35]
];

//*********faire apparetre symbole chacun son tour*****/

function displaypawn(element) {
    if (element.innerText == "" && gameOver == false) {
        setCurrentPlayer()
        element = gravity(element)

        //***inserer une image direct depuis le dossier*/
        let img = document.createElement('img')
        img.src = currentPlayer
        element.appendChild(img)
        //***inserer une image direct depuis le dossier*/
        img.classList.add('pions')
        victory()
        round++
    }
}

//*********jouer chacun son tour *****/

function setCurrentPlayer() {
    if (round % 2 == 0) {
        currentPlayer = playertwo;
    } else {
        currentPlayer = playerone;
    }
}

//*********fonction de victoire *****/

function victory() {
    for (let i = 0; i < winningConditions.length; i++) {
        let cell1 = document.querySelectorAll("td")[winningConditions[i][0]].querySelector('img');
        let cell2 = document.querySelectorAll("td")[winningConditions[i][1]].querySelector('img');
        let cell3 = document.querySelectorAll("td")[winningConditions[i][2]].querySelector('img');
        let cell4 = document.querySelectorAll("td")[winningConditions[i][3]].querySelector('img');
        if (cell1 == null || cell2 == null || cell3 == null || cell4 == null ) {
            continue
        }
        if (cell1.src == cell2.src && cell2.src == cell3.src && cell3.src == cell4.src) {
            if (cell1.src.indexOf(playerone) != -1) {
                document.querySelector("#player1").classList.add("player1bounce-in");
                document.querySelector("p").classList.add("bounce-in");
                score1++
                document.querySelector("#imgp1").innerText = `joueur ${score1}`;
                gameOver = true;
                break;
            } else if (cell1.src.indexOf(playertwo) != -1) {
                document.querySelector("#player2").classList.add("player2bounce-in");
                document.querySelector("p").classList.add("bounce-in");
                score2++;
                document.querySelector("#imgp2").innerText = `joueur ${score2}`;
                gameOver = true;
                break;
            }
        }
    }
    equality()
   
}

//*********fonction d'egalité *****/

function equality() {
    let count = 0 ;
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        let tab = document.querySelectorAll("td")[i].innerText;
        if (tab != "") {
            count++
        }
    }
    if ( count == document.querySelector("p").length){

      document.querySelector("p").innerText = "pas de gagnant"
    }
}

//*********fonction restart *****/

function restart() {
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        document.querySelectorAll("td")[i].innerText="";
    }
    document.querySelector("#player1").classList.remove("player1bounce-in");
    document.querySelector("#player2").classList.remove("player2bounce-in");
    document.querySelector("p").classList.remove("bounce-in");
    round = 1
    gameOver = false
    currentPlayer = playerone
}


//*********fonction de gravité *****/

function gravity(child){
    let result
    let parent = child.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, child);
      for (let i = gridGravity.length - 1; i => 0; i--){
        result = document.querySelectorAll('td')[gridGravity[i][index]];
        if(result.innerHTML != ""){
          continue;
        }
        break;
      }
    return result;
  };

