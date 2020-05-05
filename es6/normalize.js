const normalize = (str) => {
  var result = {}
  str.split(/[\[\]]/g).filter(Boolean).reduce((obj, item, index, a) => {
    obj.value = item
    if(index !== a.length -1) {
      return (obj.children = {})
    }
  }, result)
  return result
}

console.log(normalize('[abc[bcd[def]]]'))

/**
 * https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/331
  字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
  示例一: 'abc' --> {value: 'abc'}
  示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
 */