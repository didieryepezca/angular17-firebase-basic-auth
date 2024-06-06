import { Component, OnInit, AfterViewInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  user = this.authService.userLogged;

  constructor(public navService: NavService, public authService: AuthService) {}

  ngOnInit(): void {    
      console.log("HEADER")
      console.log(this.user)
    }

  AfterViewInit(): void{
    


  }
}
