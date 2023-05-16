import { Button, Container, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomPasswordInput from '../../components/shared/CustomPasswordInput'

const ResetPassword = () => {

    const [password, setNewPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const email = useParams().email

    const changePassword = async () => {
        setLoading(true)
        try {
            if (password === conPassword) {
                const res = axios.put('http://localhost:8080/api/changePassword', { email, password })
                console.log(res.data)
            } else {
                toast.error("Password does not match.", { position: toast.POSITION.TOP_RIGHT })
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    return (
        <Container px={4} py={4} my={5} border={'1px'} borderColor={'#dbdbdb'} borderRadius={'1em'}>
            <h4 className='' style={{ fontWeight: "bold" }}>Forgot Password</h4>
            <FormControl my={4}>
                <FormLabel>New password</FormLabel>
                <FormHelperText>Enter your new password</FormHelperText>
                <CustomPasswordInput onChange={(e) => { setNewPassword(e.target.value) }} type='password' />
            </FormControl>
            <FormControl my={4}>
                <FormLabel>Confirm password</FormLabel>
                <FormHelperText>Re-type your new password</FormHelperText>
                <CustomPasswordInput onChange={(e) => { setConPassword(e.target.value) }} type='password' />
            </FormControl>
            <Button isLoading={loading} onClick={changePassword}>Confirm</Button>
        </Container>
    )
}

export default ResetPassword