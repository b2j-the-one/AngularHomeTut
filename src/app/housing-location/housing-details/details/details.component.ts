import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { HousingLocation } from 'src/app/interfaces/housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
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
      <section class="listing-apply">
      <h2 class="section-heading">Postulez maintenant pour vivre ici</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">Prénom</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Nom</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">
        <button type="submit" class="primary">Postulez maintenant</button>
      </form>
    </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  housingLocation: HousingLocation | undefined;
  //route: ActivatedRoute = inject(ActivatedRoute);
  //housingService = inject(HousingService);
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private housingService: HousingService) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);

    this.housingService.getHousingLocationById(housingLocationId).then(
      housingLocation => {
        this.housingLocation = housingLocation;
      });
  }

  submitApplication = () => {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
