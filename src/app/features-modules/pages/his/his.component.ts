import { Component, AfterViewInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import * as AOS from 'aos';
@Component({
  selector: 'app-his',
  templateUrl: './his.component.html',
  styleUrls: ['./his.component.scss']
})
export class HisComponent implements AfterViewInit {
  public routes = routes
  ngAfterViewInit(): void {
    
    AOS.init({
      duration: 1000,  
      once: true       
    });
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
