import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"


export const JournalPage = () => {

  const {isSaving,activeNote} = useSelector(state => state.journal)

  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    
    <JournalLayout>

      {/* <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora esse fugit blanditiis optio accusantium at culpa sequi nulla eligendi, accusamus laudantium, ad facilis labore quis quibusdam praesentium quia, in assumenda?
      </Typography> */}

      {
        (!!activeNote)
        ? <NoteView />
        : <NothingSelectedView/>
      }

      
      
      
      {/*<NoteView />*/}

        
      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large" sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': {backgroundColor: 'error.main', opacity: 0.9},
        position: 'fixed',
        right: 50,
        bottom: 50
      }}>
        <AddOutlined sx={{fontSize:30}} />
      </IconButton>



      
    </JournalLayout>
     
   
  )
}

