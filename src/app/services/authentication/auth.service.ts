import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}
  register(user: { email: string; password: string }) {
    return this.angularFireAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }
  login(user: { email: string; password: string }) {
    return this.angularFireAuth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }
  logout() {
    return this.angularFireAuth.signOut();
  }

  // async uploadImage(file: any) {
  //   if (file) {
  //     const filePath = `user-images/${file.name}`;
  //     const fileRef = this.storage.ref(filePath);
  //     const snapshot = await fileRef.put(file);
  //     return snapshot.ref.getDownloadURL();
  //   }
  //   return '';
  // }

  // async register(registerForm: any) {
  //   const { email, password, firstName, lastName, image } = registerForm;
  //   try {
  //     const credential =
  //       await this.angularFireAuth.createUserWithEmailAndPassword(
  //         email,
  //         password
  //       );
  //     const user = credential.user;

  //     if (user) {
  //       const imageUrl = await this.uploadImage(image);
  //       await user.updateProfile({
  //         displayName: firstName + lastName,
  //         photoURL: imageUrl,
  //       });
  //       await this.firestore
  //         .collection('users')
  //         .doc(user.uid)
  //         .set({
  //           email: email,
  //           name: firstName + lastName,
  //           imageUrl: imageUrl,
  //         });
  //     }
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //     throw error;
  //   }
  // }
}
