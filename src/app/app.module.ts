import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { EncounterComponent } from './pages/encounter/encounter.component';
import { ReportComponent } from './pages/report/report.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'encounter', component: EncounterComponent },
  { path: 'report', component: ReportComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    EncounterComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
