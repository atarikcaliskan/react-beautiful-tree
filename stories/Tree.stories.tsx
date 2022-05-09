import React from 'react'
import styled from '@emotion/styled'
import {
  Tree,
  mutateTree,
  RenderItemParams,
  TreeData,
  ItemId,
  moveItemOnTree,
  TreeSourcePosition,
  TreeDestinationPosition,
} from '../src'
import { virtualTree } from '../src/mockdata/virtualTree'
import { ITEM_HEIGHT, TreeItem } from './components/TreeItem'

export default { title: 'Tree' }

const OFFSET_PER_LEVEL = 36

const StyledTreeWrapper = styled.div`
  padding: 24px;
  height: 100%;
  border: 1px solid #ededed;
  border-radius: 8px;
  margin: 24px;
  padding: 24px;
  max-width: 500px;
  overflow-y: auto;
`

const StyledVirtualTreeWrapper = styled.div`
  height: 100vh;
  border: 1px solid #ededed;
  border-radius: 8px;
  margin: 24px;
  padding: 24px;
  max-width: 500px;
`

const renderItem = ({ ...props }: RenderItemParams) => {
  return <TreeItem {...props} />
}

export const Default: React.FC = () => {
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
    <StyledTreeWrapper>
      <Tree
        tree={tree}
        renderItem={renderItem}
        onExpand={onExpand}
        isDragEnabled
        onDragEnd={onDragEnd}
        offsetPerLevel={OFFSET_PER_LEVEL}
        onCollapse={onCollapse}
      />
    </StyledTreeWrapper>
  )
}

export const Virtual: React.FC = () => {
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
    <StyledVirtualTreeWrapper>
      <Tree
        tree={tree}
        renderItem={renderItem}
        onExpand={onExpand}
        isDragEnabled
        isVirtualizationEnabled
        onDragEnd={onDragEnd}
        offsetPerLevel={OFFSET_PER_LEVEL}
        virtualItemHeight={ITEM_HEIGHT}
        onCollapse={onCollapse}
      />
    </StyledVirtualTreeWrapper>
  )
}
