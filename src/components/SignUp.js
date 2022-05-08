import { useState } from 'react'
import { Box, TextField, AlertTitle, Alert } from "@mui/material"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'


const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordsAlert, setPasswordsAlert] = useState('')

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth)

  const handleSignup = e => {
    e.preventDefault()
    setPasswordsAlert('')
    if (password !== passwordConfirm)
      setPasswordsAlert('Make sure your passwords match')
    else
      createUserWithEmailAndPassword(email, password)
  }

  return (
    <Box component='form' onSubmit={handleSignup} > 
      <TextField
        id='SignUpEmail'
        type='email'
        label='Email'
        margin='normal'
        color='success'
        required
        fullWidth
        disabled={loading || !!user}
        onChange={ e => setEmail(e.target.value) } />
      <TextField 
        id='SignUpPassword'
        type='password'
        label='Password'
        margin='normal'
        color='success'
        required
        fullWidth
        disabled={loading || !!user}
        onChange={ e => setPassword(e.target.value) } />
      <TextField 
        id='SignUpPasswordConfirm'
        type='password'
        label='Password confirm'
        margin='normal'
        color='success'
        required
        fullWidth
        disabled={loading || !!user}
        onChange={ e => setPasswordConfirm(e.target.value) } />
      <LoadingButton
        type='submit'
        fullWidth
        variant='contained'
        color='success'
        sx={{ mt: 2, mb: 2 }}
        loading={loading}
        disabled={!!user}
        loadingPosition="end"
        endIcon={<SendIcon />} >
        Register
      </LoadingButton>
      { (error || passwordsAlert) && 
        <Alert severity="error">
          <AlertTitle>Register failed</AlertTitle>
          { error && error.message }
          { passwordsAlert && passwordsAlert }
        </Alert>
      }
    </Box>
  )
}

export default SignUp
