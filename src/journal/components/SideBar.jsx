import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import {useDispatch, useSelector} from 'react-redux'

import {SideBarItem} from "./SideBarItem.jsx"





export const SideBar = ({drawerWidth}) => {

    const {displayName ,email} = useSelector(state => state.auth)
    const {notes} = useSelector(state => state.journal)
 

  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink:{sm: 0}}}
    >
        <Drawer
            variant="permanent"
            open={true}
            sx={{
                display: {xs: 'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
            }}
        >   
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>{displayName || email}</Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map(note => (
                      <SideBarItem key={note.id} {...note}/>
                    ))
                }
            </List>
        </Drawer>


    </Box>
  )
}

