import { StarOutlined, StartOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"




export const NothingSelectedView = () => {


    
 


    return ( 
        
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(110vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3,mt: 8}}
        >
            <Grid item xs={12} >
                <StarOutlined sx={{fontSize: 100, color: 'white'}} />
            </Grid>
            <Grid item xs={12} >
               <Typography color='white' variant="h5">Selecciona una nota</Typography>
            </Grid>


        </Grid>

    )
}

