import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesServiceService } from '../notes-service.service';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit {

  note: Note;

  constructor(private route: ActivatedRoute,
              private noteService: NotesServiceService) { }

  ngOnInit() {
    this.onGetNote(this.route.snapshot.params['id']);
  }

  onGetNote(id: number) {
    this.noteService.getNote(id).subscribe(
      data => {
        this.note = data;
        console.log(data);
      }
    )
  }

}
