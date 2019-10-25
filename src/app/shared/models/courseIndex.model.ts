export class CourseIndex {
    courseId: number;
    name: string;
    description: string;
    slug:string;
    lessons = new Array<LessonIndex>();
}

export class LessonIndex {
    lessonId: number;
    name: string;
    slug: string;
    topics = new Array<TopicIndex>();
}

export class TopicIndex {
    topicId: number;
    name: string;
    slug: string;
}