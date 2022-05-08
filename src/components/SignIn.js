import { useState } from 'react'
import { auth } from '../firebase'
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { TextField, Box, AlertTitle, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import SendIcon from '@mui/icons-material/Send'


const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [AuthStateUser, AuthStateLoading] = useAuthState(auth)

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth)

  const handleLogin = e => {
      e.preventDefault()
      signInWithEmailAndPassword(email, password)
  }

  return (
    <Box component='form' onSubmit={handleLogin}>
      <TextField
        id='SignInEmail'
        type='email'
        autoComplete="email"
        label='Email'
        margin='normal'
        color='success'
        disabled={loading || AuthStateLoading || !!user || !!AuthStateUser}
        fullWidth
        required
        onChange={ e => setEmail(e.target.value) } />
      <TextField 
        id='SignInPassword'
        type='password'
        autoComplete='password'
        label='Password'
        margin='normal'
        color='success'
        disabled={loading || AuthStateLoading || !!user || !!AuthStateUser}
        fullWidth
        required
        onChange={ e => setPassword(e.target.value) } />
      <LoadingButton
        type='submit'
        fullWidth
        variant='contained'
        color='success'
        loading={loading || AuthStateLoading}
        disabled={!!user || !!AuthStateUser}
        loadingPosition="end"
        endIcon={<SendIcon />}
        sx={{ mt: 2, mb: 2 }} >
        Login
      </LoadingButton>
      { error && 
        <Alert severity="error">
          <AlertTitle>Login failed</AlertTitle>
            { error.message }
        </Alert>
      }
    </Box>
  )
}

export default SignIn
