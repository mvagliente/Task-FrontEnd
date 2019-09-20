import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../shared/task';
import { State } from '../shared/state';
import { DigitalInfo } from '../shared/digital-info';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {


    // Define API
    apiURL = 'http://localhost:1804/api';

  constructor(private http: HttpClient) { }


// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}  

// HttpClient API get() method => Fetch Task list
getTasks(): Observable<Task[]> {
  return this.http.get<Task[]>(this.apiURL + '/Task')
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API get() method => Fetch Task list
getStates(): Observable<State[]> {
  return this.http.get<State[]>(this.apiURL + '/Task/GetStates')
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API get() method => Fetch Task
getTask(id): Observable<Task> {
  return this.http.get<Task>(this.apiURL + '/Task/' + id)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API post() method => Create Task
createTask(task): Observable<Task> {
  return this.http.post<Task>(this.apiURL + '/Task', JSON.stringify(task), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API put() method => Update Task
updateTask(id, task): Observable<Task> {
  return this.http.put<Task>(this.apiURL + '/Task/' + id, JSON.stringify(task), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API delete() method => Delete Task
deleteTask(id){
  return this.http.delete<Task>(this.apiURL + '/Task/' + id, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

postFile(fileToUpload: File): Observable<DigitalInfo> {
  const formData: FormData = new FormData();
  formData.append('UploadImage', fileToUpload, fileToUpload.name);
  return this.http.post<DigitalInfo>(this.apiURL + '/Task/UploadImage', formData)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// Error handling 
handleError(error) {
   let errorMessage = '';
   if(error.error instanceof ErrorEvent) {
     // Get client-side error
     errorMessage = error.error.message;
   } else {
     // Get server-side error
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   window.alert(errorMessage);
   return throwError(errorMessage);
}


}
