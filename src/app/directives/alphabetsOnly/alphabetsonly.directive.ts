import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[Alphabetsonly]',
  standalone: true,
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:AlphabetsonlyDirective,
      multi:true    
    }
  ],
})
export class AlphabetsonlyDirective  implements Validator {
  
   private regex: RegExp = new RegExp(/^[a-zA-Z]+[a-zA-Z\s]*$/);
  validate(control: AbstractControl): ValidationErrors | null  {
  const value = control.value
     if(!this.regex.test(value)) {
       return {Alphabetsonly:true}
     } else {
      return null
     }

  }
  
  
 
}
