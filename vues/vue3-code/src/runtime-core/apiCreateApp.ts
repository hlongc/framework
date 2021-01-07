export function createAppApi(renderer: Function) {
  return function(rootComponent: any) {
    const app = {
      mount(rootEl: HTMLElement | string) {
        console.log(rootEl)
      }
    }
    return app
  }
}