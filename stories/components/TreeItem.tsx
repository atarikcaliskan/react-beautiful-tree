import React from 'react'
import styled from '@emotion/styled'
import {
  AiOutlineFile,
  AiOutlineFolder,
  AiOutlineFolderOpen,
} from 'react-icons/ai'
import {
  IoCaretDownOutline as DownIcon,
  IoCaretForwardOutline as RightIcon,
} from 'react-icons/io5'
import { RenderItemParams } from '../../src'

export const ITEM_HEIGHT = 24

const StyledTreeItemWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  height: ${ITEM_HEIGHT}px;
  font-size: 14px;
  padding: 4px;
  background-color: ${({ isSelected }) =>
    isSelected ? '#defff3' : 'transparent'};
  border-radius: 4px 0 0 4px;
  &:hover {
    background-color: #f5f5f5;
  }
`

const StyledFileIcon = styled(AiOutlineFile)`
  margin-right: 4px;
`

const StyledFolderIcon = styled(AiOutlineFolder)`
  margin-right: 4px;
`

const StyledOpenFolderIcon = styled(AiOutlineFolderOpen)`
  margin-right: 4px;
`

const StyledDownIcon = styled(DownIcon)`
  margin-right: 4px;
`

const StyledRightIcon = styled(RightIcon)`
  margin-right: 4px;
`

export const TreeItem: React.FC<RenderItemParams> = ({
  item,
  provided,
  onCollapse,
  onExpand,
}) => {
  const [isSelected, setIsSelected] = React.useState(false)
  const renderItemIcon = () => {
    if (!item.hasChildren) return <StyledFileIcon size={14} />
    if (item.isExpanded) return <StyledOpenFolderIcon size={16} />
    return <StyledFolderIcon size={16} />
  }

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => setIsSelected(value => !value)}
    >
      <StyledTreeItemWrapper isSelected={isSelected}>
        {item.hasChildren &&
          (item.isExpanded ? (
            <StyledRightIcon size={12} onClick={() => onCollapse(item.id)} />
          ) : (
            <StyledDownIcon size={12} onClick={() => onExpand(item.id)} />
          ))}
        {renderItemIcon()}
        {item.data.title}
      </StyledTreeItemWrapper>
    </div>
  )
}
