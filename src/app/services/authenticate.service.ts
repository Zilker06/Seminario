import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      console.log(this.storage.get("user"))
      this.storage.get("user").then(storedUser => {
        if (storedUser) {
          if (
            credentials.email === storedUser.email &&
            btoa(credentials.password) === storedUser.password
          ) {
            accept('Credenciales válidas');
          } else {
            reject('Correo o contraseña incorrectos');
          }
        } else {
          reject('Usuario no registrado');
        }
      }).catch(err => {
        reject('Error al acceder al almacenamiento');
      });
    });
  }

  registerUser(registerData: any) {
    registerData.password = btoa(registerData.password)
    return this.storage.set("user", registerData);
  }
}
