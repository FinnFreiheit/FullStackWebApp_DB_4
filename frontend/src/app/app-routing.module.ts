import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './singers/update/update.component';
import { CreateComponent } from './singers/create/create.component';
import { ReadComponent } from './singers/read/read.component';



const routes: Routes = [
  { path: 'create', component: CreateComponent},
  { path: 'update', component: UpdateComponent},
  { path: 'update/:id', component: UpdateComponent},
  { path: 'read', component: ReadComponent},
  { path: 'read/:id', component: ReadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
