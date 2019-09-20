import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  Task: any = {};
  
  imageUrl: string = "";
  fileToUpload: File = null;
  States: any = [];

  constructor
  (
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}
  
  ngOnInit() { 
    this.LoadTask();
    this.loadStates();
  }

  LoadTask() {
    return this.restApi.getTask(this.id).subscribe((data: {}) => {
      this.Task = data;
    })
  }


  loadStates() {
    return this.restApi.getStates().subscribe((data: {}) => {
      this.States = data;
    })
  }

  backClicked() {
    this.router.navigate(['/task-list'])
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

    // Update Task data
    updateTask() {
      if (this.fileToUpload != null)
      {
      this.restApi.postFile(this.fileToUpload).subscribe(
        data =>{
          console.log('done');
          this.Task.DigitalInfo = data;  
          this.restApi.updateTask(this.id, this.Task).subscribe(data => {
            this.router.navigate(['/task-list'])
          })
        }
      );
      }
      else
      {
        this.restApi.updateTask(this.id, this.Task).subscribe(data => {
          this.router.navigate(['/task-list'])
        })
      }
    }

}
