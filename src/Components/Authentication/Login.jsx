import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { signInWithEmailAndPassword } from 'firebase/auth'
import * as React from 'react'
import { CryptoState } from '../../CryptoContext'
import { auth } from '../../firebase'

const Login = ({ handleClose }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const { setAlert } = CryptoState()
    
    const handleSubmit = async () => {
        if (!email || !password) {
            setAlert({
                open: true,
                message: 'Please fill all the Fields',
                type: 'warning',
            })
            return
        }

        try {
            const result = await signInWithEmailAndPassword(auth, email, password)

            setAlert({
                open: true,
                message: `Login Successful. Welcome ${result.user.email}`,
                type: 'success',
            })

            handleClose()
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error',
            })
        }
    }

  return (
    <Box 
        p={3}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
        <TextField 
            variant='outlined'
            type='email'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
        />
        <TextField 
            variant='outlined'
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
        />
        <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}
        >
            Login
        </Button>
    </Box>
  )
}

export default Login