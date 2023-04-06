import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-delete-confirm-modal',
    templateUrl: './delete-confirm.component.html',
    styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmModalComponent {

    @Input() message = 'Deleting';
    @Input() description = 'Are you sure you want to delete this item?';

    constructor(public activeModal: NgbActiveModal) { }

    ok(): void {
        this.activeModal.close(true);
    }

    cancel(): void {
        this.activeModal.close(false);
    }
}