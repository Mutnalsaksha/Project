// src/app/contactus.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private serverUrl = 'http://localhost:3000/contactus/submit'; // Replace with your server API endpoint
  private formSubmitted: boolean = false;

  constructor(private http: HttpClient) {}

  submitForm(): Observable<any> {
    // Add logic for form submission if needed

    // For now, just mark the form as submitted
    this.formSubmitted = true;

    // Reset the formSubmitted status after a delay (2 seconds in this example)
    setTimeout(() => {
      this.formSubmitted = false;
    }, 2000); 

    return of({ success: true });
  }

  getFormStatus(): boolean {
    return this.formSubmitted;
  }


  submitContactForm(formData: any): Observable<any> {
    // return this.http.post<any>(this.serverUrl, formData);
    return this.http.post('http://localhost:3000/contactus/submit', formData)
    .pipe(
      tap((response: any) => {
        console.log('Response from Server:', response);
      }),
      catchError((error: any) => {
        console.error('Error from Server:', error);
        throw error; // Rethrow the error for further handling
      })
    );
  }
}
