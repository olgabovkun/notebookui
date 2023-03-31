import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs/internal/Observable";
import { Note } from "src/app/model/note";
import { Notebook } from "src/app/model/notebook";
import { ShortNote } from "src/app/model/shortNote";
import { NotebookService } from "src/app/service/api/notebook.service";
import { ContentService } from "../content/content.service";
import { NotebookModalComponent } from "../modal/notebookform/notebook-modal.component";


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    @ViewChild('sidebarIdentifier') sidebarIdentifier: ElementRef | undefined;
    @Input() noteId: any;
    notebooks: Notebook[] = [];

    notebooks$: Observable<Notebook[]> | undefined;
    note$: Observable<Note> | undefined;

    handlerMouseDown: boolean | undefined;
    showSideBar = true;
    showNoteIds: string[] = [];

    minSidebarWidth = 200;
    maxSidebarWidth = 600;
    sidebarWidth = 300;

    constructor(private contentService: ContentService,
        private notebookService: NotebookService,
        private modalService: NgbModal) {

    }

    ngOnInit(): void {
        this.notebooks$ = this.getNotebooks$();
        this.note$ = this.getNote$(this.noteId);

        this.getNotebooks();
    }

    public getNotebooks() {
        this.notebookService.getNotebooks().subscribe({
            next: (response: Notebook[]) => {
                this.notebooks = response;
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        })
    }

    toggleSideBar() {
        this.showSideBar = !this.showSideBar;
    }

    toggleNotesList(notebook: Notebook) {
        if (this.showNoteIds.includes(notebook.id)) {
            this.showNoteIds = this.showNoteIds.filter(item => item !== notebook.id);
        } else {
            this.showNoteIds.push(notebook.id);
        }
    }

    showNotes(notebook: Notebook): boolean {
        return this.showNoteIds.includes(notebook.id);
    }

    openNote(note: ShortNote, notebook: Notebook) {
        this.contentService.openNote(note, notebook);
    }

    openModal() {
        const modalRef = this.modalService.open(NotebookModalComponent);
        modalRef.componentInstance.createMode = true;
    }

    getNotebooks$(): Observable<Notebook[]> {
        return this.notebookService.getNotebooks();
    }

    getNote$(noteId: any): Observable<Note> {
        return this.notebookService.getNoteById(this.noteId);
    }

    start(e: any) {
        this.handlerMouseDown = true;
    }

    @HostListener('document:mousemove', ['$event']) onmousemove(e: any) {
        if (this.handlerMouseDown) {
            const mousePositionX = e.pageX;
            const sidebarCurrentWidth = this.sidebarIdentifier?.nativeElement.offsetWidth;

            let newWidth = this.sidebarWidth;

            if (mousePositionX === sidebarCurrentWidth) {
                return;
            } else if (mousePositionX > sidebarCurrentWidth) {
                const difference = mousePositionX - sidebarCurrentWidth;
                newWidth = this.sidebarWidth + difference;
            } else {
                const difference = sidebarCurrentWidth - mousePositionX;
                newWidth = this.sidebarWidth - difference;
            }

            if (newWidth > this.maxSidebarWidth) {
                newWidth = this.maxSidebarWidth;
            }
            if (newWidth < this.minSidebarWidth) {
                newWidth = this.minSidebarWidth;
            }

            this.sidebarWidth = newWidth;
        }
    }

    @HostListener('document:mouseup', ['$event']) onmouseup(e: any) {
        if (this.handlerMouseDown) {
            this.handlerMouseDown = false;
        }
    }

}