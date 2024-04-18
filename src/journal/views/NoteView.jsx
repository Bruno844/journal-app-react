import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import {useForm} from '../../hooks/useForm'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import {setActiveNote} from '../../store/journal/journalSlice'
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

    const dispatch = useDispatch()

    const {activeNote, saveMessage, isSaving} = useSelector(state => state.journal)

    const {body,title, onInputChange, formState,date} = useForm(activeNote)

    const dateString = useMemo(() => {

        const newDate = new Date(date)

        return newDate.toUTCString();
    }, [date])
    
    

    const fileInputRef = useRef()


    useEffect(() => {
        
        dispatch(setActiveNote(formState))
      
    }, [formState])

    useEffect(() => {
      
        if(saveMessage.length > 0){
            Swal.fire('nota actualizada', saveMessage, 'success')
        }

    
     
    }, [saveMessage])
    
    

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onInputFileChange = ({target}) => {
       if(target.files === 0) return;

       dispatch(startUploadingFiles(target.files))
    }


    const onDelete = () => {
        dispatch(startDeletingNote());
        Swal.fire('nota eliminada',saveMessage, 'success')
    }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}} >

        <Grid container sx={{mt: 6, mb: 6}} alignItems='center' justifyContent='space-between'>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            <Grid item>

                <input 
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onInputFileChange}
                    style={{display: 'none'}}
                
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined/>
                </IconButton>

               
                <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{padding: 2}} >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                    Guardar
                </Button>

            </Grid>
        </Grid>
        

        <Grid container>
            <TextField 
                type="text"
                variant="filled" fullWidth
                placeholder="ingrese un titulo"
                label='titulo'
                sx={{border: 'none', mb:1}}
                name="title"
                value={title}
                onChange={onInputChange}
            >
               
            </TextField>

            <TextField 
                type="text"
                variant="filled" fullWidth
                placeholder="Que sucedio hoy"
                label='titulo'
                minRows={5}
                name="body"
                value={body}
                onChange={onInputChange}
            >

            </TextField>


        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={onDelete}
                sx={{mt: 2}}
                color="error"
                disabled={!!isSaving}
            >
                <DeleteOutline />
                Borrar
                
            </Button>
        </Grid>

        <ImageGallery images={activeNote.imageUrls}  />

    </Grid>
  )
}

