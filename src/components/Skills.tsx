import * as React from 'react';

import dataAccess from '../data/dataAccess';
import { SkillsDummy } from './dummy/Skills';
import { DataAccess } from '../classes/dataAccess';

require('../style/skills.less');

type Props = {
  test?: string;
}

type State = {
  skills?: SkillsType;
}

type SkillsType = {
    type: Array<Array<string>>;
} & any

export class Skills extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
    this.handleData = this.handleData.bind(this);
  }

  async componentWillMount() {
    if (!this.state.skills) {
      await dataAccess.googleSheets('skillz', this.handleData);
    }
  }

  handleData(data: DataAccess, resolve: (value?: unknown) => void) {
    const skills = data.valueRanges.reduce((acc, vr) => {
        return vr.values.reduce((result: any, data) => {
            if (data.length >= 3) {
                const key = data[2];
                if (!result.hasOwnProperty(key)) {
                    result[key] = []
                }
                result[key].push(data.slice(0, 2))
                return result;
            }
        }, acc)
      }, {})
    this.setState({skills})
  }

  render() {
  const getSkills = () => {
    if (!this.state.skills) {
      return <></>;
    }
    const skillCategories = Object.keys(this.state.skills);
    const skills = skillCategories.map((category, index) => {
        const catData: Array<Array<string>> = this.state.skills[category];
        return (
            <div key={index}>
                <h3>{category}</h3>
                {catData.map((skill, i: number) => <SkillsDummy {...{skill: skill[0], level: skill[1], index: i}} />)}
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