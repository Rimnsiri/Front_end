import { Component ,AfterViewInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import * as AOS from 'aos';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent  {
  public routes = routes;
  isOpen1 = false;
  isOpen2 = false; 
  isOpen3 = false;
  isOpen4 = false;
  isOpen5 = false;
  isOpen6 = false;
  toggleAccordion(accordion: number): void {
    if (accordion === 1) {
      this.isOpen1 = !this.isOpen1; 
    } else if (accordion === 2) {
      this.isOpen2 = !this.isOpen2;
    } else if (accordion === 3) {
      this.isOpen3 = !this.isOpen3;
    }else if (accordion === 4) {
      this.isOpen4 = !this.isOpen4; 
    }else if (accordion === 5) {
      this.isOpen5 = !this.isOpen5;
    }else if (accordion === 6) {
      this.isOpen6 = !this.isOpen6;
    }
  }
 
    ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
       once: true, 
   });
 }
 scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
 
}
