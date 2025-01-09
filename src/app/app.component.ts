import { Component, inject  } from '@angular/core';
import { SignupComponent } from "./auth/signup/signup.component";
import {BreakpointObserver , BreakpointState} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Nano_Form_task';
  view: string = '';
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
    /**
     *
     */
  constructor() {
    this.breakpointObserver.observe([
      '(max-width: 375px)',
      '(max-width: 1440px)'
    ]).subscribe((result: BreakpointState)=>{
      if(result.breakpoints['(max-width: 375px)']){
        this.view = "mobile"
      }
      else if(result.breakpoints['(max-width: 1440px)']){
        this.view = "desktop"
      }
    })
  }
}
