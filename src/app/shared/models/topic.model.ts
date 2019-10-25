import { Editor } from "./editor.model";

export class Topic {
    topicId: number;
    title: string;
    isActive: boolean;
    lessonId: number;
    categoryId: number;
    courseId: number;
    contents = new Array<Editor>();
}
