import React from 'react'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { CryptoState } from '../../CryptoContext'
import { auth } from '../../firebase'

const Signup = ({ handleClose }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const { setAlert } = CryptoState()

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: 'Passwords Do Not Match',
                type: 'error'
            })
            return
        }

        try {
            const result = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password
            )

            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`,
                type: 'success',
            })

            handleClose()
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error',
            })
            return
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
            <TextField
                variant='outlined'
                label='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant='contained'
                size='large'
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </Box>
    )
}

export default Signup