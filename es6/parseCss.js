const obj = {
  body: {
    color: 'red',
    classA: {
      background: 'blue',
      spanA: {
        fontSize: '12px',
        color: '#000'
      }
    }
  }
}
/**
 {
  "body": {
    "color": "red"
  },
  "body.classA": {
    "background": "blue"
  },
  "body.classA.spanA": {
    "fontSize": "12px",
    "color": "#000"
  }
}
 */

// if (!r[prefix]) r[prefix] = {}
// r[prefix][key] = obj[key]  这两行可以替换35行
function parseCss(input) {
  const r = {}
  function iterator(obj, prefix = '') {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        (r[prefix] || (r[prefix] = {}))[key] = obj[key]
      } else {
        iterator(obj[key], prefix ? `${prefix}.${key}` : key)
      }
    }
  }
  iterator(input)
  return r
}

console.log(JSON.stringify(parseCss(obj), null, 2))