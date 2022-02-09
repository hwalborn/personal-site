import * as React from 'react';

import dataAccess from '../data/dataAccess';
import { SkillDummy } from './dummy/Skill';
import { SkillsProps, SkillsText } from '../types';
import { SkillsState } from '../types/states';

require('../style/skills.less');

export class Skills extends React.Component<SkillsProps, SkillsState> {
  constructor(props: SkillsProps) {
    super(props);
    this.state = {}
    // this.handleData = this.handleData.bind(this);
  }

  async componentWillMount() {
    if (!this.state.skills) {
    //   await dataAccess.googleSheets('skillz', this.handleData);
        const skills = dataAccess.staticData<SkillsText>('skills');
        this.setState({skills: skills.list});
    }
  }

//   handleData(data: DataAccess, resolve: (value?: unknown) => void) {
//     const skills = data.valueRanges.reduce((acc, vr) => {
//         return vr.values.reduce((result: any, data) => {
//             if (data.length >= 3) {
//                 const key = data[2];
//                 if (!result.hasOwnProperty(key)) {
//                     result[key] = []
//                 }
//                 result[key].push(data.slice(0, 2))
//                 return result;
//             }
//         }, acc)
//       }, {})
//     this.setState({skills})
//   }

  render() {
  const getSkills = () => {
    if (!this.state.skills) {
      return <></>;
    }
    const skills = this.state.skills.map((skill, index) => {
        return (<div key={`skill-${index}`}>
                    <h3>{skill.title}</h3>
                    {skill.skills.map((skill, i: number) => <SkillDummy key={`single-skill-${i}`} skill={skill.name} level={skill.value} />)}
                </div>
            
        )
    })
    return skills;
  }
    return (
      <div className={`skill-container`}>
        {getSkills()}
      </div>
    )
  }
}