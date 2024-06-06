import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, doc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { pstServices, pstServicesFirebase } from '../interfaces/pst-service.interface';

@Injectable({
  providedIn: 'root'
})
export class PstService {

  constructor(private firestore: Firestore) { }

  pstsCollection = collection(this.firestore, 'pst_services');

  getPsts(): Observable<pstServicesFirebase[]>{
    return collectionData(this.pstsCollection,{
      idField: 'id'
    }) as Observable<pstServicesFirebase[]>;
  }

  addPst(newPst: pstServices) : Observable<string>{   
     const promise = addDoc(this.pstsCollection, newPst).then(
      (response) => response.id
     );
     return from(promise);
  }

  removePst(pstId: string) : Observable<void>{
    const docRef = doc(this.firestore, 'pst_services/' + pstId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updatePst(pstId: string, dataToUpdate: {title: string,hostName: string, price: number, isPublished: boolean}) : Observable<void>{
    const docRef = doc(this.firestore, 'pst_services/' + pstId);
    const promise = setDoc(docRef,dataToUpdate);
    return from(promise);
  }
}