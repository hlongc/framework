import Cancel from './Cancel'

export default class CancelToken {
  public resolve!: (val?: any) => any
  source() {
    return {
      token: new Promise(resolve => {
        this.resolve = resolve
      }),
      cancel: (message: any) => {
        console.log(this)
        this.resolve(new Cancel(message))
      }
    }
  }
}