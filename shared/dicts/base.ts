export class BaseDict<T extends Record<string, any>, K extends Record<string, any>> {
  private _enum: T
  private _enumMap: K

  constructor(_enum: T, _enumMap: K) {
    this._enum = _enum
    this._enumMap = _enumMap
  }

  get enum() {
    return this._enum
  }

  get map() {
    return this._enumMap
  }

  values(): Array<T[keyof T]> {
    return Object.values(this._enum)
  }

  options(): Array<{ value: keyof K } & K[keyof K]> {
    return Object.entries(this._enumMap).map(([key, item]) => ({ ...item, value: key }))
  }
}

export type IEnumType<T> = T[keyof T]
