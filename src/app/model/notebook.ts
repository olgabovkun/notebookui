import { ShortNote } from "./shortNote";

export interface Notebook {
    id: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    notes: ShortNote[];
}