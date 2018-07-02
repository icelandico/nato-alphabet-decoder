const clearButton = document.querySelector('.menu--clear--button');
const fullListButton = document.querySelector('.button--full-list');
const searchButton = document.querySelector('.menu--search--button');
const aboutButton = document.querySelector('.button--about');
const searchValue = document.querySelector('.menu--value');
const resultContent = document.querySelector('.content');
const fullListDiv = document.querySelector('.full-codes-list');
const searchBarDiv = document.querySelector('.menu-searchbar');
const aboutDiv = document.querySelector('.about');
const fullCodeListTable = document.querySelector('.table-codes');
let inputValue;
let result;
let counter = 0;
let wordInsert;

searchButton.addEventListener('click', function() {
  clearResult();
  decode();
  intervalAppend();
});

clearButton.addEventListener('click', clearInput);
searchValue.addEventListener('keydown', function(event) {
  enterSearch(event.key)
});

fullListButton.addEventListener('click', switchContent);
aboutButton.addEventListener('click', switchAboutContent);

function switchAboutContent() {
  aboutButton.innerHTML === 'About' ? aboutButton.innerHTML ='Go to search' : aboutButton.innerHTML = 'About';
  searchBarDiv.classList.toggle('hidden');
  clearResult();
  clearContent();
  aboutDiv.classList.toggle('hidden');
}

function switchContent() {
  fullListButton.innerHTML === 'Full codes list' ? fullListButton.innerHTML ='Go to search' : fullListButton.innerHTML = 'Full codes list';
  searchBarDiv.classList.toggle('hidden');
  clearResult();
  generateList();
  fullListDiv.classList.toggle('hidden');
}

function decode() {
  inputValue = searchValue.value;
  inputValue = inputValue.toUpperCase().split("").filter(character => character.match(/[\S]/));
  result = (inputValue.map(letter => letter in alphabet ? alphabet[letter] : letter));
}

function putInDom() {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = result[counter];
  resultContent.appendChild(newParagraph);
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
  resultContent.innerHTML = '';
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
