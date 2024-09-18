import { Component, AfterViewInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import * as AOS from 'aos';

@Component({
  selector: 'app-locaux',
  templateUrl: './locaux.component.html',
  styleUrls: ['./locaux.component.scss']
})
export class LocauxComponent implements AfterViewInit {
  public routes = routes;

  ngAfterViewInit(): void {
    
    AOS.init({
      duration: 1000,  
      once: true       
    });
  }
}
