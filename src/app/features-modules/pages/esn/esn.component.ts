import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-esn',
  templateUrl: './esn.component.html',
  styleUrls: ['./esn.component.scss']
})
export class EsnComponent implements OnInit {
  public routes = routes;
  selected = 'freelancers';
  getLink = "project";
  clinicsslides: any[] = [];
  @ViewChild('leftChevron') leftChevron!: ElementRef;
  @ViewChild('rightChevron') rightChevron!: ElementRef;
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
    this.loadDevelopers();
  }
  slideConfig2 = {
    slidesToShow: 3,
    SlidesToScroll: 1,
    asNavFor: '.say-about',
    dots: false,
    nav: false,
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
  };
  slideConfig = {
    slidesToShow: 1,
    SlidesToScroll: 1,
    asNavFor: '.client-img',
    dots: false,
    nav: false,
  };
  images = [
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-4.jpg',
      name: 'Fabien CROBIER',
      domain: "Chef d'entreprise",
      para: "Le service que vous m'avez fourni, qualité et prix au rendez-vous. Bravo pour ce travail remarquable.",
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-2.jpg',
      name: 'Julien MILLET',
      domain: 'Entrepreneur indépendant',
      para: "Votre service m'a inspiré confiance dès le départ. La rapidité et la précision de l'exécution ont confirmé mon intuition.",
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-3.jpg',
      name: 'Patricia BOUQUIER',
      domain: "Femme d'affaires",
      para: "J'ai apprécié la rigueur et le sérieux avec lesquels vous avez géré mon projet. Un travail impeccable et sans faille.",
    },
   
   
  ];
  ngAfterViewInit() {
    this.leftChevron.nativeElement.addEventListener('click', () => this.navigateLeft());
    this.rightChevron.nativeElement.addEventListener('click', () => this.navigateRight());
  }
  
  navigateLeft() {
    console.log('Navigate Left called');
    this.carousel.prev();
  }
  
  navigateRight() {
    console.log('Navigate Right called');
    this.carousel.next();
  }
  
  
  loadDevelopers(): void {
    this.http.get<any>('http://localhost:8000/api/devs').subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.clinicsslides = data.map(dev => ({
            img: `http://localhost:8000/storage/photos/${dev.photo}`,
            name: `${dev.name} ${dev.firstname}`,
            subscriptionPrice: dev.tjm,
            id: dev.id,
            niveau:dev.niveau,
            skills: dev.skills.slice(0, 3),

          }));
        } else {
          console.error('Data returned by API is not an array:', data);
        }
      },
      error => {
        console.error('Error fetching developers:', error);
      }
    );
  }
  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 3 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: true
  }

  

  tetimonialOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: { items: 1 },
      768: { items: 3 },
      1170: { items: 3 }
    },
    nav: true
  }

  testimonialslides = [
    { img: "assets/img/review/review-01.jpg", name: "Durso Raeen", position: "Project Lead", rating: "4.7" },
    { img: "assets/img/review/review-02.jpg", name: "Camelia Rennesa", position: "Project Lead", rating: "4.8" },
    { img: "assets/img/review/review-03.jpg", name: "Brayan", position: "Team Lead", rating: "5.0" },
    { img: "assets/img/review/review-02.jpg", name: "Davis Payerf", position: "Project Lead", rating: "3.2" }
  ];

  companyOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: { items: 1 },
      768: { items: 6 },
      1170: { items: 6 }
    },
    nav: true
  }

  companyslides = [
    { img: "assets/img/company-logo-01.svg" },
    { img: "assets/img/company-logo-02.svg" },
    { img: "assets/img/company-logo-03.svg" },
    { img: "assets/img/company-logo-04.svg" },
    { img: "assets/img/company-logo-05.svg" },
    { img: "assets/img/company-logo-06.svg" }
  ];

  search() {
    this.router.navigate(['/employer/developer']); 
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  aboutusslides = [
    { id: 1, img: "assets/img/review/review-01.jpg", name: "Fabien CROBIER", officer: "Chef d'entreprise", rating: "4.7", para: "Le service que vous m'avez fourni, qualité et prix au rendez-vous. Bravo pour ce travail remarquable." },
    { id: 2, img: "assets/img/review/review-02.jpg", name: "Julien MILLET", officer: "Entrepreneur indépendant", rating: "4.7", para: "Votre service m'a inspiré confiance dès le départ. La rapidité et la précision de l'exécution ont confirmé mon intuition." },
    { id: 3, img: "assets/img/review/review-03.jpg", name: "Patricia BOUQUIER", officer: "Femme d'affaires", rating: "4.7", para: "J'ai apprécié la rigueur et le sérieux avec lesquels vous avez géré mon projet. Un travail impeccable et sans faille." },
];
  toggleColors() {
    const btn = document.querySelector('.reg-btn');
    if (btn) {
      btn.classList.toggle('active');
    }
  }
  testimonialSlider: OwlOptions = {
    items: 5,
    margin: 30,
    dots: false,
    nav: true,
    smartSpeed: 2000,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    loop: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      991: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
  };
}
