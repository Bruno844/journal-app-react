import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { setActiveNote, updateNote } from "../../store/journal/journalSlice"




export const SideBarItem = ({title = '',body, id,date,imageUrls = []}) => {

    const dispatch = useDispatch()

    const SetNoteCurrent = () => {
        dispatch(setActiveNote({title, body,id,date,imageUrls}))
    }


    const newTitle = useMemo(() => {
        return title.length > 17
        ? title.substring(0,17) + '...'
        : title;
    })

    

 
    return (
        <ListItem  disablePadding >
            <ListItemButton onClick={SetNoteCurrent}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                   
                    <ListItemText secondary={newTitle.body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
