import { fromPairs, pick, zip } from 'es-toolkit/compat'

export const transformPageResult = (search: any, result: any[]) => {
  return {
    ...pick(search, ['page', 'pageSize']),
    ...fromPairs(zip(['data', 'total'], result)),
  }
}
