import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validation_message = { 
    email: [
      {type: "required", message: "El email es obligatorio"},
      {type: "pattern", message: "Email invalido"}
    ],
    password: [
      {type: "required", message: "La contraseña es obligatoria"},
      {type: "pattern", message: "Minimo 8 caracteres, 1 mayuscula y 1 numero"}
    ]
  }

  errorMessage: any;

  constructor(private formBuilder: FormBuilder, private authServices: AuthenticateService, private navCtrl: NavController, private alertController: AlertController, private storage: Storage) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$")])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$")])),
    })
   }

  ngOnInit() {
  }

  loginUser(dataLogin: any){
    this.authServices.loginUser(dataLogin).then(res => {
      this.errorMessage = "";
      this.storage.set("isUserLoggedIn", true);
      this.navCtrl.navigateForward("/menu/home")
    }).catch(err => {
      this.errorMessage = err;
      this.presentAlert(this.errorMessage);
    })
  }

  async presentAlert(mss: string){
    const alert = await this.alertController.create({
      header: 'Ups hubo un error',
      message: mss,
      buttons: ['OK']
    });

    await alert.present();
  }

  register(){
    this.navCtrl.navigateBack("/register")
  }

}
