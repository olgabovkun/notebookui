import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Note } from "src/app/model/note";
import { Notebook } from "src/app/model/notebook";
import { ShortNote } from "src/app/model/shortNote";
import { NotebookService } from "src/app/service/api/notebook.service";
import { ContentService } from "./content.service";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    
    @Input() notebook: Notebook | undefined;
    @Input() notebooks: Notebook[] = []
    @Input() note!: Note;

    constructor(private notebookService: NotebookService,
                private contentService: ContentService) { }

    ngOnInit(): void {
        this.notebook = this.notebooks.filter(notebook => notebook.notes.flatMap(note => note.id).includes(this.note?.id))[0];
        this.subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    openNote(note: ShortNote | Note): void {
        this.getNoteById(note.id);
    }

    public getNoteById(noteId: string): void {
        this.notebookService.getNoteById(noteId).subscribe({
            next: (response: Note) => {
                this.note = response;
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        })
    }

    private subscribe(): void {
        this.subscriptions = [
            this.contentService.openNote$.subscribe(({note, notebook}) => {
                this.openNote(note);
                this.notebook = notebook;
            })
        ];
    }

    private unsubscribe(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}