import * as React from 'react';
import {useDrop} from 'react-dnd';

import {DropTypes} from '../../env/dropTypes';

require('../../style/dropNav.less');

type DropNavProps = {
    navigate: () => void;
    className: string;
    navigateTo: string;
}

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