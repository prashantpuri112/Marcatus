import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { Box, Button, Container, FormControl, FormLabel, IconButton, Image, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import convertToBase64 from '../../utils/convert'
import axios from 'axios'
import { toast } from 'react-toastify'
import CustomPasswordInput from '../../components/shared/CustomPasswordInput'

const ProfileUpdate = () => {

    const { user, loading } = useContext(UserContext)

    // Form Data
    const [file, setFile] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [contact, setContact] = useState()
    const [address, setAddress] = useState()
    const [password, setPassword] = useState()

    const { isOpen, onOpen, onClose } = useDisclosure()

    // Change password fields
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const config = {
        headers:
            { "Authorization": `Bearer ${localStorage.getItem('stock_client_token')}` }
    }

    const handdleFile = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64)
    }

    const handleSubmit = async () => {

        try {
            const data = {
                firstName,
                lastName,
                email,
                mobile: contact,
                address,
                profile: file,
                password
            }

            const res = await axios.put('http://localhost:8080/api/updateuser', data, config)
            toast.success(res.data.msg, { position: toast.POSITION.TOP_RIGHT })
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.error, { position: toast.POSITION.TOP_RIGHT })
        }
    }

    const changePassword = async () => {
        try {
            if (newPassword !== confirmPassword) {
                return toast.error("Passwords do not match", { position: toast.POSITION.TOP_RIGHT })
            }
            else if (newPassword === '' || confirmPassword === '' || currentPassword === '') {
                return toast.error("Enter a valid password", { position: toast.POSITION.TOP_RIGHT })
            } else {

                const res = await axios.put('http://localhost:8080/api/changePassword', { email: user?.email, currentPassword, newPassword, confirmPassword }, config)
                const fields = document.querySelectorAll('.password-fields')
                fields.forEach(field => {
                    field.value = ''
                    console.log(field)
                })
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
                return toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
            }

        } catch (err) {
            toast.error(err.response.data.error, { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <Container maxW={'4xl'} pb={8}>
            <Text my={4} fontWeight={'bold'} fontSize={'xl'}>User Profile</Text>
            {
                !loading ?
                    <Box py={4} px={6} border={'1px'} borderColor={'#dbdbdb'} rounded={'md'}>
                        <Box height={'10ch'} width={'10ch'} position={'relative'}>
                            <Image rounded={'full'} height={'100%'} width={'100%'} objectFit={'cover'} src={file ? file : user?.profile ? user.profile : 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'} />
                            <IconButton onClick={() => document.getElementById('profile-img').click()} position={'absolute'} size={'xs'} icon={<FiEdit />} bottom={0} right={0} />
                            <input id='profile-img' onChange={handdleFile} type="file" hidden accept='image/*' />
                        </Box>

                        <Box>
                            <Text my={4} fontWeight={'bold'} fontSize={'xl'}>Personal Information</Text>
                            <Stack direction={'row'}>
                                <FormControl>
                                    <FormLabel fontSize={'xs'}>First Name</FormLabel>
                                    <Input onChange={(e) => setFirstName(e.target.value)} defaultValue={user.firstName} placeholder='Enter first name' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize={'xs'}>Last Name</FormLabel>
                                    <Input onChange={(e) => setLastName(e.target.value)} defaultValue={user.lastName} placeholder='Enter last name' />
                                </FormControl>
                            </Stack>
                            <Stack direction={'row'} my={5}>
                                <FormControl>
                                    <FormLabel fontSize={'xs'}>Email</FormLabel>
                                    <Input onChange={(e) => setEmail(e.target.value)} defaultValue={user.email} placeholder='Enter email' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize={'xs'}>Contact</FormLabel>
                                    <Input onChange={(e) => setContact(e.target.value)} defaultValue={user.mobile} placeholder='Enter contact number' />
                                </FormControl>
                            </Stack>
                            <FormControl>
                                <FormLabel fontSize={'xs'}>Address</FormLabel>
                                <Input onChange={(e) => setAddress(e.target.value)} defaultValue={user.address} placeholder='Enter address' />
                            </FormControl>
                            <Button colorScheme='blue' display={'block'} mt={3} ms={'auto'} onClick={onOpen}>Update</Button>

                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Confirm Changes</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Text>You are trying to update your profile data. Please enter your password.</Text>
                                        <FormControl my={4}>
                                            <CustomPasswordInput onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button mx={3} onClick={onClose} variant='ghost'>Cancel</Button>
                                        <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
                                            Confirm
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Box>

                        <Box mt={6}>
                            <Text my={4} fontWeight={'bold'} fontSize={'xl'}>Acount Password</Text>
                            <FormControl my={4}>
                                <FormLabel fontSize={'xs'}>Current Password</FormLabel>
                                <CustomPasswordInput className={'password-fields'} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Enter your current password' />
                            </FormControl>
                            <FormControl my={4}>
                                <FormLabel fontSize={'xs'}>New Password</FormLabel>
                                <CustomPasswordInput className={'password-fields'} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter a new password' />
                            </FormControl>
                            <FormControl my={4}>
                                <FormLabel fontSize={'xs'}>Retype Password</FormLabel>
                                <CustomPasswordInput className={'password-fields'} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Comfirm new password' />
                            </FormControl>
                            <Button onClick={changePassword} colorScheme='blue' display={'block'} mt={3} ms={'auto'}>Change Password</Button>
                        </Box>
                    </Box>
                    :
                    <>Loading</>
            }
        </Container>
    )
}

export default ProfileUpdate