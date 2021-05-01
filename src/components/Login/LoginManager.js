import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

export const initLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
};

export const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
        .then(res => currentUser(res.user))
};

export const logOutUser = () => {
    return firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem('token');

            return { isLoggedIn: false }
        })
};

export const setJWTToken = () => {
    return firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
            localStorage.setItem('token', idToken)
        })
};

export const getUserRole = async (email) => {
    const res = await fetch(`https://ph-travelbd.herokuapp.com/getAdmin?email=${email}`);
    const admin = await res.json();
    return admin.length > 0;
};

const currentUser = async (user) => {
    const { displayName, email, photoURL } = user;
    const isAdmin = await getUserRole(email);

    const userInfo = {
        isLoggedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        isAdmin: isAdmin,
        error: ""
    };
    return userInfo;
};