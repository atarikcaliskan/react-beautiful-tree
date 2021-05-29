import { TreeData } from '../src/types'

export const treeWithThreeLeaves: TreeData = {
  rootId: '1',
  items: {
    '1': {
      id: '1',
      children: ['1-1', '1-2', '1-3'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {},
    },
    '1-1': {
      id: '1-1',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: { title: 'one' },
    },
    '1-2': {
      id: '1-2',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: { title: 'two' },
    },
    '1-3': {
      id: '1-3',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: { title: 'three' },
    },
  },
}
