import { cloneDeep } from 'es-toolkit'

/**
 * 列表转树形
 * @param list
 * @returns
 */
export function listToTree<T extends Record<string, any>>(list: T[]) {
  const map = new Map()
  const tree: Array<T & { children?: T[] }> = []
  const cloneList = cloneDeep(list)

  cloneList.forEach((item) => {
    map.set(item.id, item)
  })

  cloneList.forEach((item) => {
    const parent = map.get(item.parentId)
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }
    else {
      tree.push(item)
    }
  })

  return tree
}
