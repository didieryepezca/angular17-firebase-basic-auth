import { Injectable, signal } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from "@firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";

@Injectable (
    { providedIn: 'root' }    
)
export class AuthService {    
    user$ = this.firebaseAuth.authState;
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
        .then(()=>{})
        return from(promise)
    }

    logout(): Observable<void>{
        const promise = this.firebaseAuth.signOut();
        return from(promise);
    }
}