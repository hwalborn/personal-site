import React from 'react';

import dataAccess from '../data/dataAccess';
import { AboutText } from '../types';
import '../style/about.less';
import { AboutContainer } from './dummy/AboutContainer';

export const About = () => {
    const aboutInfo = dataAccess.staticData<AboutText>('about');
    if (!aboutInfo) {
        return <></>
    }
    const abouts = aboutInfo.list.map((a, i) => <AboutContainer key={`about-${i}`} title={a.title} text={a.text} />)
    return (
        <div id="about-container">
            {abouts}
        </div>
    )
}