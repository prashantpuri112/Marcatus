import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Input, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import axiosGet from '../../axios/axiosGet'
import axiosCall from '../../axios/axiosCall'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()

    const [password, setNewPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

    const [verifyField, setVerifyField] = useState()
    const [otp, setOTP] = useState()

    const [verified, setVerified] = useState(false)

    const navigate = useNavigate()

    const changePassword = async () => {
        setLoading(true)
        console.log(password, conPassword)
        try {
            if (password === conPassword) {
                const res = await axios.put('http://localhost:8080/api/resetPassword', { email, password })
                console.log(res.data)
                toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                navigate('/login')
            } else {
                toast.error("Password does not match.", { position: toast.POSITION.TOP_RIGHT })
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const handleSend = async () => {
        setLoading(true)
        const res = await axiosGet(`/api/generateOTP?email=${email}`)
        const user = await axiosGet(`/api/user/${email}`);
        let text = `Your Password Recovery OTP is ${res.code}. Verify and recover your password.`;
        const resSendEmail = await axiosCall('/api/registerMail', { username: user.username, email: email, text, subject: "Password Recovery OTP" })
        setLoading(false)

        if (resSendEmail) {
            setVerifyField(true)
            setLoading(false)
        }
    }

    const handleVerifyOTP = async () => {
        setLoading(true)
        const res = await axiosGet(`/api/verifyOTP?email=${email}&code=${otp}`)
        console.log(res)
        if (res) {
            setVerified(true)
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <div>
            <Container px={4} py={4} my={5} border={'1px'} borderColor={'#dbdbdb'} borderRadius={'1em'}>
                <h4 className='' style={{ fontWeight: "bold" }}>Forgot Password</h4>
                {
                    !verified ?
                        <Box>
                            <FormControl my={4}>
                                <FormLabel>Email address</FormLabel>
                                <FormHelperText>Enter your email to send you an OTP code.</FormHelperText>
                                <Input onChange={(e) => { setEmail(e.target.value) }} type='email' />
                            </FormControl>
                            <Button colorScheme='blue' mx={'auto'} display={verifyField ? 'none' : 'flex'} w={'100%'} onClick={handleSend} isLoading={loading ? true : false}>Send</Button>
                            <Container px={0} display={verifyField ? 'block' : 'none'}>
                                <p>Verify OTP</p>
                                <FormControl my={4}>
                                    <FormLabel>Enter OTP</FormLabel>
                                    <Input onChange={(e) => { setOTP(e.target.value) }} type='text' />
                                    <FormHelperText>Enter OTP code you received</FormHelperText>
                                </FormControl>
                                <Button colorScheme='blue' mx={'auto'} display={'flex'} w={'100%'} onClick={handleVerifyOTP} isLoading={loading ? true : false}>Verfy</Button>
                                <p>Did not get an OTP? <Link onClick={handleSend} color={'blue'}>Resend</Link></p>
                            </Container>
                        </Box>
                        :
                        <Box>
                            <FormControl my={4}>
                                <FormLabel>New password</FormLabel>
                                <FormHelperText>Enter your new password</FormHelperText>
                                <Input defaultValue={password} onChange={(e) => { setNewPassword(e.target.value) }} type='password' autoComplete='off' />
                            </FormControl>
                            <FormControl my={4}>
                                <FormLabel>Confirm password</FormLabel>
                                <FormHelperText>Re-type your new password</FormHelperText>
                                <Input defaultValue={conPassword} onChange={(e) => { setConPassword(e.target.value) }} type='password' autoComplete='off' />
                            </FormControl>
                            <Button isLoading={loading} onClick={changePassword}>Confirm</Button>
                        </Box>
                }
            </Container>
        </div>
    )
}

export default ForgotPassword