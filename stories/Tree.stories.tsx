import React, { Component, KeyboardEvent } from 'react'
import Tree, {
  mutateTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  moveItemOnTree,
  TreeSourcePosition,
  TreeDestinationPosition,
} from '../src'
import { treeWithTwoBranches } from '../src/mockdata/treeWithTwoBranches'
import TreeBuilder from '../src/mockdata/TreeBuilder'
import { virtualTree } from '../src/mockdata/virtualTree'

export default { title: 'Tree' }

const renderItem = ({
  item,
  provided,
  onCollapse,
  onExpand,
}: RenderItemParams) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div style={{ display: 'flex' }}>
        {item.hasChildren &&
          (item.isExpanded ? (
            <div
              style={{ paddingRight: 4 }}
              onClick={() => onCollapse(item.id)}
            >
              -
            </div>
          ) : (
            <div style={{ paddingRight: 4 }} onClick={() => onExpand(item.id)}>
              +
            </div>
          ))}
        {item.data ? item.data.title : ''}
      </div>
    </div>
  )
}

export const DefaultTree: React.FC = () => {
  const [tree, setTree] = React.useState<TreeData>(virtualTree)

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }))
  }

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }))
  }

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    if (!destination) return

    const newTree = moveItemOnTree(tree, source, destination)
    setTree(newTree)
  }

  return (
    <Tree
      tree={tree}
      renderItem={renderItem}
      onExpand={onExpand}
      isDragEnabled
      onDragEnd={onDragEnd}
      offsetPerLevel={16}
      onCollapse={onCollapse}
    />
  )
}
export const VirtualTree: React.FC = () => {
  const [tree, setTree] = React.useState<TreeData>(virtualTree)

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }))
  }

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }))
  }

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    if (!destination) return

    const newTree = moveItemOnTree(tree, source, destination)
    setTree(newTree)
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Tree
        tree={tree}
        renderItem={renderItem}
        onExpand={onExpand}
        isDragEnabled
        isVirtualizationEnabled
        onDragEnd={onDragEnd}
        offsetPerLevel={16}
        onCollapse={onCollapse}
      />
    </div>
  )
}
