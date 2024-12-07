export abstract class BaseOptionsFactory {
  static enum: Record<string, string | number>
  static labels: string[]
  private static _options?: Array<{ label: string, value: string | number }>
  private static _values?: Array<string | number>
  private static _map?: Record<string | number, string>

  static get values() {
    if (!this.enum) {
      throw new Error('enum is required')
    }
    if (!this._values) {
      this._values = Object.values(this.enum)
    }
    return this._values
  }

  static get options() {
    if (!this.enum || !this.labels) {
      throw new Error('enum and labels is required')
    }
    if (!this._options) {
      this._options = Object.values(this.enum).map((v, i) => ({ label: this.labels[i], value: v }))
    }

    return this._options
  }

  static get map() {
    if (!this.enum || !this.labels) {
      throw new Error('enum and labels is required')
    }
    if (!this._map) {
      this._map = Object.values(this.enum).reduce((total: any, v: any, i) => {
        total[v] = this.labels[i]
        return total
      }, {})
    }
    return this._map
  }
}