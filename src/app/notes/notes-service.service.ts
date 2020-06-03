import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesServiceService {

  constructor(private http: HttpClient) { }


  baseURL = 'https://localhost:44328/api/notes';

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseURL);
  }

  getNote(id: number): Observable<Note>{
    return this.http.get<Note>(this.baseURL + '/' + id);
  }
  
}
