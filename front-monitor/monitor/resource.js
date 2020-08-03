export default {
  init(cb) {
    window.addEventListener('load', function() {
      const resource = performance.getEntriesByType('resource')
      cb(resource.filter(item => !item.name.endsWith('bundle.js')).map(_ => ({
        name: _.name,
        initiatorType: _.initiatorType,
        duration: _.duration
      })))
    })
  }
}