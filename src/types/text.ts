import { SkillsType } from "./global"

export type Homepage = {
    Summary: string;
}

export type Skills = {
    list: Array<SkillsType>;
}

export type About = {
    list: Array<{title: string, text: string}>;
}