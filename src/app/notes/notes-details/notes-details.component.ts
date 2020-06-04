import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesServiceService } from '../notes-service.service';
import { Note } from 'src/app/models/note';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit {

  note: Note;
  createMode = false;
  editMode = false;
  cursorStyle = 'auto';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private noteService: NotesServiceService,
              private fb: FormBuilder) { }

  createForm = this.fb.group({
    category: ['', []],
    disease: ['', []],
    generalInfo: ['', []],
    clinicalFeatures: ['', []],
    workUp: ['', []],
    treatment: ['', []]
});

  ngOnInit() {
    let routeParam = this.route.snapshot.params['id'];

    if (+routeParam)
    {
      this.cursorStyle = 'not-allowed';
      this.onGetNote(routeParam);
    } else {
      this.createMode = true;
    }
}

  onDelete() {
    if(confirm("Are you sure you want to permanently delete this note?")) {
      //Ideally a modal but that is more effort right now
      //Probably want to get status of the delete
      //And redirect back to home
      this.noteService.deleteNote(this.note.id).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/notes']);
        }
      ), error => alert("There was a problem deleting this.")
    } else {
      //Do nothing
    }
  }

  onEdit() {
    this.cursorStyle = 'auto';
    this.editMode = true;

    this.createForm.controls['category'].enable();
    this.createForm.controls['disease'].enable();
    this.createForm.controls['generalInfo'].enable();
    this.createForm.controls['clinicalFeatures'].enable();
    this.createForm.controls['workUp'].enable();
    this.createForm.controls['treatment'].enable();
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

  onSubmit() {
    if (!this.createMode && !this.editMode) {
      return;
    } 

    let newNote: Note = {
      category: this.createForm.value.category, 
      disease: this.createForm.value.disease,
      generalInfo: this.createForm.value.generalInfo,
      clinicalFeatures: this.createForm.value.clinicalFeatures,
      workUp: this.createForm.value.workUp,
      treatment: this.createForm.value.treatment
    }

    if (this.editMode)
    {
      //run put/update method
      newNote.id = this.note.id;
      this.noteService.putNote(newNote).subscribe(
        data => {
          alert("Update Successful");
        }
      ), error => {
        console.log(error);
          alert("There was a problem updating this note.");
      };
    } else {
      //run the post method
      console.log(newNote);
      this.noteService.postNote(newNote).subscribe(
        data => {
          console.log(data);
          alert("Update Successful");
        }, error => {
          console.log(error);
          alert("There was a problem submitting the note.");
        }
      )
    }

    
  }

}
