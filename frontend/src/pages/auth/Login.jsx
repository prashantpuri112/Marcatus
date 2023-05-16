import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Container,
    Button,
    Link,
} from '@chakra-ui/react'
import axios from 'axios'
import axiosCall from '../../axios/axiosCall'
import { toast } from 'react-toastify'
import CustomPasswordInput from '../../components/shared/CustomPasswordInput'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        const res = await axiosCall('/api/login', { email, password })
        console.log(res)
        setLoading(false)
        if (res) {
            if (res.is_admin) {
                toast.info("Admins can login from admin portal.", { position: toast.POSITION.TOP_RIGHT })
            } else {
                localStorage.setItem('stock_client_token', res.token)
                window.location.href = '/'
            }
        }
    }


    return (
        <Container className='' my={5} maxW={'md'} border={'1px'} rounded={'1em'} px={6} py={4} borderColor={'#dbdbdb'}>
            <h6>Login with your account</h6>
            <FormControl my={4}>
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email' type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl my={4}>
                <FormLabel>Password</FormLabel>
                <CustomPasswordInput onChange={(e) => { setPassword(e.target.value) }} type='password' />
            </FormControl>
            <Container px={0}>
                <Link color={'blue'} href='/forgot-password'>Forgot Password?</Link>
            </Container>
            <Button colorScheme='blue' mx={'auto'} display={'flex'} w={'100%'} onClick={handleLogin} isLoading={loading ? true : false}>Login</Button>
            <Container my={4} px={0}>
                <p>Don't have an account? <Link href='/register' color={'blue'}>Create</Link></p>
            </Container>
        </Container>
    )
}

export default Login