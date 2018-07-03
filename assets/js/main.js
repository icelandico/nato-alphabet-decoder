const clearButton = document.querySelector('.menu--clear--button');
const fullListButton = document.querySelector('.button--full-list');
const searchButton = document.querySelector('.menu--search--button');
const aboutButton = document.querySelector('.button--about');
const searchMenuButton = document.querySelector('.button--search-bar');
const searchValue = document.querySelector('.menu--value');
const resultDiv = document.querySelector('.result');
const fullListDiv = document.querySelector('.full-codes-list');
const searchBarDiv = document.querySelector('.menu-searchbar');
const aboutDiv = document.querySelector('.about');
const fullCodeListTable = document.querySelector('.table-codes');
const contentDivs = document.querySelectorAll('.content');
const menuButtons = document.querySelectorAll('.button');
let inputValue;
let result;
let counter = 0;
let wordInsert;

// Input Buttons

clearButton.addEventListener('click', clearInput);
searchButton.addEventListener('click', function() {
  clearResult();
  decode();
  intervalAppend();
});

searchValue.addEventListener('keydown', function(event) {
  enterSearch(event.key)
});

// Menu Buttons

Array.from(menuButtons).forEach(function(button) {
  button.addEventListener('click', function(e) {
    hideAndShowNextButton(e.target)
  })
});

// fullListButton.addEventListener('click', showList);
// searchMenuButton.addEventListener('click', showSearch);

function showSearch()  {
  fullListDiv.classList.toggle('hidden');
  aboutDiv.classList.toggle('hidden');
  clearResult();
  generateList();
  searchBarDiv.classList.toggle('hidden');
}

function decode() {
  inputValue = searchValue.value;
  inputValue = inputValue.toUpperCase().split("").filter(character => character.match(/[\S]/));
  result = (inputValue.map(letter => letter in alphabet ? alphabet[letter] : letter));
}

function putInDom() {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = result[counter];
  resultDiv.appendChild(newParagraph);
  counter < result.length - 1 ? counter ++ : clearInterval(wordInsert)
}

function clearInput() {
  searchValue.value = '';
}

function enterSearch(event) {
  if (event === 'Enter') {
    clearResult();
    decode();
    intervalAppend();
  }
}

function intervalAppend() {
  wordInsert = setInterval(putInDom, 500)
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
  Array.from(menuButtons).forEach(function(button) {
    if (button.classList.contains('hidden')) {
      button.classList.remove('hidden')
    }
    element.classList.add('hidden');
  })
}

