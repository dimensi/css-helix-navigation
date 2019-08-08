const shpere = document.querySelector('.sphere')
const planes = Array.from({ length: 36 }, createPlane)

shpere.append(...planes)


function createPlane(_, i) {
  const ul = document.createElement('ul')
  ul.className = 'plane'
  ul.style.transform = `rotateY(${(i + 1)*10}deg)`
  const lis = Array.from({ length: 18 }, createDot)
  ul.append(...lis)
  return ul
}

function createDot(_, i) {
  const li = document.createElement('li')
  li.style.transform = `rotate(${(i + 1) * 10}deg)`
  return li
}