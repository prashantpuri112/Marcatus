import React from 'react'
import { Container, Box, Heading, IconButton, FormControl, FormLabel, Text, Button } from "@chakra-ui/react"
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import axios from 'axios'
import { toast } from 'react-toastify'

const ExtractData = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState()

    const handleFileChange = (file) => {
        file.url = URL.createObjectURL(file)
        console.log(file.url)
        setFile(file);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('http://localhost:8080/api/extract-data', formData)
            console.log(res)
            toast.success(res.data.msg, { position: toast.POSITION.TOP_RIGHT })
        } catch (err) {
            toast.error(err.response.data.error, { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <Container maxW={'4xl'} py={8}>
            <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                <IconButton onClick={() => navigate('/')} icon={<FiArrowLeft />} />
                <Heading as={'h5'}>Extract Data</Heading>
            </Box>
            <Box my={8} h={'50ch'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Box>
                    <FormControl>
                        <FormLabel>Choose and upload a file</FormLabel>
                        <FileUploader
                            multiple={false}
                            handleChange={handleFileChange}
                            name="file"
                            types={["CSV"]}
                        />
                    </FormControl>
                    <Text fontSize={'xs'} my={3}>Only .csv files are supported for the extraction of the datasets to the local database.</Text>
                    <Button colorScheme='blue' display={'block'} mx={'auto'} onClick={handleSubmit}>Extract</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default ExtractData