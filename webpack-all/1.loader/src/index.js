const title1 = require('./title1')
const title2 = require('./title2')

console.log(title1, title2)

const image = new Image()
const src = require('./shotscreen.png').default
image.src = src
document.body.appendChild(image)

const sum = (a, b) => a + b
const res = sum(2, 3)
console.log(res)