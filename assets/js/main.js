const buttonSearch = document.querySelector('.button--get');
const searchBar = document.querySelector('.menu-searchbar');
const searchValue = document.querySelector('.menu--input');
const resultContent = document.querySelector('.content');

buttonSearch.addEventListener('click', function() {
  searchBar.classList.toggle('show')
});

searchValue.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    decode()
  }
});

function decode() {
  let inputValue = searchValue.value;
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



