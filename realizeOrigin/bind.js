Function.prototype.myBind = function(context) {
  const self = this
  const args = Array.prototype.slice.call(this.arguments, 1)
  return function () {
    const args1 = Array.prototype.slice.call(arguments)
    return self.apply(context, args.concat(args1))
  }
}