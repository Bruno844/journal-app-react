import { CircularProgress, Grid } from "@mui/material"


export const CheckingAuth = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >

            <Grid 
                container
                
                sx={{width:{sm: 450}, justifyContent:'center'}}

            >
              <CircularProgress color="warning"/>  
            </Grid>
        </Grid>
  )
}

