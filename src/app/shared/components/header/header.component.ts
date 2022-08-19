import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Iauth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayBasic: boolean = false;
  items: MenuItem[] = [];   
  data!: Iauth

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initMenuItems();   
    
  } 

  private initMenuItems() {
    this.items = [
      {
        label: 'My acount',
        icon: 'pi pi-fw pi-user',
        style: { 'margin-left': 'auto' },
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
            command: () => {
              this.showDialog();
            },
          },
          {
            label: 'Log out',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              this.logOut();
            },
          },
        ],
      },
    ];
  }

  showDialog(){
    this.displayBasic = true
    this.data = this.userLogued    
  }

  closeModal(_: boolean) {
    this.displayBasic = false;
  }

  get userLogued(){
    return this.authService.getUserLogued;
  }  

  logOut() {
    this.authService.logOut();
  }

}
