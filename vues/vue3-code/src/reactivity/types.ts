export interface HandlerType {
  get: () => any,
  set: (val: any) => boolean
}