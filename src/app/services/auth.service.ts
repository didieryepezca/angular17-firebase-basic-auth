import { Injectable, signal } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from "@firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";

@Injectable (
    { providedIn: 'root' }    
)
export class AuthService {       
    user: UserInterface | null | undefined;
    userLogged = this.firebaseAuth.authState;
    currentUserSignal = signal<UserInterface| null | undefined>(undefined);
    
    constructor(private firebaseAuth: AngularFireAuth){        
    }      
    
    register(email:string, username: string, password: string): Observable<void> {
        const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(response => 
            {                
                return updateProfile(response.user!, {displayName: username});
            });            
        return from(promise);
    }        

    login(email: string, password: string): Observable<void>{
        const promise = this.firebaseAuth.signInWithEmailAndPassword(email,password)
        .then(userCredential =>{           
            if(userCredential.user){
              console.log("User Logged.");
              this.firebaseAuth.authState.subscribe(loggedUser => {
                    if(loggedUser){                     
                    const user: UserInterface = {
                            //id: userCredential.user.uid!,
                            username: loggedUser.displayName!,
                            email: loggedUser.email!,                                   
                        };
                        this.currentUserSignal.set(user)
                        //console.log(this.currentUserSignal());
                    }else{
                        //console.log('User is logged out');
                        this.currentUserSignal.set(null);        
                    }
                });
            }              
        });        
        return from(promise)
    }

    logout(): Observable<void>{
        const promise = this.firebaseAuth.signOut();
        return from(promise);
    }
}