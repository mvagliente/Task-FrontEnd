import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Routing module for router service
import { AppRoutingModule } from './app-routing.module';

// Forms module
import { FormsModule } from '@angular/forms';

// Components
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskListComponent } from './task-list/task-list.component';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';


import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    TaskCreateComponent,
    TaskUpdateComponent,
    TaskListComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
