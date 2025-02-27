import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material' 
import { NotesComponent } from './notes/notes.component';
import { NotesDetailsComponent } from './notes/notes-details/notes-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesCreateComponent } from './notes/notes-create/notes-create.component';
import { FilterPipe } from './notes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NotesDetailsComponent,
    NotesCreateComponent,
    FilterPipe
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
