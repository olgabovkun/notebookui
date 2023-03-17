import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Note } from "src/app/model/note";
import { Notebook } from "src/app/model/notebook";
import { ShortNote } from "src/app/model/shortNote";

@Injectable()
export class ContentService {
    private streams = {
        /** Events to open note */
        openNote: new Subject<{note: ShortNote | Note, notebook: Notebook}>(),
    };

    get openNote$() {
        return this.streams.openNote.asObservable();
    }

    openNote(note: ShortNote | Note, notebook: Notebook): void {
        this.streams.openNote.next({note, notebook});
    }
    
}