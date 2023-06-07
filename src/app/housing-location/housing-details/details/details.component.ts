import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { HousingLocation } from 'src/app/interfaces/housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <img  class="listing-photo" [src]="housingLocation?.photo" alt="Photo extérieure de {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">À propos de la location de ce logement</h2>
        <ul>
          <li>Nombre de pièces : {{housingLocation?.availableUnits}}</li>
          <li>Ce logement dispose-t-il du wifi ? {{housingLocation?.wifi}}</li>
          <li>Ce logement dispose-t-il d'une laverie ? {{housingLocation?.laundry}}</li>
      </ul>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  housingLocation: HousingLocation | undefined;
  //route: ActivatedRoute = inject(ActivatedRoute);
  //housingService = inject(HousingService);

  constructor(private route: ActivatedRoute, private housingService: HousingService) {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

}
