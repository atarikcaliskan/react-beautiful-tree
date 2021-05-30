import { Component } from 'react'
import {
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'
import { isSamePath } from '../../utils/path'
import { sameProps } from '../../utils/react'
import { Props, TreeDraggableProvided } from './TreeItem-types'

export default class TreeItem extends Component<Props> {
  shouldComponentUpdate (nextProps: Props) {
    return (
      !sameProps(this.props, nextProps, [
        'item',
        'provided',
        'snapshot',
        'onCollapse',
        'onExpand',
        'style',
      ]) || !isSamePath(this.props.path, nextProps.path)
    )
  }

  patchDraggableProps = (
    draggableProps: DraggableProvidedDraggableProps,
    snapshot: DraggableStateSnapshot
  ): DraggableProvidedDraggableProps => {
    const { path, offsetPerLevel, style } = this.props

    const transitions =
      draggableProps.style && draggableProps.style.transition
        ? [draggableProps.style.transition]
        : []
    if (snapshot.dropAnimation) {
      transitions.push(
        // @ts-ignore
        `padding-left ${snapshot.dropAnimation.duration}s ${snapshot.dropAnimation.curve}`
      )
    }
    const transition = transitions.join(', ')

    return {
      ...draggableProps,
      style: {
        ...draggableProps.style,
        paddingLeft: (path.length - 1) * offsetPerLevel,
        // @ts-ignore
        transition,
        ...style,
      },
    }
  }

  render () {
    const {
      item,
      path,
      onExpand,
      onCollapse,
      renderItem,
      provided,
      snapshot,
      itemRef,
    } = this.props

    const innerRef = (el: HTMLElement | null) => {
      itemRef(item.id, el)
      provided.innerRef(el)
    }

    const finalProvided: TreeDraggableProvided = {
      draggableProps: this.patchDraggableProps(
        provided.draggableProps,
        snapshot
      ),
      dragHandleProps: provided.dragHandleProps,
      innerRef,
    }

    return renderItem({
      item,
      depth: path.length - 1,
      onExpand: itemId => onExpand(itemId, path),
      onCollapse: itemId => onCollapse(itemId, path),
      provided: finalProvided,
      snapshot,
    })
  }
}
