/**
 * Quelques variables pour gérer le jeu
 */

// une variable qui contient la position et l'orientation du jour
var player = {
  x: 0,
  y: 0,
  direction: 'right',
  sprite: 0,
  nbMoves: 0
};

// une variable pour la taille du plateau
var boardSize = {
  lines: 4,
  columns: 6
};

// une variable pour la case d'arrivée
var targetCell = {
  x: 5,
  y: 3
};

// une variable pour se rappeler si la partie est finie
var gameIsOver = false;

// une variable tableau (Array) pour stocker les cases interdites
var forbiddenCells = [];


/**
 * Fonction d'initialisation.
 * Cette fonction est lancée par le navigateur quand la page a fini de chager (cf dernière ligne.)
 * Son rôle est d'appeller les différentes autres fonctions, notamment drawBoard()
 */
var init = function () {
  drawBoard();
  listenKeyboardEvents();
  // on accroche la fonction au bouton pour ajouter des cases rouges
  document.getElementById('addForbiddenCellsButton').addEventListener('click', addForbiddenCells);
};

/**
 * Fonction pour dessiner le tableau de jeu
 */
var drawBoard = function () {
  let container = document.getElementById('board');
  for (var lineNumber = 0; lineNumber < boardSize.lines; lineNumber++) {
    let line = document.createElement('div');
    line.className = "row";

    for (var colNumber = 0; colNumber < boardSize.columns; colNumber++) {
      let cell = document.createElement('div');
      cell.className = "cell";
      // Test : si la case est aux meme coordonnées que le joueur, on met le joueur dedans :)
      if (colNumber == player.x && lineNumber == player.y) {
        let playerDiv = document.createElement('div');
        playerDiv.id = 'player';
        playerDiv.className = "player "+player.direction+" sprite-"+player.sprite;
        cell.appendChild(playerDiv);
      }
      // Test : ajouter une classe à la case de départ
      if (colNumber == 0 && lineNumber == 0) {
        cell.className += " departureCell";
      }
      // Test : ajouter une classe à la case d'arrivée
      if (colNumber == targetCell.x && lineNumber == targetCell.y) {
        cell.className += " targetCell";
      }

      for (let fCell of forbiddenCells) {
        if (colNumber == fCell.x && lineNumber == fCell.y) {
          cell.className += " forbiddenCell";
        }
      }

      line.appendChild(cell);
    }

    container.appendChild(line);
  }
  // on met à jour le compteur de mouvements
  document.getElementById('nbMoves').textContent = player.nbMoves;
  // A chaque fois qu'on dessine le tableau, on va vérifier si la partie n'est pas terminée
  gameOver();
};

/**
* Fonction pour reset le board
*/
var clearBoard = function () {
  let container = document.getElementById('board');
  while(container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}

var redrawBoard = function () {
  clearBoard();
  drawBoard();
}

/**
* Fonctions pour manipuler le personnage
*/
var turnRight = function () {
  // on ne bouge que si la partie n'est pas finie !
  if (gameIsOver) {
    return;
  }

  switch (player.direction) {
    case 'right':
      player.direction = 'down';
      break;
    case 'down':
      player.direction = 'left';
      break;
    case 'left':
      player.direction = 'up';
      break;
    case 'up':
      player.direction = 'right';
      break;
    default:
      console.log('Unable to make player rotate !');
      return;
  }
  player.nbMoves ++ ;
  console.log('Player has turned. Its direction is now : '+player.direction);
  // on déclenche la mise à jour visuelle
  redrawBoard();
};

var turnLeft = function () {
  // on ne bouge que si la partie n'est pas finie !
  if (gameIsOver) {
    return;
  }

  switch (player.direction) {
    case 'right':
      player.direction = 'up';
      break;
    case 'down':
      player.direction = 'right';
      break;
    case 'left':
      player.direction = 'down';
      break;
    case 'up':
      player.direction = 'left';
      break;
    default:
      console.log('Unable to make player rotate !');
      return;
  }
  player.nbMoves ++ ;
  console.log('Player has turned. Its direction is now : '+player.direction);
  // on déclenche la mise à jour visuelle
  redrawBoard();
};

var moveForward = function () {
  // on ne bouge que si la partie n'est pas finie !
  if (gameIsOver) {
    return;
  }

  switch (player.direction) {
    case 'right':
      if (player.x >= boardSize.columns-1 ) {
        console.log('Unable to move player. Board limit Reached !');
        return;
      }
      player.x += 1;
      break;
    case 'left':
        if (player.x <= 0 ) {
          console.log('Unable to move player. Board limit Reached !');
          return;
        }
        player.x -= 1;
        break;
    case 'down':
      if (player.y >= boardSize.lines-1 ) {
        console.log('Unable to move player. Board limit Reached !');
        return;
      }
      player.y += 1;
      break;
    case 'up':
      if (player.y <= 0 ) {
        console.log('Unable to move player. Board limit Reached !');
        return;
      }
      player.y -= 1;
      break;
    default:
      console.log('Unable to make player move !');
      return;
  }
  console.log('Player moved!');
  player.sprite += 1;
  player.sprite %= 4;
  player.nbMoves ++ ;
  // on déclenche la mise à jour visuelle
  redrawBoard();
};

/**
* Tester si la partie est finie
*/
var gameOver = function () {
  if (player.x == targetCell.x && player.y == targetCell.y) {
    alert('Victoire en '+player.nbMoves+' déplacements !');
    gameIsOver = true;
  }
  // on teste si le joueur est sur une case interdite
  for (let cell of forbiddenCells) {
    if (cell.x == player.x && cell.y == player.y) {
      killPlayer();
    }
  }
}


/**
* Fonction pour écouter les évenements claviers sur la page
*/
var listenKeyboardEvents = function () {
  document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
      case 37 : //left
        console.log('Left key has been pressed...');
        turnLeft();
        break;
      case 38 : // up
        console.log('Up key has been pressed...');
        moveForward();
        break;
      case 39 : //right
        console.log('Right key has been pressed...');
        turnRight();
        break;
    }
  });
}

/**
* Fonction déclenché par le click sur le bouton
*/
var addForbiddenCells = function () {
  forbiddenCells.push({x: 3,y: 0});
  forbiddenCells.push({x: 3,y: 1});
  forbiddenCells.push({x: 3,y: 2});
  redrawBoard();
}

/**
* La fonction pour faire du bruit
*/
var surprise = function () {
  document.getElementById('easterEgg').play();
};

/**
* Une fonction pour tuer le joueur
**/

var killPlayer = function () {
  alert('Raté!');
  if ( /beautiful/.test(document.getElementById('board').className) ) {
    // on ne déclenche le son que si on est en mode beautiful :)
    document.getElementById('deathSound').play();
  }
  gameIsOver = true;
  document.getElementById('player').className='player dead';
}

/**
* changer les textures !
*/
var makeMeBeautiful = function () {
  document.getElementById('board').className += " beautiful";
}

document.addEventListener('DOMContentLoaded', init );
