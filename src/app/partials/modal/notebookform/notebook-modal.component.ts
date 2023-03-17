import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, first, tap } from "rxjs/operators";
import { Notebook } from "src/app/model/notebook";
import { NotebookService } from "src/app/service/api/notebook.service";

@Component({
    selector: 'app-notebook-modal',
    templateUrl: './notebook-modal.component.html',
    styleUrls: ['./notebook-modal.component.css']
})
export class NotebookModalComponent {

    @Input() notebook: Notebook;
    @Input() title: string;
    @Input() createMode = false;

    constructor(public activeModal: NgbActiveModal, private notebookService: NotebookService) { }

    save() {
        if (this.createMode) {
            this.create();
        } else {
            this.update();
        }
        this.refresh();
    }

    create() {
        let notebook: Notebook = {
            id: null!,
            title: this.title,
            createdAt: null!,
            updatedAt: null!,
            notes: []
        }
        this.notebookService.createNotebooks(notebook).pipe(
            first(),
            tap(() => this.activeModal.close()),
            catchError(async (error) => alert(error))
        ).subscribe();
    }

    update() {
        this.notebook.title = this.title;
        this.notebookService.updateNotebooks(this.notebook).pipe(
            first(),
            tap(() => this.activeModal.close()),
            catchError(async (error) => alert(error))
        ).subscribe();
    }

    refresh(): void {
        window.location.reload();
    }

    public cancel(): void {
        this.activeModal.dismiss();
    }
}