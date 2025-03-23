interface IParams {
  [key: string]: {
    label: string
    value: string | number
    [key: string]: any
  }
}

export function defineEnum<T extends IParams>(params: T) {
  const options = Object.values(params) as Array<T[keyof T]>

  const map = Object.keys(params).reduce((acc, cur) => {
    (acc as any)[params[cur]['value']] = params[cur]
    return acc
  }, {} as Record<T[keyof T]['value'], T[keyof T]>)

  const values = options.map(item => item['value'] as T[keyof T]['value'])

  const keyValueMap = Object.keys(params).reduce((acc, cur) => {
    (acc as any)[cur] = params[cur]['value']
    return acc
  }, {} as Record<keyof T, any>) // 此处没必要指定类型

  return {
    options,
    map,
    values,
    ...keyValueMap,
  }
}

export type IEnumType<T extends ReturnType<typeof defineEnum<any>>> = T['values'][number]
