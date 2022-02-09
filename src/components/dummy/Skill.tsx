import * as React from 'react';

import { SkillProps } from '../../types';

export const SkillDummy = (props: SkillProps) => {

    const NOT_IN_VIEW_CLASS = 'not-in-view';
    const [inView, setView] = React.useState(NOT_IN_VIEW_CLASS);
    const selector = React.createRef<HTMLDivElement>();

    const handleScroll = () => {
        if (selector.current) {
            const isElementInView = isInViewPort(selector.current.getBoundingClientRect());
            if (isElementInView && inView === NOT_IN_VIEW_CLASS) {
                setView('');
            } else if(!isElementInView && inView === '') {
                setView(NOT_IN_VIEW_CLASS);
            }
        }
    }

    const isInViewPort = (rect: DOMRect) => {
        return (
            rect.top >= rect.height * -1 &&
            rect.bottom <= (window.innerHeight + rect.height || document.documentElement.clientHeight)
        )
    }

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll.bind(this));
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <div ref={selector}>
            <span>{props.skill}</span>
            <div className="outer-container"><div style={{width: `${props.level}%`}} className={`inner-container ${inView}`}></div></div>
        </div>
    )
}