import { Component,AfterViewInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import * as AOS from 'aos';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements AfterViewInit {
  public routes = routes;
  
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
