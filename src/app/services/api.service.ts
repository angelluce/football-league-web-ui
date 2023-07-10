import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiData} from "../models/ApiData";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders().append('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
  }

  getApiVersion(): Promise<ApiData> {
    return this._http.get<ApiData>(
      environment.api + 'api/version',
      {
        headers: this.headers
      }
    ).toPromise();
  }

  getApiToken(): Promise<ApiData> {
    return this._http.get<ApiData>(
      environment.api + 'api/v1/getAccessToken',
      {
        headers: this.headers
      }
    ).toPromise();
  }

  getAllMatches(token: string): Promise<any> {
    this.headers = new HttpHeaders().append('Authorization', 'Bearer ' +  token);
    return this._http.get<any>(
      environment.api + 'api/v1/getAllMatches',
      {
        headers: this.headers
      }
    ).toPromise();
  }
}
