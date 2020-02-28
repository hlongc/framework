const response = {
  _body: undefined,
  set body(newVal) {
    this.statusCode(200)
    this._body = newVal
  },
  get body() {
    return this._body
  },
  set(key, value) {
    this.res.setHeader(key, value)
  },
  statusCode(val) {
    this.res.statusCode = val
  }
}

module.exports = response