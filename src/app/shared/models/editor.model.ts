
export class Editor {
    htmlContent = new ContentModel();
    image = new ImageModel();
    code = new CodeModel();
}

export class CodeModel {
    key: number;
    code: string;
    language: string;
}

export class ContentModel {
    key: number;
    htmlContent: string;
}

export class ImageModel {
    key: number;
    image: any;
    imageUrl: string;
    name: string;
}