import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  dataMatches: any[] = [];
  cols: any[] = [
    {field: 'matchDate', header: 'Match Date'},
    {field: 'stadium', header: 'Stadium'},
    {field: 'homeTeam', header: 'Home Team'},
    {field: 'result', header: ''},
    {field: 'awayTeam', header: 'Away Team'},
  ];

  constructor(private _apiSerivce: ApiService) {
    this._apiSerivce.getApiToken().then((data) => {
      this._apiSerivce.getAllMatches(data.access_token).then((response) => {
        this.dataMatches = response.matches;
      }).catch((error) => {
        console.error(error);
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  ngOnInit(): void {
  }

}
