const searchValue = document.querySelector('.menu--value');
const searchButton = document.querySelector('.menu--search--button');
const clearButton = document.querySelector('.menu--clear--button');
const resultContent = document.querySelector('.content');
let inputValue;

searchButton.addEventListener('click', decode);
searchValue.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    decode()
  }
});

clearButton.addEventListener('click', clearInput);

function decode() {
  inputValue = searchValue.value;
  inputValue = inputValue.toUpperCase().split("").filter(x => x.match(/[\S]/));
  let result = (inputValue.map(letter => letter in alphabet ? alphabet[letter] : letter));

  putInDom(result)
}

function putInDom(phrase) {
  resultContent.innerHTML = '';
  for (let i = 0; i < phrase.length; i++) {
    let newPara = document.createElement('p');
    newPara.innerHTML = phrase[i];
    resultContent.appendChild(newPara)
  }
}

function clearInput() {
  searchValue.value = '';
}
