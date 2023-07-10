import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {LeaderBoardItem} from "../../models/LeaderBoardItem";
import {Standing} from "../../models/Standing";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  dataMatches: any[] = [];
  dataStandings: any[] = [];
  cols: any[] = [
    {field: 'team', header: 'Team Name'},
    {field: 'played', header: 'MP'},
    {field: 'goalsFor', header: 'GF'},
    {field: 'goalsAgainst', header: 'GA'},
    {field: 'points', header: 'Points'},
  ];

  constructor(private _apiSerivce: ApiService) {
    this._apiSerivce.getApiToken().then((data) => {
      this._apiSerivce.getAllMatches(data.access_token).then((response) => {
        this.dataMatches = response.matches;
        this.dataStandings = this.orderTeams();
      }).catch((error) => {
        console.error(error);
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  ngOnInit(): void {
  }

  objectValues(obj): Standing[] {
    return Object.keys(obj).map(key => obj[key]);
  }

  orderTeams(): LeaderBoardItem[] {
    const standings = {};
    this.dataMatches.forEach((match) => {
      if(match.matchPlayed === true) {
        const homeTeam = match.homeTeam;
        const awayTeam = match.awayTeam;

        if (!standings[homeTeam]) {
          standings[homeTeam] = {
            team: homeTeam,
            points: 0,
            played: 0,
            goalsFor: 0,
            goalsAgainst: 0
          };
        }

        if (!standings[awayTeam]) {
          standings[awayTeam] = {
            team: awayTeam,
            points: 0,
            played: 0,
            goalsFor: 0,
            goalsAgainst: 0
          };
        }

        standings[homeTeam].played++;
        standings[awayTeam].played++;

        standings[homeTeam].goalsFor += match.homeTeamScore;
        standings[homeTeam].goalsAgainst += match.awayTeamScore;
        standings[awayTeam].goalsFor += match.awayTeamScore;
        standings[awayTeam].goalsAgainst += match.homeTeamScore;

        if (match.homeTeamScore > match.awayTeamScore) {
          standings[homeTeam].points += 3;
        } else if (match.homeTeamScore < match.awayTeamScore) {
          standings[awayTeam].points += 3;
        } else {
          standings[homeTeam].points += 1;
          standings[awayTeam].points += 1;
        }
      }
    });

    return this.objectValues(standings).sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      } else {
        const headToHeadPointsA = this.dataMatches.reduce((sum, match) => {
          if (
            (match.homeTeam === a.team && match.awayTeam === b.team) ||
            (match.homeTeam === b.team && match.awayTeam === a.team)
          ) {
            if (match.homeTeamScore > match.awayTeamScore) {
              return sum + 3;
            } else if (match.homeTeamScore < match.awayTeamScore) {
              return sum;
            } else {
              return sum + 1;
            }
          }
          return sum;
        }, 0);

        if (headToHeadPointsA !== 0) {
          const headToHeadPointsB = this.dataMatches.reduce((sum, match) => {
            if (
              (match.homeTeam === b.team && match.awayTeam === a.team) ||
              (match.homeTeam === a.team && match.awayTeam === b.team)
            ) {
              if (match.homeTeamScore > match.awayTeamScore) {
                return sum + 3;
              } else if (match.homeTeamScore < match.awayTeamScore) {
                return sum;
              } else {
                return sum + 1;
              }
            }
            return sum;
          }, 0);

          if (headToHeadPointsA !== headToHeadPointsB) {
            return headToHeadPointsB - headToHeadPointsA;
          } else {
            const goalDiffA = a.goalsFor - a.goalsAgainst;
            const goalDiffB = b.goalsFor - b.goalsAgainst;
            if (goalDiffA !== goalDiffB) {
              return goalDiffB - goalDiffA;
            } else {
              return b.goalsFor - a.goalsFor;
            }
          }
        } else {
          const goalDiffA = a.goalsFor - a.goalsAgainst;
          const goalDiffB = b.goalsFor - b.goalsAgainst;
          if (goalDiffA !== goalDiffB) {
            return goalDiffB - goalDiffA;
          } else {
            return b.goalsFor - a.goalsFor;
          }
        }
      }
    });
  }
}
