export type DragNavProps = {
    className: string;
    onDragBegin: () => void;
    onDragEnd: () => void;
}

export type DropNavProps = {
    navigate: () => void;
    className: string;
    navigateTo: string;
}

export type SkillProps = {
    skill: string;
    level: number;
}

export type SkillsProps = {
    test?: string;
}