import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing-module';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './menus/header/header.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { PipeColumnComponent } from './pipeline/pipe-column/pipe-column.component';
import { ContactComponent } from './pipeline/contact/contact.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    HeaderComponent,
    PipelineComponent,
    PipeColumnComponent,
    ContactComponent,
    ContactsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
