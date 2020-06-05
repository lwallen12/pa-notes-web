import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NotesServiceService } from './notes-service.service';



@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private noteService: NotesServiceService) { }

  queryString = '';

  notes: Note[] = [];

  ngOnInit() {
    this.noteService.getAllNotes().subscribe(
      data => {
        this.notes = data;
      }
    )
  }

  onDetail(i) {
    console.log(i);
  }

  onGetNotes() {
    
  }


}
