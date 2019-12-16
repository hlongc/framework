const less = require('less')

function loader(source) {
  const callback = this.async()
  less.render(source, (err, output) => {
    callback(err , output.css)
  })
}

module.exports = loader