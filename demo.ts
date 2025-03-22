import { extend } from 'es-toolkit/compat'

const obj1 = { a: 1, b: 2 }
const obj2 = { c: 1, d: 2 }

const obj3 = extend(obj2, obj1)

console.log(obj3, obj2)

obj3.d = 4

console.log(obj3, obj2)
