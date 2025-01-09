import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private emails: string[] = ['test@example.com', 'user@domain.com'];

  checkEmailUnique(email: string): Observable<boolean> {
    const isUnique = !this.emails.includes(email);
    return of(isUnique);
  }

  addEmail(email: string): void {
    this.emails.push(email);
  }
  

}
