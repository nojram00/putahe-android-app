import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  show(collection_name: string){
    const colRef = collection(this.firestore, collection_name)

    return collectionData(colRef, { idField: 'id' })
  }

  create(data : any, collection_name: string){
    const colRef = collection(this.firestore, collection_name)

    return addDoc(colRef, data)
  }

  update(data : any, collection_name: string, document_id: string){
    const docRef = doc(this.firestore, collection_name, document_id)

    return updateDoc(docRef, data)
  }

  find(collection_name: string, document_id: string){
    const docRef = doc(this.firestore, collection_name, document_id)

    return docRef
  }

  delete(collection_name: string, document_id: string){
    const docRef = doc(this.firestore, collection_name, document_id)

    return deleteDoc(docRef)
  }
}
