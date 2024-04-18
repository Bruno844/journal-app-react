import { createSlice} from '@reduxjs/toolkit';

export const journalSlice = createSlice({

    name: 'journal',
    initialState: {
        isSaving: false,
        saveMessage: '',
        notes: [],
        activeNote: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
            
        },
        addNewEmptyNote: (state,action) => {

            state.notes.push(action.payload);
            state.isSaving = false;


        },
        setActiveNote: (state,action) => {
            state.activeNote = action.payload;
            state.saveMessage = ''
        },
        setNotes: (state,action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true
            state.saveMessage = '';
        },
        updateNote: (state,action) => {
            state.isSaving = false;
            state.notes = state.notes.map(noteCurrent => {
                
                if(noteCurrent.id === action.payload.id){
                    return action.payload
                }
                
                return noteCurrent
            });

            state.saveMessage = `${action.payload.title}, actualizada correctamente`

        },
        setPhotosToActiveNote: (state,action) => {
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogOut: (state) => {
            state.isSaving = false;
            state.saveMessage = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: (state,action) => {
            state.activeNote = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
        }
    }

});



export const { addNewEmptyNote,setActiveNote,setNotes,setSaving,updateNote,deleteNoteById, savingNewNote,setPhotosToActiveNote,clearNotesLogOut } = journalSlice.actions;