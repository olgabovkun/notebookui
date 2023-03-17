import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotebookService } from "src/app/service/api/notebook.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    noteId: any;

    constructor(private notebookService: NotebookService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.noteId = this.route.snapshot.paramMap.get('id');
    }
}