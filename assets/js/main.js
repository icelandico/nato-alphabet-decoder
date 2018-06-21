const buttonSearch = document.querySelector('.button--get');
const searchBar = document.querySelector('.menu-searchbar');
const searchValue = document.querySelector('.menu--input');
const resultContent = document.querySelector('.content');

buttonSearch.addEventListener('click', function() {
  searchBar.classList.toggle('show')
});

searchValue.addEventListener('keydown', function(e) {
  let inputValue = searchValue.value;
  if (e.key === 'Enter') {
    decode(inputValue)
  }
});

function decode(str) {
  str = str.toUpperCase().split("").filter(x => x.match(/[\S]/));
  let result = (str.map(function (x) {
    if (x in alphabet) {
      return alphabet[x]
    } else {
      return x;
    }
  }));
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

