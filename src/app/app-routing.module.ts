import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';

const routes: Routes = [
  {path:'',component:AdminDashboardComponent},
  {path:'edit',component:EditDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
