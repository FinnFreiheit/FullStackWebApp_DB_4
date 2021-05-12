import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Data } from '../../../shared/data';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
 /**
  *  Komponete fuer das Formular welches beim Klick auf das Edit Icon aufgerufen wird
  *  */
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() data: Data;
  @Output() updateEvent = new EventEmitter<Data>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) 
  {
    this.form = this.fb.group(
      {
        idControl: ['', Validators.required],
        firstNameControl: ['', Validators.required],
        lastNameControl: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.form.patchValue({
      idControl: this.data?.SingerID,
      firstNameControl: this.data?.FirstName,
      lastNameControl: this.data?.LastName,
    });
  }

  /** aufrufen der backend.service.ts Methode Update, nachdem das Formular ausgefüllt wurde */
  onSubmit(): void {
    const values = this.form.value;
    this.data.SingerID = values.idControl;
    this.data.FirstName = values.firstNameControl;
    this.data.LastName = values.lastNameControl;
    this.updateEvent.emit(this.data);
  }

  /** Zurueck zur Read ansicht wenn Update abgebrochen wird */
  cancel(): void {
    this.location.back();
  }
}