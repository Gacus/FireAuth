import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Typography, CardContent, Card, CardActions } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../firebase'
import LogoutIcon from '@mui/icons-material/Logout'


const Account = () => {
  const [user, loading, error] = useAuthState(auth)

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Account Information
        </Typography>
        { !!user ? (
          <>
            <Typography variant='body1'>
              Email: { user.email }
            </Typography>
            <Typography variant='body1'>
              Created: { user.metadata.creationTime }
            </Typography>
            <Typography variant='body1'>
              Last visit: { user.metadata.lastSignInTime }
            </Typography>
          </>
        ) : (
          <Typography variant='body1'>
            You are not logged in
          </Typography>
        ) }
        { error && 
          <Alert severity='error' sx={{ mt: 3 }}>
            <AlertTitle>There was a problem</AlertTitle>
            { error.message }
          </Alert>
        }
      </CardContent>
      <CardActions>
        <LoadingButton
          size='small'
          onClick={logout}
          loading={loading}
          disabled={!user}
          loadingPosition='end'
          endIcon={<LogoutIcon />} >
            Logout
        </LoadingButton>
      </CardActions>
    </Card>
  )
}

export default Account
