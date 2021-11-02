function createBoard() {
  const pixelBoard = document.getElementById('pixel-board');
  for (let i = 1; i <= 25; i += 1) {
    const div = document.createElement('div');
    div.className = 'pixel';
    pixelBoard.appendChild(div);
    if (i % 5 === 0) {
      const br = document.createElement('br');
      pixelBoard.appendChild(br);
    }
  }
}

function removeSelected() {
  const selected = document.querySelector('.selected');
  selected.classList.remove('selected');
}

function selectPalette(event) {
  removeSelected();
  const paletteSelected = event.target;
  paletteSelected.classList.add('selected');
}

function createEventPalette() {
  const allColors = document.querySelectorAll('.color');
  for (let i = 0; i < allColors.length; i += 1) {
    allColors[i].addEventListener('click', selectPalette);
  }
}

function fillColor(event) {
  const element = event.target;
  const colorSelected = document.querySelector('.selected');
  const color = getComputedStyle(colorSelected).backgroundColor;
  element.style.backgroundColor = color;
}

function createEventBoard() {
  const allPixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < allPixels.length; i += 1) {
    allPixels[i].addEventListener('click', fillColor);
  }
}

function randomColors() {
  const colors = ['blue', 'yellow', 'pink', 'grey', 'green', 'red',
    'purple', 'orange', 'brown', 'beige', 'gold', 'silver', 'violet'];
  for (let i = 1; i <= 3; i += 1) {
    const position = Math.floor(Math.random() * colors.length);
    const color = colors[position];
    colors.splice(position, 1);
    const colorPalette = document.getElementById('color-palette');
    const div = document.createElement('div');
    div.classList = `color ${color}`;
    div.style.backgroundColor = color;
    colorPalette.appendChild(div);
  }
  createEventPalette();
}

window.onload = function carregaPagina() {
  const paletteBlack = document.getElementById('color-palette').firstElementChild;
  paletteBlack.classList.add('selected');
  createBoard();
  createEventPalette();
  createEventBoard();
  randomColors();
};

const clearBoard = document.getElementById('clear-board');
clearBoard.addEventListener('click', () => {
  const allPixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < allPixels.length; i += 1) {
    allPixels[i].style.backgroundColor = 'white';
  }
});

function generateBoard(valueInput) {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.innerHTML = '';
  for (let line = 1; line <= valueInput; line += 1) {
    for (let col = 1; col <= valueInput; col += 1) {
      const div = document.createElement('div');
      div.className = 'pixel';
      pixelBoard.appendChild(div);
    }
    const br = document.createElement('br');
    pixelBoard.appendChild(br);
  }
  createEventBoard();
}

const buttonGenerate = document.getElementById('generate-board');
buttonGenerate.addEventListener('click', () => {
  let valueInput = document.getElementById('board-size').value;
  if (valueInput === '') {
    alert('Board inválido!');
  } else if (valueInput <= 5) {
    valueInput = 5;
    generateBoard(valueInput);
  } else if (valueInput >= 50) {
    valueInput = 50;
    generateBoard(valueInput);
  } else {
    generateBoard(valueInput);
  }
});
