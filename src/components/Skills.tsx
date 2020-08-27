import * as React from 'react';

import dataAccess from '../data/dataAccess';
import { SkillsDummy } from './dummy/Skills';

require('../style/skills.less');

type Props = {
  test?: string 
}

type State = {
  skills?: any;
  loading: boolean;
}

export class Skills extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  async componentWillMount() {
    if (!!this.state) {
      const skills = await dataAccess.googleSheets('skillz');
      this.setState({skills});
    }
  }

  componentDidUpdate() {
    if (this.state.skills && this.state.loading) {
      setTimeout(() => {
        this.setState({loading: false});
      })
    }
  }

  render() {
  const getSkills = () => {
    if (!this.state.skills) {
      return <></>;
    }
    const skillLabels = Object.keys(this.state.skills);
    const skills =  skillLabels.map((skill, index) => {
      const level = parseInt(this.state.skills[skill][0]);
      return <SkillsDummy {...{skill, level, index}} />
    });
    return skills;
  }
    return (
      <div className={`${this.state.loading ? 'loading' : ''} skill-container`}>
        {getSkills()}
      </div>
    )
  }
}