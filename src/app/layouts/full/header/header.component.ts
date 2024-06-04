import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  user$ = this.authService.user$;
  showFiller = false;

  constructor(public dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {
    //-----> verificar que el usuario se encuentre loggeado
    this.user$.subscribe(user => {
      if(user){
        if(user){
          //console.log('User is logged in:', user.email);
          this.authService.currentUserSignal.set({
            email: user.email!,
            username: user.displayName!
          })
        }                
      }else{
        //console.log('User is logged out');
        this.authService.currentUserSignal.set(null);        
      }
    })
    //-------    
  }

  logout(): void{
    this.authService.logout();
  }
}