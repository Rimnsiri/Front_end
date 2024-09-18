import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  routes = {
    home: '/home'
  };
  estActif = false;

  resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    // Vous pouvez ici appeler votre backend avec le token captchaResponse pour validation
  }

  toggle() {
    this.estActif = !this.estActif;
  }
}
