import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { PhoneValidator } from "../../Validators/phone";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public initState: boolean =  false;

  constructor(
    public formBuilder: FormBuilder,
  ) { 
    this.loginForm = formBuilder.group({
      phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }

  ngOnInit() {
  }

  loginUser(){
    
  }

  goToSignup(){}

  goToResetPassword(){}
}
