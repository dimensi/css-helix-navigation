const ENGLISH_LETTER = 0.6949152542372882;
const SPACE_SIZE = 4;
const words = ["about", "invest", "company", "build", "explore"];

const shpere = document.querySelector(".sphere");
const symbolWidths = getSymbolsWidths();
const delta = getDelta(words, SPACE_SIZE);
const orbit = createOrbit(words, delta, SPACE_SIZE);
const h = getWidthFromDelta(delta, ENGLISH_LETTER * 50) * 2;
shpere.style.width = `${h}px`;
shpere.style.height = `${h}px`;

shpere.append(orbit);

function createOrbit(words, delta, spaceSize = 4) {
  const ul = document.createElement("ul");
  ul.className = "plane";
  ul.style.transform = `rotateX(255deg) rotateY(-75deg) rotate3d(1, 1, 1, 45deg)`;

  const lis = createChars(words, spaceSize, delta);
  ul.append(...lis);
  return ul;
}

function createChars(words, spaceSize, delta) {
  return words
    .reverse()
    .map(word => word + " ".repeat(spaceSize))
    .join("")
    .split("")
    .map(createChar(delta));
}

function createChar(delta) {
  return (char, i) => {
    const li = document.createElement("li");
    li.dataset.char = char;
    li.style.transform = `rotate(${delta * symbolWidths[char] * (i + 1)}deg)`;
    return li;
  };
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
    symbolWidths['space'] * spaceSize * words.length * 50
  );
}

function getWidthFromDelta(delta, symbolWidth) {
  return symbolWidth / 2 / Math.sin((delta / 2 / 180) * Math.PI);
}

function genCharArray(charA, charZ) {
  var a = [],
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
