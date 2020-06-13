const str = '我是{{ name }},今年{{ age }}岁,爱好{{ hobby }}'

const info = {
  name: 'hlc',
  age: 24,
  hobby: 'sleep'
}

function render(template, data) {
  const reg = /\{\{(\s+\w+\s+)\}\}/g
  return template.replace(reg, function() {
    return data[arguments[1].trim()]
  })
}

const res = render(str, info)
console.log(res)

let name = 'react-element-ui'
name = name.replace(/-\w/g, function() {
  return arguments[0].slice(1).toUpperCase()
})
console.log(name)