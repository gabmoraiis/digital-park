import { Component } from '@angular/core';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    NavBarComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
