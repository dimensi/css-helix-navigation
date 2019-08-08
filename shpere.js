const SPACE_SIZE = 4;
const words = ["about", "invest", "company", "build", "explore"];

const shpere = document.querySelector(".sphere");
const symbolWidths = getSymbolsWidths();
const delta = getDelta(words, SPACE_SIZE);
const orbit = createOrbit(words, delta, SPACE_SIZE);
const h = getWidthFromDelta(delta, symbolWidths['height']) * 2;
shpere.style.width = `${h}px`;
shpere.style.height = `${h}px`;

shpere.append(orbit);

let currentActive = 0

Array.from(document.querySelectorAll('.char-container'))
  .forEach(el => {
    const word = el.dataset.word
    el.addEventListener('click', () => {
      const index = words.findIndex(w => w === word)
      if (index === currentActive) return
      selectWord(word, true)
      currentActive = index
    })
  })



setTimeout(() => {
  selectWord(words[0])
}, 300)

function createOrbit(words, delta, spaceSize = 4) {
  const ul = document.createElement("ul");
  ul.className = "plane";

  const lis = createChars(words, spaceSize, delta);
  ul.append(...lis);
  return ul;
}

function createChars(words, spaceSize, delta) {
  const chars = [];
  let position = 0;
  words.forEach(word => {
    word.split('').forEach(char => {
      chars.push(createChar(position + symbolWidths[char] * delta / 2, char, word));
      position += symbolWidths[char] * delta;
    });
    position += symbolWidths['space'] * SPACE_SIZE * delta;
  });
  return chars;
}

function createChar(position, char, word) {
  const li = document.createElement("li");
  li.className = 'char-container'
  li.dataset.word = word
  li.style.transform = `rotate(${position}deg)`;
  const span = document.createElement('span')
  span.innerHTML = char
  span.className = 'char'
  li.append(span)
  return li;
}

function getDelta(words, spaceSize) {
  return 360 / getTotalSymbols(words, spaceSize);
}

function getTotalSymbols(words, spaceSize) {
  return (
    words.reduce(
      (sum, word) =>
        sum +
        word.split("").reduce((sum, char) => sum + symbolWidths[char], 0),
      0
    ) +
    symbolWidths['space'] * spaceSize * words.length
  );
}

function getWidthFromDelta(delta, symbolWidth) {
  return symbolWidth / 2 / Math.sin((delta / 2 / 180) * Math.PI);
}

function genCharArray(charA, charZ) {
  let a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

function getSymbolsWidths() {
  const letters = document.createElement("div");
  letters.append(
    ...genCharArray("a", "z")
      .concat("&nbsp;")
      .map(char => {
        const el = document.createElement("div");
        el.className = "testLetter";
        el.innerHTML = char;
        return el;
      })
  );
  document.body.append(letters);
  const symbolWidths = Array.from(letters.children, el => [
    el.innerHTML === '&nbsp;' ? 'space' : el.innerHTML,
    el.clientWidth / el.clientHeight
  ]);
  symbolWidths.push(['height', letters.children[0].clientHeight])
  letters.remove();
  return Object.fromEntries(symbolWidths);
}


function selectWord(word, reverse) {
  Array.from(document.querySelectorAll('.char-container'))
    .forEach(el => {
      el.classList.remove('char-container--active')
    })
  const els = document.querySelectorAll(`[data-word=${word}]`)
  Array.from(els).forEach(el => {
    el.classList.add('char-container--active')
  })
  const el = els[0]
  const lastDeg = parseInt(el.style.transform.replace('rotate(', '').replace('deg)', ''), 10)
  const rotateDeg = lastDeg
  const rotate = `rotate(${(reverse ? -rotateDeg : rotateDeg) - 75}deg)`
  orbit.style = `transform: rotateX(245deg) rotateY(-75deg) rotate3d(1, 1, 1, 45deg) ${rotate}`
}