console.log("Hi");
const die1 = document.querySelector("#die1");
const die2 = document.querySelector("#die2");
const start = document.querySelector("#start-game");
const roll = document.querySelector("#roll-btn");
const individual = document.querySelector("#individual-btn");
const sum = document.querySelector("#sum-btn");
const end = document.querySelector("#end-btn");
const p1 = document.querySelector("#p1-name");
const p2 = document.querySelector("#p2-name");
const title = document.querySelector("#title");
const box1 = document.querySelector("#b1");
const box2 = document.querySelector("#b2");
const box3 = document.querySelector("#b3");
const box4 = document.querySelector("#b4");
const box5 = document.querySelector("#b5");
const box6 = document.querySelector("#b6");
const box7 = document.querySelector("#b7");
const box8 = document.querySelector("#b8");
const box9 = document.querySelector("#b9");
const header = document.querySelector(".header");
const gameboard = document.querySelector(".game-board");
const bottomstuff = document.querySelector(".bottom-stuff");
const winner = document.querySelector("#winner");
const playernames = document.querySelector(".player-names");
const winnerSection = document.querySelector("#winnerSection");
const roundTit = document.querySelector("#roundTit");
const boxes = [0,0,0,0,0,0,0,0,0,0];

let playersTurn = 1;
let round = 1;
let dieOneNum = 0;
let dieTwoNum = 0;
let playerOnePoints = 0;
let playerTwoPoints = 0;
let number = 5;

winner.style.visibility = "hidden";


start.addEventListener("click", function(){
        if (p1.value.trim() === '' || p2.value.trim() === '') {
        alert('Please fill in both player name fields.');
    } else {
        sum.disabled = false;
        end.disabled = false;
        individual.disabled = false;
        roll.disabled = false;
        title.textContent = p1.value.trim() + " vs " + p2.value.trim();
        start.remove();
        p1.remove();
        p2.remove();
        roundTit.textContent = "Round One";

    }
});


roll.addEventListener("click", function(){
if (playersTurn === 1){
    title.textContent = p1.value.trim() + "'s Turn";
}
dieOneNum = Math.floor(Math.random() * 6) + 1;
dieTwoNum = Math.floor(Math.random() * 6) + 1;
die1.textContent = dieOneNum;
die2.textContent = dieTwoNum;
die1.className="bi bi-dice-" + dieOneNum;
die2.className="bi bi-dice-" + dieTwoNum;
let boxUno="box" + dieOneNum;
let boxDos="box" + dieTwoNum;
checkDisable(dieOneNum, dieTwoNum);
roll.disabled = true;
return(dieOneNum);
return(dieTwoNum);
});

individual.addEventListener("click", function(){
    const boxElement = document.getElementById("b" + dieOneNum);
    const boxElement2 = document.getElementById("b" + dieTwoNum);
    boxElement.classList.add("shut");
    boxElement.textContent = "X";
    boxes[dieOneNum - 1] = "X";
    boxElement2.classList.add("shut");
    boxElement2.textContent = "X";
    boxes[dieTwoNum - 1] = "X";

boxes[9] = boxes[9] + dieOneNum + dieTwoNum;
individual.disabled = true;
sum.disabled = true;
roll.disabled = false;
});

sum.addEventListener("click", function(){
    const number = (dieOneNum + dieTwoNum);
    const boxElement = document.getElementById("b" + number);

    boxElement.classList.add("shut");
    boxElement.textContent = "X";
    boxes[number - 1] = "X";

boxes[9] = boxes[9] + number;
individual.disabled = true;
sum.disabled = true;
roll.disabled = false;
});

end.addEventListener("click", function(){
    let points = 45 - boxes[9];
    //if (round = 5){
        //end round, make everything hidden but scores
    //}

    if (playersTurn === 1){
        playersTurn = 2;
        const row = buildRow(round, points);
        const tbody = document.querySelector("#body");
        tbody.insertAdjacentElement("beforeend", row);
        playersTurn = 2;
    } else {
        playerTwoPoints = playerTwoPoints + points;
        const r2 = document.querySelector("#td" + round);
        r2.textContent = points;
        playersTurn = 1;
        round = round + 1;
    }
    resetBoard();
    if (playersTurn === 1){
        title.textContent = p1.value.trim() + "'s Turn";
    } else {
        title.textContent = p2.value.trim() + "'s Turn";
    }

    roundTit.textContent = "Round " + round;
    if (round > 5 && playerOnePoints < playerTwoPoints){
        title.style.visibility = "hidden";
        roundTit.textContent = "GAME OVER";
        roll.disabled = true;
        winner.style.visibility = "visible";
        winnerSection.textContent = p1.value.trim()
        hideEverything();
    } else if (round > 5 && playerTwoPoints < playerOnePoints) {
        title.style.visibility = "hidden";
        roundTit.textContent = "GAME OVER";
        roll.disabled = true;
        winner.style.visibility = "visible";
        winnerSection.textContent = p2.value.trim()
        hideEverything();
    } else {
        roll.disabled = false;
    }

    end.disabled = true;

});

function hideEverything(){
    header.style.visibility = "hidden";
    playernames.style.visiblity = "hidden";
    start.style.visiblity = "hidden";
    playernames.style.visiblity = "hidden";
    bottomstuff.style.visiblity = "hidden";
    gameboard.style.visiblity = "hidden";
};

function checkDisable(num1, num2){
    if (num1 === num2 || boxes[num1 - 1] === "X"  || boxes[num2 - 1] === "X") {
        individual.disabled = true;
    } else {
        individual.disabled = false;
    }

    if ((num1 + num2) > 9 || boxes[(num1+num2) - 1] === "X"){
        sum.disabled = true;
    } else {
        sum.disabled = false;
    }

    if (individual.disabled && sum.disabled) {
        end.disabled = false;
    } else {
        end.disabled = true;
    }
};

function individualMath (num1, num2){
    const boxElement = document.getElementById("b" + num1);
    boxElement.classList.add("shut");
    boxElement.textContent = "X";
    boxes[num2] = "X";
};

function resetBoard(){
    boxes.fill(0);
    const allBoxes = document.querySelectorAll(".open");
    allBoxes.forEach((space, index) => {
        space.classList.remove("shut");
        space.textContent = index + 1;
        boxes[9] = 0;
    });
};


function buildRow(roundNum, points){
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    const td2 = document.createElement("td");
    playerOnePoints = playerOnePoints + points;
    tr.id = "round" + roundNum;
    th.textContent = "Round " + roundNum;
    td.classList.add("p1Pts");
    td.textContent = points;
    td2.classList.add("p2Pts");
    td2.id = "td" + roundNum;
    tr.insertAdjacentElement("afterbegin", th);
    tr.insertAdjacentElement("beforeend", td);
    tr.insertAdjacentElement("beforeend", td2);
    return tr;

};

// //function shutBox (boxNum){
// //let box1 = document.querySelector("#b1");
// let box2 = document.querySelector("#b2");
// let box3 = document.querySelector("#b3");
// let box4 = document.querySelector("#b4");
// let box5 = document.querySelector("#b5");
// let box6 = document.querySelector("#b6");
// let box7 = document.querySelector("#b7");
// let box8 = document.querySelector("#b8");
// let box9 = document.querySelector("#b9");
//     boxNum.classList.add("shut");
//     boxNum.textContent = "X";
//}

