import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './housing-location/housing-details/details/details.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: "Page d'accueil"
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Détails de la maison'
    }
];

export default routeConfig;