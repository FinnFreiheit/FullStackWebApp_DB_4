import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Data} from '../../shared/data';
import {BackendService} from '../../shared/backend.service';

/* Creat Komponente, erzeugt ein Formular und nutz die creat API vom Backend */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  data: Data;

  constructor(
    private cs: BackendService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        firstNameControl: ['', Validators.required],
        lastNameControl: ['', Validators.required],
      }
    );
    this.data = { SingerID: 0, FirstName: '', LastName: ''};
  }

  ngOnInit(): void {
  }

  /* Nach dem absenden des Creat-Formulars werden die einträge in Data gespeichert und die creat Methode vom backend.service.ts aufgerufen */

  onSubmit(): void {
    console.warn(this.form.value);
    const values = this.form.value;
    this.data.FirstName = values.firstNameControl;
    this.data.LastName = values.lastNameControl;
    console.log(this.data);
    this.cs.create(this.data);
    this.router.navigate(['/read']);
  }

  /* Wird die Eingabe abgebrochen, so wird die read Komponente aufgerufen */
  cancel(): void {
    this.router.navigate(['/read']);
  }
}