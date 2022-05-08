import { useEffect, useState } from 'react'
import { Alert, AlertTitle, Container, Tab, Box } from '@mui/material'
import { TabContext, TabPanel, TabList } from '@mui/lab'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import LoginIcon from '@mui/icons-material/Login'
import Account from './components/Account'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DownloadingRoundedIcon from '@mui/icons-material/DownloadingRounded';


const App = () => {
  const [tab, setTab] = useState('1')
  const [user, loading, error] = useAuthState(auth)
  
  useEffect(() => user ? setTab('3') : setTab('1') , [user])

  return (
    <Container maxWidth='xs'>
      <TabContext value={tab}>
        <Box sx={{borderBottom: 1, borderColor: 'primary.main'}}>
          <TabList
            onChange={ (event, newValue) => { setTab(newValue)} }
            variant='fullWidth'>
            <Tab
              icon={<LoginIcon />} 
              label='SignIn'
              value='1' />
            <Tab
              icon={<PersonAddRoundedIcon />}
              label='SignUp'
              value='2' />
            <Tab
              icon={<AccountCircleIcon />}
              label='Account'
              value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <SignIn />
        </TabPanel>
        <TabPanel value='2'>
          <SignUp />
        </TabPanel>
        <TabPanel value='3'>
          <Account />
        </TabPanel>
      </TabContext>
      { error && 
        <Alert severity='error'>
          <AlertTitle>Auth error</AlertTitle>
          { error.message }
        </Alert>
      }
      { loading && 
        <DownloadingRoundedIcon fontSize='large' />
      }
    </Container>
  )
}

export default App
