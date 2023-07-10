import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  apiVersion: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getApiVersion().then((response: any) => {
      this.apiVersion = response.version;
    }).catch((error: any) => {
      console.error(error);
    });
  }

}
