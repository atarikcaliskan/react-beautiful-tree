import React, { Component, KeyboardEvent } from 'react'
import Tree, {
  mutateTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
} from '../src'
import { treeWithTwoBranches } from '../src/mockdata/treeWithTwoBranches'

export default { title: 'Tree' }

const renderItem = ({ item, provided }: RenderItemParams) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    {item.data ? item.data.title : ''}
  </div>
)

export const StaticTree: React.FC = () => {
  const [tree, setTree] = React.useState(treeWithTwoBranches)

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }))
  }

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }))
  }

  return (
    <Tree
      tree={tree}
      renderItem={renderItem}
      onExpand={onExpand}
      onCollapse={onCollapse}
    />
  )
}
