const utils = require('loader-utils')

function loader2(inputSource) {
  const { msg } = utils.getOptions(this) // this: loaderContext
  return inputSource + msg
}

module.exports = loader2