import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  frmDisabled: boolean = false;
  formLogin: FormGroup;
  errorMessage: string | null = null;  

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    public authService: AuthService, 
  ) {
    this.formLogin = this.formBuilder.group({      
      email: [{ value: '', disabled: this.frmDisabled}, [Validators.required]],
      password: [{ value: '', disabled: this.frmDisabled }, [Validators.required, Validators.minLength(6)]],    
    }); 
  }

  login() {
    //console.log(this.formLogin.value);
    //const rawForm = this.formRegister.getRawValue()    
      this.authService    
      .login(this.formLogin.value.email!, this.formLogin.value.password!)      
      .subscribe({
        next:()=>{
          this.router.navigate(['/pst-services']);
        },
        error: (err) => {
          //console.log(err.message)
          this.errorMessage = 'Ha ocurrido un error: '+ err.message;
        }       
      });        
  }

  get email() { return this.formLogin.get('email') }
  get password() { return this.formLogin.get('password') }  
}
