import * as React from 'react';
import { useDrag } from 'react-dnd';

import { DropTypes } from '../../types';
import { DragNavProps } from '../../types';
import '../../style/dragNav.less';

export const DragNav = (props: DragNavProps) => {
    const [style, dragRef] = useDrag({
        item: { type: DropTypes.NAVIGATOR },
        collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.5 : 1,
          animationPlayState: monitor.isDragging() ? 'paused' : '',
          backgroundColor: monitor.isDragging() ? 'black' : ''
        }),
        begin: () => {
            props.onDragBegin();
        },
        end: () => {
            props.onDragEnd()
        }
      })
    return (
    <div id="nav-container">
        <div ref={dragRef} className={props.className} style={style}>
            <p>Nav</p>
        </div>
    </div>
    )
}