import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "src/app/model/note";
import { environment } from "src/environments/environment";
import { Notebook } from "../../model/notebook";


@Injectable({
    providedIn: 'root'
})
export class NotebookService {

    private apiServerUrl = `${environment.apiBaseUrl}/api/notebook`;

    constructor(protected http: HttpClient) { }

    public getNotebooks(): Observable<Notebook[]> {
        return this.http.get<Notebook[]>(`${this.apiServerUrl}`);
    }

    public createNotebooks(notebook: Notebook): Observable<Notebook> {
        return this.http.post<Notebook>(`${this.apiServerUrl}/create`, notebook);
    }

    public updateNotebooks(notebook: Notebook): Observable<Notebook> {
        return this.http.put<Notebook>(`${this.apiServerUrl}/update`, notebook);
    }

    public deleteNotebooks(notebookId: string): Observable<Notebook> {
        return this.http.delete<Notebook>(`${this.apiServerUrl}/${notebookId}`);
    }

    public getNoteById(noteId: string): Observable<Note> {
        return this.http.get<Note>(`${this.apiServerUrl}/note/${noteId}`);
    }

}