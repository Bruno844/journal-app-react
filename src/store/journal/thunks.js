
import { doc,collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";


export const startNewNote = () => {

    return async(dispatch,getState) => {
        
        dispatch(savingNewNote())

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }





        const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc,newNote)

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
       



        console.log(newDoc,newNote)
        


    }

}


export const startLoadingNotes = () => {
    return async(dispatch,getState) => {

        const {uid} = getState().auth
        if(!uid) throw new Error('el UID del usuario no existe');

       const notes =  await loadNotes(uid)
        dispatch(setNotes(notes))

    }
}


export const startSaveNote = () => {

    return async(dispatch,getState) => {

        dispatch(setSaving())

        const {uid} = getState().auth;
        const {activeNote} = getState().journal;

        const noteToFirestore = {...activeNote};
        //la palabra delete es una propiedad propia de javascript, en el cual podes eliminar una propiedad de un objeto. Ya viene integrado con js esa palabra, es util.
        delete noteToFirestore.id;


        const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFirestore,{merge: true})

        console.log(noteToFirestore)

        dispatch(updateNote(activeNote))
    }
}



export const startUploadingFiles = (files = [] ) => {
    return async(dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photoUrls = await Promise.all(fileUploadPromises)

        dispatch(setPhotosToActiveNote(photoUrls));

    }
}

export const startDeletingNote = () => {
    return async(dispatch,getState) => {

        const {uid} = getState().auth
        const {activeNote} = getState().journal

        //console.log({uid,activeNote})

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        const resp = await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id))


    }
}