import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
  computed, 
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  userLogged = this.authService.userLogged;
  userSig = this.authService.currentUserSignal;  
  
  showFiller = false;

  constructor(public dialog: MatDialog, public authService: AuthService) {
    // effect(()=>{
    //   this.user = this.authService.currentUserSignal()      
    // })    
  }

  ngOnInit(): void {      
    // -----> verificar que el usuario se encuentre loggeado: 1 Forma  
    this.userLogged.subscribe(userLogin => {
      if(userLogin){          
        const user: UserInterface = {
          //id: userCredential.user.uid!,
            username: userLogin.displayName!,
            email: userLogin.email!,                                   
          };
          this.userSig.set(user);
          //console.log(this.currentUserSignal());
        }else{
        //console.log('User is logged out');
        this.userSig.set(null);        
      }
    })    
    // -------      
  }

  loggedUser = computed(() => {
    return this.authService.currentUserSignal();
  });

  logout(): void{
    this.authService.logout();
  }
}