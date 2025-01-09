import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { passwordMatchValidator } from '../../shared/validators/password-match-validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @Input() active_view: string = '';

  userForm!: FormGroup;
  emailError: string | null = null;
  isFormSubmitted:boolean = false;

  // @ViewChild(FormControlDirective)
  // private formDir!: FormGroupDirective

  /**
   *
   */
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required,],
      },  
      { validators: passwordMatchValidator }
    );
  }

  onEmailInput(): void {
    const email = this.userForm.get('email')?.value;
    this.authService.checkEmailUnique(email).subscribe((isUnique) => {
      this.emailError = isUnique ? null : ' The email already exists.';
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.userForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} cannot be empty`;
    }
    return ''; // Return an empty string if there's no error
  }

  private getFieldLabel(fieldName: string): string {
    // Map form control names to user-friendly field names
    const fieldLabels: { [key: string]: string } = {
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      password: 'Password',
    };
    return fieldLabels[fieldName] || fieldName;
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.userForm.valid && !this.emailError) {
      //== catch email value ==
      const email = this.userForm.get('email')?.value;
      //== send email value as string to push it in auth service in emails array ==
      this.authService.addEmail(email);
      // == confirm that registration completed by this alert
      alert('Form submitted successfully!');
      // reset only form value 
      this.userForm.reset();
      this.isFormSubmitted = false;
    }else {
      alert('Invalid data.');
      this.isFormSubmitted = false;
    }
  }

}
