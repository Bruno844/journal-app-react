
import { Link as RouterLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import {useDispatch} from 'react-redux'
import { checkingAuthentication, startGoogleSignIn, startLoginEmailPassword } from "../../store/auth/thunks"
import {useSelector} from 'react-redux'
import { useMemo } from "react"

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth )

  const dispatch = useDispatch()

  const {email, password, onInputChange} = useForm(formData)

  const isAuthenticating = useMemo(() => status === 'checking', [status]) 


  const onSubmit = (event) => {
    event.preventDefault();
    
    dispatch(startLoginEmailPassword({email,password}))
  }

  const onGoogleSignIn = () => {
    console.log('googlesignin')

    dispatch(startGoogleSignIn())
  }








  return (

    <AuthLayout title="login!" >


      <form onSubmit={onSubmit}  className="animate__animated animate__fadeInDown animate__slow">

        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name = 'email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>


          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Contraseña"
              type="password"
              placeholder="1234"
              fullWidth
              name = 'password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid container>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>



            <Grid item xs={12} sm={6} >
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} >
              <Button disabled={isAuthenticating} variant="contained" fullWidth onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>


          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>


          </Grid>

        </Grid>


      </form>

    </AuthLayout>




  )
}

