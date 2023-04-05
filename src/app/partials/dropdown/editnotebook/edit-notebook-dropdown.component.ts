import { Component, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, first, tap } from "rxjs";
import { Notebook } from "src/app/model/notebook";
import { NotebookService } from "src/app/service/api/notebook.service";
import { NotebookModalComponent } from "../../modal/notebookform/notebook-modal.component";

@Component({
    selector: 'app-edit-notebook-dropdown',
    templateUrl: './edit-notebook-dropdown.component.html',
    styleUrls: ['./edit-notebook-dropdown.component.css']
})
export class EditNotebookDropbownComponent {

    @Input() notebook: Notebook;

    constructor(private modalService: NgbModal,
        private notebookService: NotebookService) { }

    editNotebook() {
        const modalRef = this.modalService.open(NotebookModalComponent);
        modalRef.componentInstance.title = this.notebook.title;
        modalRef.componentInstance.notebook = this.notebook;
    }

    deleteNotebook() {
        this.notebookService.deleteNotebooks(this.notebook.id).pipe(
            first(),
            tap(() => this.refresh()),
            catchError(async (error) => alert(error))
        ).subscribe();
        
    }

    addNote() {
        // todo
    }

    refresh(): void {
        window.location.reload();
    }
}