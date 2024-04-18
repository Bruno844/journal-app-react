
import { Link as RouterLink } from "react-router-dom"

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserEmailPassword } from "../../store/auth/thunks"


const formData = {
  email: '',
  password: '',
  displayName: ''
}

//metodo de validacion casero, sin librerias
const formValidation = {
  email:[ (value) => value.includes('@'), 'El correo debe de tener un @'],
  password:[ ((value = String) => value.length >= 6 ), 'el password debe de tener mas de 6 letras'],
  displayName:[ ((value = String) => value.length >= 1 ) , 'el nombre es obligatorio']
}





export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => {status === 'checking'}, [status])


  const {displayName, email, password, onInputChange, formState, displayNameValid, emailValid,passwordValid,isformValid} = useForm(formData, formValidation)



  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true)
    console.log(formState)

    if(!isformValid) return;

    dispatch(startCreatingUserEmailPassword(formState))

  }


  return (

    <AuthLayout title="Crear Cuenta" >


      <form onSubmit={ onSubmit}  className="animate__animated animate__fadeInDown animate__slow">

        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Nombre Completo"
                type="text"
                placeholder="tu nombre"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>


          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Contraseña"
              type="password"
              placeholder="1234"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
            </Grid>


            <Grid item xs={12} sm={6} >
              <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Grid>


          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>


          </Grid>

        </Grid>


      </form>

    </AuthLayout>




  )
}

