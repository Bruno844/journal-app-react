import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup(firebaseAuth, googleProvider )
        //const credentials = GoogleAuthProvider.credentialFromResult(result)

        const {displayName, email ,photoURL,uid} = result.user
        await updateProfile(firebaseAuth.currentUser, {
            displayName
        });


        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

     
        


    } catch (error) {
       
        const errorCode = error.code;
        const errorMessage = error.message

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }

}


export const registerUserWithEmailPassword = async ({email,password,displayName}) => {

    try {

        const resp = await createUserWithEmailAndPassword(firebaseAuth,email,password);
        const {uid, photoURL} = resp.user;

        console.log(resp)

        
    } catch (error) {
        return {
            ok:false,
            errorMessage: error.message
        }
    }

}

//THUNKS PARA INICIAR SESION CON EMAIL Y CONTRASEÑA
export const loginWithEmailPassword = async({email,password}) => {

    try {
        
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const {uid,photoURL,displayName} = resp.user
        
        return {
            ok: true,
            uid,
            photoURL,
            displayName
        }


    } catch (error) {
        return{
            ok: false,
            errorMessage: error.message
        }
    }

}


export const logOutFirebase = async() => {

    return await firebaseAuth.signOut();


}