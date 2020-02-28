const context = {}

function defineGetter(property, key) {
  context.__defineGetter__(key, function() {
    return this[property][key]
  })
}
defineGetter('request', 'method')
defineGetter('request', 'path')
defineGetter('response', 'body')
defineGetter('response', 'set')
defineGetter('response', 'statusCode')

function defineSetter(property, key) {
  context.__defineSetter__(key, function(newVal) {
    this[property][key] = newVal
  })
}

defineSetter('response', 'body')

module.exports = context