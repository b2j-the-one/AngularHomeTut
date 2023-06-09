import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../interfaces/housing-location';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Rechercher par ville" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Rechercher</button>
      <form>
    <section>
    <section class="results">
      <app-housing-location 
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  //housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService) {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults = (text: string) => {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(housingLocation => 
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()) ||
      housingLocation?.name.toLowerCase().includes(text.toLowerCase()) || 
      housingLocation?.state.toLowerCase().includes(text.toLowerCase())
      );
  }

}
