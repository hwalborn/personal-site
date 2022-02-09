import * as React from 'react';
import { useDrop } from 'react-dnd';

import { DropNavProps } from '../../types';
import { DropTypes } from '../../types';

require('../../style/dropNav.less');

export const DropNav = (props: DropNavProps) => {
    const [styling, drop] = useDrop({
        accept: DropTypes.NAVIGATOR,
        drop: props.navigate,
        collect: (monitor) => ({
            backgroundColor: monitor.isOver() ? 'grey' : 'transparent'
        }),
        
      });
    return <div ref={drop} className={props.className} style={styling}>{props.navigateTo}</div>
}