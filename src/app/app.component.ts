import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm?: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectname: new FormControl(null, [
        Validators.required,
        this.nameIsForbidden.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.emailIsForbidden
      ),
      status: new FormControl('stable')
    });

    this.projectForm.statusChanges.subscribe((status) => console.log(status));
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  nameIsForbidden(control: FormControl): { [value: string]: boolean } | null {
    if (control.value === 'test') {
      return { nameIsForbidden: true };
    }
    return null;
  }

  emailIsForbidden(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({
            emailIsForbidden: true,
          });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
