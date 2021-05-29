import { TreeData } from '../src/types'
export const treeInitiallyClosed: TreeData = {
  rootId: 'tree',
  items: {
    tree: {
      id: 'tree',
      children: ['a', 'b'],
    },
    a: {
      id: 'a',
      isExpanded: false,
      hasChildren: true,
      children: ['c'],
    },
    b: {
      id: 'b',
      isExpanded: false,
      hasChildren: true,
      children: ['d'],
    },
    c: {
      id: 'c',
      children: [],
    },
    d: {
      id: 'd',
      children: [],
    },
  },
}
