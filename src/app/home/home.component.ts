import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
goToDropin() {
    let link = ['/dropin'];
    this.router.navigate(link);
  }
  goToCardPicker() {
    let link = ['/cardpicker'];
    this.router.navigate(link);
  }
}
