import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FormGroup, FormBuilder , Validators, NgForm } from "@angular/forms";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {

  public phoneForm: FormGroup;
  constructor(private route: Router, private formBuilder: FormBuilder) { 
    this.phoneForm = formBuilder.group({
      phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
    });
  }

  ngOnInit() {
  }
  UpdateNumber(formInfo){
    console.log(formInfo.value)
    localStorage.setItem('phone',formInfo.value.phone)
    this.route.navigate(['otp'])
  }
}
