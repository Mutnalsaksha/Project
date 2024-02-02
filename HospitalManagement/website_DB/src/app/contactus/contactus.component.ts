// src/app/contactus/contactus.component.ts
import { Component } from '@angular/core';
import { ContactUsService } from '../newservices/contactus.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent {
  formData: any = {
    date: new Date(),
    name: '',
    phoneNumber: '',
    email: '',
    service: '',
    message: '',
  };

  formSubmitted = false;
  errorMessage = '';
  successMessage = '';
  

  constructor(private contactUsService: ContactUsService) {}

  submitContactForm() {
    // Reset messages on each form submission
    this.errorMessage = '';
    this.successMessage = '';

    // Check form data for validation errors
    if (!this.isValidFormData()) {
      // Display a generic error message for invalid data
      this.errorMessage = 'Invalid input. Please check your form data.';
      this.formSubmitted = true;
      
      return;
    }

    // If form data is valid, proceed with form submission
    this.contactUsService.submitContactForm(this.formData).subscribe(
      (response) => {
        // Handle success
        console.log('Success:', response);
        this.successMessage = 'Form submitted successfully!';
        this.formSubmitted = true;
        this.resetForm();
        

         // Automatically clear the success message after 5 seconds (5000 milliseconds)
        setTimeout(() => {
          this.successMessage = '';
          this.formSubmitted = false;
        }, 5000);
      },
      (error) => {
        // Handle other errors
        console.error('Error submitting form:', error);
        this.errorMessage = 'Failed to submit the form. Please try again later.';
        this.formSubmitted = true;
      }
    );
  }

  resetForm() {
    // Reset the form data after successful submission
    this.formData = {
      date: new Date(),
      name: '',
      phoneNumber: '',
      email: '',
      service: '',
      message: '',
    };
  }

  isValidFormData(): boolean {
    // Add your validation logic here
    // For example, check if required fields are filled
    return (
      this.formData.date instanceof Date,
      this.formData.name.trim() !== '' &&
      this.formData.phoneNumber.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.service.trim() !== '' &&
      this.formData.message.trim() !== ''
    );
  }
    

  // isFormSubmitted(): boolean {
  //   // Use the service to check the form submission status
  //   return this.contactUsService.getFormStatus();
  // }

  
}
