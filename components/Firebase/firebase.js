import firebase from 'firebase';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

import firebaseConfig from './firebaseConfig';

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const verifyEmail = verifyEmail => auth.verifyEmail(email);

export const user  = firebase.auth().currentUser;

