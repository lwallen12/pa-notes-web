import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Note } from '../models/note';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {headers:{ 'Content-Type': 'application/json' }, 
  responseType:'text' as 'json' };


  baseURL = 'https://localhost:44328/api/notes';

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseURL);
  }

  getNote(id: number): Observable<Note>{
    return this.http.get<Note>(this.baseURL + '/' + id);
  }

  postNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.baseURL, note, this.httpOptions)
      .pipe(
        //Should probably handle this
      )
  }

  putNote(note: Note): Observable<Note> {
    return this.http.put<Note>(this.baseURL + '/' + note.id, note, this.httpOptions)
      .pipe(
      //should probably handle the error
      )
  }

  deleteNote(id: number) {
    return this.http.delete<Note>(this.baseURL + '/' + id)
      .pipe(
        //should handle error
      )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
}
