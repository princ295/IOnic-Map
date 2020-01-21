import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  constructor(private route: Router) { }
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  ngOnInit() {
  }

  Continue(){
    console.log('function is running.....................')
    this.route.navigate(['phone'])
  }
}
