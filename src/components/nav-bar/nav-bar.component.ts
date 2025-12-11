import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent implements OnInit{
  isToggle: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  toggleSidenav(): void {
    if (this.isToggle == true) {
      this.isToggle = !this.isToggle;
    }
    else{
      this.isToggle = true;
    }
  }
}




