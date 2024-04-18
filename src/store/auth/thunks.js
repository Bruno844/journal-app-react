import { logOutFirebase, loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogOut } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
    }
}


export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials())

       const result = await signInWithGoogle();
       console.log({result})
        if(!result.ok) {
            dispatch(logout(result.errorMessage)) 
        }else{
            dispatch(login(result))
        }
    }
}


export const startCreatingUserEmailPassword = ({email,password,displayName}) => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email,password,displayName})
    
        if (!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName,email, photoURL}))
        

      //console.log(resp)
    }
}


export const startLoginEmailPassword = ({email, password}) => {

    return async(dispatch) => {

        dispatch(checkingCredentials())

        const result = await loginWithEmailPassword({email,password});
        console.log(result)
        if(!result.ok) return dispatch(logout(result))

        dispatch(login(result));


    }

}

export const startLogOut = () => {
    return async(dispatch) => {

        await logOutFirebase();
        dispatch(clearNotesLogOut());
        dispatch(logout());


    }
}