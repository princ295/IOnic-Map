import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../../../Models/User";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  constructor(private route: Router) { }
  public registration: FormGroup;

  ngOnInit() {
    this.registration = new FormGroup({
      phone: new FormControl(localStorage.getItem('phone'), Validators.required),
      password: new FormControl('', Validators.compose([Validators.minLength(8), Validators.required])),
   })
  }


  Continue(){
    console.log(this.registration.value)
    // call to registration api
    // then
    //call login api
    this.route.navigate(['home'])
  }
}
