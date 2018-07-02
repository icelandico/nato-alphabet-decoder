const searchValue = document.querySelector('.menu--value');
const searchButton = document.querySelector('.menu--search--button');
const clearButton = document.querySelector('.menu--clear--button');
const resultContent = document.querySelector('.content');
const fullListButton = document.querySelector('.button--full-list');
const fullListDiv = document.querySelector('.full-codes-list');
const searchbarDiv = document.querySelector('.menu-searchbar');
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

function switchContent() {
  fullListButton.innerHTML === 'Full codes list' ? fullListButton.innerHTML ='Go to search' : fullListButton.innerHTML = 'Full codes list';
  searchbarDiv.classList.toggle('hidden');
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
  for (key in alphabet) {
    let newCodeParagraph = document.createElement('p');
    newCodeParagraph.innerHTML = key + " - " + alphabet[key];
    fullListDiv.appendChild(newCodeParagraph)
  }
}

function clearContent() {
  while (fullListDiv.firstChild) {
    fullListDiv.removeChild(fullListDiv.firstChild);
  }
}
