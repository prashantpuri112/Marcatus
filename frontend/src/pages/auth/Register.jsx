import React, { useState } from 'react'
import axios from 'axios';
import { FiLoader } from 'react-icons/fi'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container,
    Button,
    Link,
} from '@chakra-ui/react'
import { toast } from 'react-toastify';
import axiosCall from '../../axios/axiosCall';
import CustomPasswordInput from '../../components/shared/CustomPasswordInput';

const Register = () => {

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        setLoading(true)
        const res = await axiosCall('/api/register', { email: email, username: username, password: password })
        console.log(res)
        if (res) {
            toast.success(res.msg, { positiom: toast.POSITION.TOP_RIGHT })
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <Container className='' my={5} maxW={'md'} border={'1px'} rounded={'1em'} px={6} py={4} borderColor={'#dbdbdb'}>
            <h6>Register your account</h6>
            <FormControl my={4}>
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e) => { setEmail(e.target.value) }} type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl my={4}>
                <FormLabel>Username</FormLabel>
                <Input onChange={(e) => { setUsername(e.target.value) }} type='text' />
            </FormControl>
            <FormControl my={4}>
                <FormLabel>Password</FormLabel>
                <CustomPasswordInput onChange={(e) => { setPassword(e.target.value) }} type='password' />
            </FormControl>
            <Button colorScheme='blue' mx={'auto'} display={'flex'} w={'100%'} onClick={handleRegister} isLoading={loading ? true : false}>Register</Button>
            <Container my={4} px={0}>
                <p>Already have an account? <Link href='/login' color={'blue'}>Login</Link></p>
            </Container>
        </Container>
    )
}

export default Register