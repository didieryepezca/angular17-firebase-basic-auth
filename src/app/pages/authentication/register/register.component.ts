import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {  
  frmDisabled: boolean = false;
  formRegister: FormGroup;
  errorMessage: string | null = null;  

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    public authService: AuthService,    
  ) {

  this.formRegister = this.formBuilder.group({
      username: [{ value:'', disabled: this.frmDisabled}, [Validators.required, Validators.minLength(6)]],
      email: [{ value: '', disabled: this.frmDisabled}, [Validators.required]],
      password: [{ value: '', disabled: this.frmDisabled }, [Validators.required, Validators.minLength(6)]],    
    }); 
  }     

  register() {
    //console.log(this.formRegister.value);
    //const rawForm = this.formRegister.getRawValue()    
      this.authService    
      .register(this.formRegister.value.email!, this.formRegister.value.username!, this.formRegister.value.password!)
      .subscribe({
        next:()=>{
          this.router.navigate(['/pst-services']);
        },
        error: (err) => {
          this.errorMessage = err.code;
        }       
      });        
  }

  get username() { return this.formRegister.get('username') }
  get email() { return this.formRegister.get('email') }
  get password() { return this.formRegister.get('password') }  
}