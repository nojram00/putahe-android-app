import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, setDoc, updateDoc, query, where, docData } from '@angular/fire/firestore';
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

  createWithCustomId(data: any, collection_name: string, custom_id: string){
    const docRef = doc(this.firestore, `${collection_name}/${custom_id}`)

    return setDoc(docRef, data)
  }

  update(data : any, collection_name: string, document_id: string){
    const docRef = doc(this.firestore, collection_name, document_id)

    return updateDoc(docRef, data)
  }

  find(collection_name: string, document_id: string){
    const docRef = doc(this.firestore, collection_name, document_id)

    return docData(docRef, { idField: 'id' })
  }

  delete(collection_name: string, document_id: string){
    const docRef = doc(this.firestore, collection_name, document_id)

    return deleteDoc(docRef)
  }

  findByQuery(collection_name: string, queryObject: {
    property: string,
    operator: any,
    value: any
  }){
    const colRef = collection(this.firestore, collection_name)
    const q = query(colRef, where(queryObject.property, queryObject.operator, queryObject.value))

    return collectionData(q, { idField: 'id' })
  }
}