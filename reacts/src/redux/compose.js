export default function compose(...middlewares) {
  return middlewares.reduce((a, b) => (...args) => a(b(...args)))
}