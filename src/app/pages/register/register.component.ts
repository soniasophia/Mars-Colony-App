import { Component, OnInit } from '@angular/core';

import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';

import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';


const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? { 'Can\'t be this value': value } : null;
  };
};

const colonistAge = (tooYoung: number, tooOld: number): ValidatorFn => {
  if (tooYoung < 0 || tooOld < 0) {
    throw new Error('You can\'t be a negative age!');
  }
  return (control: AbstractControl) => {
    return control.value < 0 || control.value < tooYoung || control.value > tooOld ? { 'You\'re not the right age!' : colonistAge } : null;
  };
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistService]
})

export class RegisterComponent implements OnInit {

  jobs: Job[] = [];
  NO_JOB_SELECTED = 'none';
  colonist: Colonist;
  registerForm: FormGroup;

  constructor(private jobService: JobsService, private colonistService: ColonistService, private router: Router) { }

  ngOnInit() {
    this.jobService.getData()
    .subscribe((data) => {
      this.jobs = data.jobs;
    });

    this.registerForm = new FormGroup ({
      name: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, colonistAge(16, 40)]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
    });
  }

  register(e) {
    e.preventDefault();
    if (this.registerForm.invalid) {
      // if the form is invalid

    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;

      const colonist = new Colonist(name, age, job_id);
      this.colonistService.postData(colonist)
      .subscribe((newColonist) => {
        window.localStorage.setItem('colonist_id', newColonist.colonist.id);
        this.router.navigate(['encounters']);
      });
    }
  }
}
