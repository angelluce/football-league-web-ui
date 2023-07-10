/**
 * PLEASE DO NOT RENAME OR REMOVE ANY OF THE CODE BELOW.
 * YOU CAN ADD YOUR CODE TO THIS FILE TO EXTEND THE FEATURES TO USE THEM IN YOUR WORK.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    LeaderboardComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
