import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  username: string = "";
  
  usernameError: string = "";
  passwordError: string = "";

  formBuilder = inject(FormBuilder);
  router = inject(Router);

  constructor(private loginService: LoginService){

  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  updateUsername(){
    this.usernameError = "";
    this.username = this.loginForm.get('username')?.value;
  }

  updatePassword(){
    this.passwordError = "";
  }

  checkLogin(){
    return this.loginService.login();
  }

  formValidated(): boolean{
    if(this.loginForm.get('username')?.invalid){
      this.usernameError = "Le nom d'utilisateur est requis.";
      return false;
    }

    if(this.loginForm.get('password')?.invalid){
      this.passwordError = "Le mot de passe est requis.";
      return false;
    }

    return true;
  }

  login(){
    if(!this.formValidated()) return;

    if(this.checkLogin()){
      this.router.navigate(['/home']);
    }else{
      alert("Échec de la connexion. Veuillez vérifier vos informations d'identification.");
    }
  }

  passwordForgot(){
    alert("En Cours");
  }
}
