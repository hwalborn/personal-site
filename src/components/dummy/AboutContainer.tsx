import React from 'react';
import { AboutContainerProps } from '../../types';

export const AboutContainer = ({ title, text }: AboutContainerProps) => {
    return (
        <div className="single-about">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}