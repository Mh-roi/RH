import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = "";
  password = "";

  constructor(private loginService: LoginService){

  }

  checkLogin(){
    return this.loginService.login();
  }

  login(){
    if(this.checkLogin()){
      alert("Vous êtes connecté ! Bienvenue " + this.username);
    }
  }

  passwordForgot(){
    alert("En Cours");
  }
}
