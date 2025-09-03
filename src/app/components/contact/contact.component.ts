import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      try {
        const formData = {
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message
        };

        console.log('Sending email data:', formData);

        // Set up headers for Formspree
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });

        // Replace 'YOUR_FORMSPREE_FORM_ID' with your actual Formspree form ID
        // Go to formspree.io, create a form, and get the endpoint URL
        const formspreeUrl = 'https://formspree.io/f/xeokzagl';

        console.log('Submitting to Formspree:', formspreeUrl);

        const response: any = await this.http.post(formspreeUrl, formData, { headers }).toPromise();

        console.log('Formspree response:', response);

        this.contactForm.reset();
        alert('Poruka je poslata');
      } catch (error: any) {
        console.error('Contact Form Error:', error);

        let errorMessage = 'Failed to send email. Please try again.';

        if (error.status === 404) {
          errorMessage = 'Formspree endpoint not found. Please check your form configuration.';
        } else if (error.status === 429) {
          errorMessage = 'Too many requests. Please try again later.';
        } else if (error.status === 400) {
          errorMessage = error.error?.error || 'Invalid form data.';
        } else if (error.message) {
          errorMessage = error.message;
        }

        alert('Greška pri slanju poruke. Pokušajte ponovo.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${requiredLength} characters`;
    }
    return '';
  }
}
