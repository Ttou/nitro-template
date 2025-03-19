interface IDefineEnumParams {
    [key: string]: {
        label: string;
        value: string | number;
        [key: string]: any
    }
}

export const defineEnum = <T extends IDefineEnumParams>(params: T) => {
    const options = Object.values(params) as Array<T[keyof T]>

    const map = options.reduce((acc, cur) => {
        acc[cur['value']] = cur
        return acc
    }, {} as Record<T[keyof T]['value'], T[keyof T]>)

    const values = Object.keys(params).reduce((acc, cur) => {
        (acc as any)[cur] = params[cur]['value']
        return acc
    }, {} as Record<keyof T, T[keyof T]['value']>)

    return {
        options,
        map,
        ...values
    }
}