import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth) { }

  // Método de autenticación
  login(email: string, password: string){
    return new Promise((resolve, rejected)=>{
      this.AFauth.auth.signInWithEmailAndPassword(email, password)
      .then(user=>{
        resolve(user);
      })//fin then      
      .catch(err=>{
        rejected(err);
      });//fin catch

    }); //fin return

  }//fin login
}
