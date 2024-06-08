import { Component, OnInit, signal, computed} from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { FilerUserRolesMenuEnum } from 'src/app/interfaces/enums/filter.enum';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  allNavItems = navItems;
  userNavItems: NavItem[] = [];
  
  userLogged = this.authService.userLogged;
  userSig = this.authService.currentUserSignal;  

  constructor(public navService: NavService, public authService: AuthService) {}

  ngOnInit(): void {     
    // -----> verificar que el usuario se encuentre loggeado: 1 Forma
    // if(this.currentUserSignal() == null || 
    //     this.currentUserSignal() === undefined){
          //console.log("Subscribing logged used...")
          this.userLogged.subscribe(userLogin => {
            if(userLogin){          
              const user: UserInterface = {
                //id: userCredential.user.uid!,
                  username: userLogin.displayName!,
                  email: userLogin.email!,                                   
                };
                this.userSig.set(user);
              }else{
              //console.log('User is logged out');
              this.userSig.set(null);        
            }
          })
    // }   
    // -------  
  }

  visibleUserMenu = computed(() => {
   this.userNavItems = navItems.filter(item => {
// Verificar si el correo electrónico del usuario es igual a "didieryepezca@gmail.com"
      if (this.authService.currentUserSignal()?.email === "alvaro@araujo.com") {
        // Si el correo electrónico no coincide, mantener todos los elementos del array        
        return true;
      } else {
        // Si el correo electrónico coincide, filtrar por el valor del 'displayName'
        return item.displayName === "Inicio" || item.displayName === "Servicios";        
      }
    });
    return this.userNavItems;
  }); 
}