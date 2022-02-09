import * as React from 'react';

import dataAccess from '../data/dataAccess';
import { SkillDummy } from './dummy/Skill';
import { SkillsProps, SkillsText } from '../types';
import { SkillsState } from '../types/states';
import '../style/skills.less';

export class Skills extends React.Component<SkillsProps, SkillsState> {
    constructor(props: SkillsProps) {
        super(props);
        this.state = {}
    }

    async componentWillMount() {
        if (!this.state.skills) {
            const skills = dataAccess.staticData<SkillsText>('skills');
            this.setState({skills: skills.list});
        }
    }

    render() {

        return (
            <div className="skill-container">
                {
                    !this.state.skills ?
                        <></> :
                        this.state.skills.map((skill, index) => {
                            return (<div key={`skill-${index}`}>
                                        <h3>{skill.title}</h3>
                                        {skill.skills.map((skill, i: number) => <SkillDummy key={`single-skill-${i}`} skill={skill.name} level={skill.value} />)}
                                    </div>
                                
                            )
                        })
                }
            </div>
        )
    }
}