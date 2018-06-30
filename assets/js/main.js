const searchValue = document.querySelector('.menu--value');
const searchButton = document.querySelector('.menu--search--button');
const clearButton = document.querySelector('.menu--clear--button');
const resultContent = document.querySelector('.content');
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

function decode() {
  inputValue = searchValue.value;
  inputValue = inputValue.toUpperCase().split("").filter(x => x.match(/[\S]/));
  result = (inputValue.map(letter => letter in alphabet ? alphabet[letter] : letter));
}

function putInDom() {
  let newPara = document.createElement('p');
  newPara.innerHTML = result[counter];
  resultContent.appendChild(newPara);
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
