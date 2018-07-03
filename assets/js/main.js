const clearButton = document.querySelector('.menu--clear--button');
const searchButton = document.querySelector('.menu--search--button');
const searchValue = document.querySelector('.menu--value');
const resultDiv = document.querySelector('.result');
const fullCodeListTable = document.querySelector('.table-codes');
const contentDivs = Array.from(document.querySelectorAll('.content'));
const menuButtons = Array.from(document.querySelectorAll('.button'));
let inputValue;
let result;
let counter = 0;
let wordInsert;

// Input Buttons

clearButton.addEventListener('click', clearInput);
searchButton.addEventListener('click', function() {
  clearResult();
  decode();
  putInDom();
});

searchValue.addEventListener('keydown', function(event) {
  enterSearch(event.key)
});

// Menu Buttons

menuButtons.forEach(function(button) {
  button.addEventListener('click', function(e) {
    let clickedIndex = menuButtons.indexOf(e.target);
    clearResult();
    hideAndShowNextButton(e.target);
    clearDivs();
    showProperDiv(clickedIndex);
  })
});

function enterSearch(event) {
  if (event === 'Enter') {
    clearResult();
    decode();
    putInDom();
  }
}

function decode() {
  inputValue = searchValue.value;
  inputValue = inputValue.toUpperCase().split("").filter(character => character.match(/[\S]/));
  result = (inputValue.map(letter => letter in alphabet ? alphabet[letter] : letter));
}

function putInDom() {
  result.forEach(function (word) {
    let newParagraph = document.createElement('p');
    newParagraph.innerHTML = word;
    newParagraph.classList.add('unvisible');
    resultDiv.appendChild(newParagraph);
  });
  showAllWords();
}

function clearInput() {
  searchValue.value = '';
}

function showAllWords() {
  const newParagraphs = Array.from(document.querySelectorAll('p.unvisible'));
  wordInsert = setInterval(function() {
    newParagraphs[counter].classList.remove('unvisible');
    counter < newParagraphs.length - 1 ? counter++ : clearInterval(wordInsert)
  }, 350)
}

function clearResult() {
  counter = 0;
  resultDiv.innerHTML = '';
  result = [];
}

function generateList() {
  clearContent();
  let newTableRowHeader = document.createElement('tr');
  let newTableHeader1 = document.createElement('th');
  let newTableHeader2 = document.createElement('th');
  newTableHeader1.innerHTML = 'Symbol';
  newTableHeader2.innerHTML = 'Code';
  newTableRowHeader.appendChild(newTableHeader1);
  newTableRowHeader.appendChild(newTableHeader2);
  fullCodeListTable.appendChild(newTableRowHeader);
  for (key in alphabet) {
    let newCodeRow = document.createElement('tr');
    let newRowDataChar = document.createElement('td');
    let newRowDataCode = document.createElement('td');
    newRowDataChar.innerHTML = key;
    newRowDataCode.innerHTML = alphabet[key];
    newCodeRow.appendChild(newRowDataChar);
    newCodeRow.appendChild(newRowDataCode);
    fullCodeListTable.appendChild(newCodeRow)
  }
}

function clearContent() {
  while (fullCodeListTable.firstChild) {
    fullCodeListTable.removeChild(fullCodeListTable.firstChild);
  }
}

function hideAndShowNextButton(element) {
  menuButtons.forEach(function(button) {
    if (button.classList.contains('hidden')) {
      button.classList.remove('hidden')
    }
    element.classList.add('hidden');
  })
}

function clearDivs() {
  contentDivs.forEach(function(div) {
    div.classList.add('hidden')
  })
}

function showProperDiv(index) {
  contentDivs[index].classList.remove('hidden')
}

