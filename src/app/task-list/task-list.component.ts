import { AfterViewInit, Component, OnDestroy , OnInit , ViewChild } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Task } from '../shared/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements  OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  Tasks: any = [];
  dtTrigger: Subject<Task> = new Subject<Task>();

  constructor
  (
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loadTasks()
  }

  ngAfterViewInit(): void {this.dtTrigger.next();}

  loadTasks() {
    return this.restApi.getTasks().subscribe((data: {}) => {
      this.Tasks = data;
    })
  }

  deleteTask(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteTask(id).subscribe(data => {
        this.loadTasks()
      })
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  

  
}
