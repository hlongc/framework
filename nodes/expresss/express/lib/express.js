const Application = require('./application')
const Router = require('./router')

// 创建应用
function createApplication() {
  return new Application()
}
// 路由系统
createApplication.Router = Router

module.exports = createApplication