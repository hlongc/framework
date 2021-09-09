/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
 var evaluate = function(s, knowledge) {
  const map = new Map()
  knowledge.forEach(item  => {
      map.set(item[0], item[1])
  })
  return s.replace(/(?:\()([a-z]+)(?:\))/g, function() {
    return map.has(arguments[1]) ? map.get(arguments[1]) : '?'
  })
};

console.log(evaluate('(name)is(age)yearsold', [["name","bob"],["age","two"]]))