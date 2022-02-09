import { SkillsType } from "./global"

export type AppState = {
    summary: string;
    isDragging: boolean;
}

export type SkillsState = {
    skills?: Array<SkillsType>;
}