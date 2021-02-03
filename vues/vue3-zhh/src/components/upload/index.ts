import Upload from './upload'
import type { App } from 'vue'

export default {
  install (app: App) {
    app.component(Upload.name, Upload)
  }
}
