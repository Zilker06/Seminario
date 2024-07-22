import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavComponentWithProps, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup; 
  validation_message = { 
    email: [
      {type: "required", message: "El email es obligatorio"},
      {type: "pattern", message: "Email invalido"}
    ],
    password: [
      {type: "required", message: "La contraseña es obligatoria"},
      {type: "pattern", message: "Minimo 8 caracteres, 1 mayuscula y 1 numero"}
    ],
    paswword_confirmation:[
      {type: "required", message: "La confirmacion es obligatoria"},
      {type: "pattern", message: "Minimo 8 caracteres, 1 mayuscula y 1 numero"},
      {type: "passwordNotMatch", message: "Las contraseñas no coinciden"}
    ],
    name: [
      {type: "required", message: "Nombre Obligatorio"}
    ]}
  

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private storage: Storage, private authService: AuthenticateService) { 
    
    this.registerForm = this.formBuilder.group({
    /*Email, Password Password_confimation, Name, LastName*/  
    email: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$")])),
    password: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$")])),
    password_confirmation: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$")])),
    name: new FormControl("", Validators.compose([Validators.required,])),
    lastName: new FormControl("", Validators.compose([])),
    }, {validator : this.passwordV});
  }

  ngOnInit() {
  }
  
  passwordV(formGroup: FormGroup){
    const password = formGroup.get('password')?.value;
    const password_confirmation = formGroup.get('password_confirmation')?.value;
    return password == password_confirmation ? null : {passwordNotMatch: true};
  }

  login(){
    this.navCtrl.navigateForward("/login")
  }

  back2Login(){
    this.navCtrl.navigateForward("/login")
  }

  register(registerData: any){
    console.log(registerData);
    this.storage.set("user", registerData);
    this.authService.registerUser(registerData).then(res => {
      this.navCtrl.navigateBack("/login");
    });
  }
}
