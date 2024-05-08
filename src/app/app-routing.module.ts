import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TrainsComponent } from './pages/trains/trains.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MybookingsComponent } from './pages/mybookings/mybookings.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'trains', component: TrainsComponent },
  { path: 'mybookings', component: MybookingsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
