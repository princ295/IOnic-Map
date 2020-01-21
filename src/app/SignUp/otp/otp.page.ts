import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder,Validators } from "@angular/forms";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  public otpform: FormGroup
  constructor(private route: Router, private formbuilder: FormBuilder) {
    this.otpform = formbuilder.group({
      otp: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.required])],
    })
   }
   phone;
  ngOnInit() {
    this.phone = localStorage.getItem('phone')
  }

  verifyOtp(info){
    console.log(info.value)
    this.route.navigate(['password'])
  }

  Verify(){
    this.route.navigate(['password'])
  }
}
