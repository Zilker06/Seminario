import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class indexGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

    async canActivate() {
      const intro = await this.storage.get("isIndexShowed")
      if (intro) {
        return true;
      }else{
        this.router.navigateByUrl('/index')  
        return false;
      }
    }

};
