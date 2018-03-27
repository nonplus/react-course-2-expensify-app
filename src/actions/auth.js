import { firebase, googleAuthProvider } from "../firebase/firebase";

export const loginAsync = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logoutAsync = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
