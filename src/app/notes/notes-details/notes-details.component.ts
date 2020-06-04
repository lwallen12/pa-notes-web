import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesServiceService } from '../notes-service.service';
import { Note } from 'src/app/models/note';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit {

  note: Note;
  createMode = false;
  // cursorStyle = {'cursor': 'auto'};
  cursorStyle = 'auto';

  constructor(private route: ActivatedRoute,
              private noteService: NotesServiceService,
              private fb: FormBuilder) { }

  ngOnInit() {

    let routeParam = this.route.snapshot.params['id'];

    if (+routeParam)
    {
      this.cursorStyle = 'pointer';
      this.onGetNote(routeParam);
    }
    else {
      this.createMode = true;
    }

  }

  onDelete() {
    if(confirm("Are you sure you want to permanently delete this note?")) {
      //Probably want to get status of the delete
      //And redirect back to home
    } else {
      //Do nothing
    }
  }

  onEdit() {
    this.cursorStyle = 'auto';
  }

  onGetNote(id: number) {
    this.noteService.getNote(id).subscribe(
      data => {
        this.note = data;
        console.log(data);
        this.createForm.patchValue({
          category: this.note.category,
          disease: this.note.disease,
          generalInfo: this.note.generalInfo,
          clinicalFeatures: this.note.clinicalFeatures,
          workUp: this.note.workUp,
          treatment: this.note.treatment

        });
        this.createForm.controls['category'].disable();
        this.createForm.controls['disease'].disable();
        this.createForm.controls['generalInfo'].disable();
        this.createForm.controls['clinicalFeatures'].disable();
        this.createForm.controls['workUp'].disable();
        this.createForm.controls['treatment'].disable();

      }
    )
  }

  createForm = this.fb.group({
      category: ['', []],
      disease: ['', []],
      generalInfo: ['', []],
      clinicalFeatures: ['', []],
      workUp: ['', []],
      treatment: ['', []]
  });

}
