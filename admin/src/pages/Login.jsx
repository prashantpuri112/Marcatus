import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Container,
    Button,
    Link,
    Box,
    position,
    Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8080/api/login', { email, password })
            localStorage.setItem('stock_token', res.data.token)
            window.location.href = '/'
            setLoading(false)
        } catch (err) {
            console.log(err)
            toast.error("Login Failed!", { position: toast.POSITION.TOP_RIGHT })
            setLoading(false)
        }
    }


    return (
        <Box w={'100%'} h={'100vh'} display={'flex'} alignItems={'center'}>
            <Container>
                <Text maxW={'lg'} mx='auto'>Admin Login for Stock Market News Dashboard</Text>
                <Container mx={'auto'} my={5} maxW={'lg'} border={'1px'} rounded={'1em'} px={6} py={4} borderColor={'#dbdbdb'}>
                    <h6 style={{ fontWeight: 'bold' }}>Login with your account</h6>
                    <FormControl my={4}>
                        <FormLabel>Email address</FormLabel>
                        <Input onChange={(e) => { setEmail(e.target.value) }} type='email' />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Password</FormLabel>
                        <Input onChange={(e) => { setPassword(e.target.value) }} type='password' />
                    </FormControl>
                    <Button colorScheme='blue' mx={'auto'} display={'flex'} w={'100%'} onClick={handleLogin} isLoading={loading ? true : false}>Login</Button>
                    <Container my={4} px={0}>
                        <p>This panel is only accessible to authorized user only.</p>
                    </Container>
                </Container>
            </Container>
        </Box>
    )
}

export default Login