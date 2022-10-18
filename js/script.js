"use strict";

// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

const playButton = document.getElementById('play');


function play(){

    const introText = document.getElementById('introText');
    introText.classList.add('d-none');

    console.log('inizio il gioco....');

    removeFirstNotification();
    const loose = document.getElementById('error');
    const win = document.getElementById('error');
    loose.classList.add('d-none');
    win.classList.add('d-none');
    const NUM_BOMB = 16;
    const bombsPosition = [];  
    let score = 1;
    let selettore;
    
    let scoretable = document.getElementById('punteggio');
    scoretable.innerHTML= '';

    // selezione del livello di difficoltà
    let numCell;
    const fieldGame = document.getElementById('fieldGame');
    fieldGame.innerHTML = '';
    const levelInput = document.getElementById('livello');
    const level = levelInput.value;

    
    switch(level){
        case '1':
        default:
            numCell = 100;
        break;
        case '2':
            numCell = 81;
        break;
        case '3':
            numCell = 49;
        break;
    }
    // operatore ternario
    // const numCell = (level === 1) ? 100 : (level === 2) ? 81 : 49;

    const MAX_ATTEMPT = numCell - NUM_BOMB;
    console.log(MAX_ATTEMPT)
   
    // funzione che crea la cella
    function drawCell(num){
        const cellPerSide = Math.sqrt(numCell);
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100% / ${cellPerSide}`;
        cell.style.height = `calc(100% / ${cellPerSide}`;

        cell.innerHTML = `
            <span>${num}</span>
        `;

     // funzioni che crea la bomba
    while(bombsPosition.length < NUM_BOMB){
        const bomb = randomNumber(1,numCell);
        if(!bombsPosition.includes(bomb)){
            bombsPosition.push(bomb);
        }
    }

    // assegnazione variabile bombe
     if(bombsPosition.includes(num)){
        cell.classList.add('bomb');
        // cell.innerHTML = '';
    };
      
    // evento per cambiare il colore quando si seleziona una casella
    cell.addEventListener('click', selettore = function noClick(){
            
        if(cell.classList.contains('bomb')){
            const bombField = document.querySelectorAll('.bomb');
            for (let i  = 0; i < bombField.length; i++){
                bombField[i].classList.add('red');

            };
            cell.classList.add('red');
            this.removeEventListener('click', noClick);
            endGame();

        }else{
            this.removeEventListener('click', noClick);
            this.classList.add('blue');
            let highscore = score++;
            console.log(score)
            scoretable.innerHTML = 'Score: ' + highscore; 
            console.log(highscore)
            // endGame();
        };
    })


    function endGame(){
        const squares = document.getElementsByClassName('square');
        for(let i = 0; i < squares.length; i ++){
            squares[i].classList.add('blue');
        }
        if(score === MAX_ATTEMPT){
            console.log('you win');
            win.classList.remove('d-none');
            const divAlert = notificationError('hai vinto!');
            win.append(divAlert); 
            
            
        }else{
            console.log('you lose')
            loose.classList.remove('d-none');
            loose.classList.add('bg-error');
            const divAlert = notificationError('hai perso!');
            loose.append(divAlert);  
        }
    }
    return cell;
}

console.log(bombsPosition);

    // funzione che crea il campo di gioco
    function drawGrid(){
        const grid = document.createElement('div');
        grid.className = 'grid';

        for(let i = 1; i <= numCell; i++){
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        fieldGame.appendChild(grid);
    }
    drawGrid();

}

playButton.addEventListener('click', play);




