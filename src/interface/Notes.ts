export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface newNote {
    title: string;
    content: string;
}