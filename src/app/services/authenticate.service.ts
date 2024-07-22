import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

  loginUser(credentials: any){
    return new Promise((accept, reject) => {
      if (
        credentials.email == "igabriel0624@gmail.com" &&
        credentials.password == 'Asdds1313'
      ){
          accept('Credenciales validas')
      } else {
          reject('Incorrecto, revisa tu correo o contraseña')
      }
    })
  }

  registerUser(registerData: any){
    registerData.password = btoa(registerData.password)
    return this.storage.set("user", registerData);
  }
}
