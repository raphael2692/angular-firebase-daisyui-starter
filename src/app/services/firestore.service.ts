import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, getDoc, addDoc, doc, updateDoc, DocumentReference, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: Firestore) { }
  private handleError(error: any): void {
    const { code, message } = error;
    console.error('Error:', { code, message });
    // Optionally, you can throw the error or transform it into a more user-friendly message
  }

  getDocumentRef(collectionName: string, documentId: string): DocumentReference {
    return doc(this.firestore, collectionName, documentId);
  }

  async addDocument(collectionName: string, data: any): Promise<DocumentReference | null> {
    try {
      return await addDoc(collection(this.firestore, collectionName), data);
    } catch (error) {
      this.handleError(error);
      return null; // Ensure a return value even when catching errors
    }
  }

  async updateDocument(collectionName: string, documentId: string, data: any): Promise<void> {
    try {
      const docRef = this.getDocumentRef(collectionName, documentId);
      await updateDoc(docRef, data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getDocumentSnapByField(collectionName: string, fieldName: string, value: any): Promise<QueryDocumentSnapshot<DocumentData, DocumentData> | null> {
    try {
      const q = query(collection(this.firestore, collectionName), where(fieldName, '==', value));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 1) {
        throw new Error('Query returned multiple documents');
      } else if (querySnapshot.size === 0) {
        return null;
      } else {
        return querySnapshot.docs[0];
      }

    } catch (error) {
      this.handleError(error);
      return null; // Ensure a return value even when catching errors
    }
  }

  async getDocumentSnapsByField(collectionName: string, fieldName: string, value: any): Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[] | []> {
    
    try {
      const q = query(collection(this.firestore, collectionName), where(fieldName, '==', value));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        return [];
      } else {
        return querySnapshot.docs.map(doc => doc);
      }
    } catch (error) {
      this.handleError(error);
      return []; // Ensure a return value even when catching errors
    }
  }

  async getDocumentSnap(collectionName: string, documentId: string): Promise<DocumentData | null> {
    try {
      const docRef = this.getDocumentRef(collectionName, documentId);
      const documentSnapshot = await getDoc(docRef);
      if (documentSnapshot.exists()) {
        return documentSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      this.handleError(error);
      return null; // Ensure a return value even when catching errors
    }
  }
}