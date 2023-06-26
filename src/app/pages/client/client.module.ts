import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ClientComponent } from './client.component';
import { TableCardsComponent } from './table-cards/table-cards.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MesasComponent } from './mesas/mesas.component';



export const routes: Routes = [
  { path: '', component: ClientComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ClientComponent,
    TableCardsComponent,
    MesasComponent
],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxChartsModule
  ]
})
export class ClientModule { }