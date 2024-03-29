
const str = `There are moments in life when you miss someone so much that you just want to pick them from your dreams and hug them for real! Dream what you want to dream;go where you want to go;be what you want to be,because you have only one life and one chance to do all the things you want to do.

　　May you have enough happiness to make you sweet,enough trials to make you strong,enough sorrow to keep you human,enough hope to make you happy? Always put yourself in others shoes.If you feel that it hurts you,it probably hurts the other person, too.`



function findMostWord(str) {
  const match = {}
  let max = 0, target = null
  str.toLowerCase().replace(/[a-z]+/g, function(c) {
    if (match[c]) {
      match[c] += 1
    } else {
      match[c] = 1
    }
    if (match[c] > max) {
      max = match[c]
      target = c
    }
  })
  console.log(match, target, max)
}

findMostWord(str)