import * as React from 'react';

type Props = {
  skill: string;
  level: number;
  index: number;
}

export const SkillsDummy = (props: Props) => {
  return (
    <div key={props.index}>
      <span>{props.skill}</span>
      <div className="outer-container"><div style={{width: `${props.level}%`}} className="inner-container"></div></div>
    </div>
  )
}