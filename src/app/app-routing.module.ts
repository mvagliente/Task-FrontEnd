import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'task-list' },
  { path: 'create-task', component: TaskCreateComponent },
  { path: 'update-task/:id', component: TaskUpdateComponent },
  { path: 'task-list', component: TaskListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
