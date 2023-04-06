import { Component, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, first, from, tap } from "rxjs";
import { Note } from "src/app/model/note";
import { Notebook } from "src/app/model/notebook";
import { NotebookService } from "src/app/service/api/notebook.service";
import { ContentService } from "../../content/content.service";
import { DeleteConfirmModalComponent } from "../../modal/deleteconfirm/delete-confirm.component";
import { NotebookModalComponent } from "../../modal/notebookform/notebook-modal.component";

@Component({
    selector: 'app-edit-notebook-dropdown',
    templateUrl: './edit-notebook-dropdown.component.html',
    styleUrls: ['./edit-notebook-dropdown.component.css']
})
export class EditNotebookDropbownComponent {

    @Input() notebook: Notebook;

    constructor(private modalService: NgbModal,
        private notebookService: NotebookService,
        private contentService: ContentService) { }

    editNotebook() {
        const modalRef = this.modalService.open(NotebookModalComponent);
        modalRef.componentInstance.title = this.notebook.title;
        modalRef.componentInstance.notebook = this.notebook;
    }

    deleteNotebook() {

        const modalRef = this.modalService.open(DeleteConfirmModalComponent);
        modalRef.componentInstance.message = 'Deleting notebook'
        modalRef.componentInstance.description = 'Are you sure you want to delete this notebook? Your notebook and all of its notes will be permanently deleted.'

        from(modalRef.result).subscribe({
            next: (isConfirmed) => {
                if (isConfirmed) {
                    this.notebookService.deleteNotebooks(this.notebook.id).pipe(
                        first(),
                        tap(() => this.refresh()),
                        catchError(async (error) => alert(error))
                    ).subscribe();
                }
            }
        });

    }

    addNote() {
        let note = {} as Note;
        note.title = 'New note'
        this.notebookService.addNote(this.notebook.id, note).subscribe({
            next: (response: Note) => {
                this.contentService.openNote(response, this.notebook);
                // todo update sidebar list
            }
        });
    }

    refresh(): void {
        window.location.reload();
    }
}