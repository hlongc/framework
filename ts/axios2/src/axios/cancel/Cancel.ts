export default class Cancel {
  constructor(public message: string) {}
}

export function isCancel(instance:any): boolean {
  return instance instanceof Cancel
}