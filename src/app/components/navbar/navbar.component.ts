import {Component, OnInit} from '@angular/core';
import {NavbarItem} from "../../models/NavbarItem";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbarItems: NavbarItem[];

  constructor() {
    this.navbarItems = [
      {
        label: "Schedule",
        path: "/schedule",
        icon: "assets/images/schedule.png"
      },
      {
        label: "Leaderboard",
        path: "/leaderboard",
        icon: "assets/images/leaderboard.png"
      }
    ];
  }

  ngOnInit(): void {
  }

}
