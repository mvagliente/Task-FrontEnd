import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { State } from '../shared/state';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  @Input() taskDetails = { Description: "", Stateid: 0, digitalInfoid: 0, State: null, DigitalInfo: null }
  imageUrl: string = "";
  fileToUpload: File = null;
  States: any = [];
  State: State;

  constructor
  (
    public restApi: RestApiService, 
    public router: Router
   ) { }

   ngOnInit() {
    this.loadStates()
  }

  loadStates() {
    return this.restApi.getStates().subscribe((data: {}) => {
      this.States = data;
    })
  }


  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  backClicked() {
    this.router.navigate(['/task-list'])
  }
  
  addTask() {
    this.restApi.postFile(this.fileToUpload).subscribe(
      data =>{
        console.log('done');
        this.taskDetails.DigitalInfo = data;  
        this.taskDetails.State = this.State;
        this.restApi.createTask(this.taskDetails).subscribe((data: {}) => {
          this.router.navigate(['/task-list'])
        })
      }
    );
  }

}
