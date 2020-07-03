
function demo() {
  var count = 0
  return function() {
    if (count < 2000) {
      ++count
    }
    console.log(count)
  }
}

const counter = demo()
for (let k = 0; k < 2005; k++) {
  counter()
}
