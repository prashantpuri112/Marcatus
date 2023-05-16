import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { Badge, Box, Button, Container, IconButton, Link, Stack, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Toast, Tr } from '@chakra-ui/react'
import { FiEdit, FiEye, FiPlus, FiTrash } from 'react-icons/fi'
import axios from 'axios'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'

const Dashboard = () => {

    const { user } = useContext(UserContext)

    const [news, setNews] = useState()
    const [loading, setLoading] = useState()
    const [deleted, setDeleted] = useState(false)

    const deletePost = async (slug) => {
        try {
            const res = await axios.delete('http://localhost:8080/api/deleteNews/' + slug)
            toast.info(res.data.message, { position: toast.POSITION.TOP_RIGHT })
            setDeleted(true)
        } catch (err) {
            console.log(err)
            toast.error("Connot process this request right now.", { position: toast.POSITION.TOP_RIGHT })
        }
    }

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/api/news').then((res) => {
                setNews(res.data)
                console.log(res.data)
            })
        } catch (err) {
            console.log(err)
        }
    }, [deleted])

    const handleLogout = () => {
        localStorage.clear()

    }

    const changePage = async (page) => {
        try {
            axios.get(`http://localhost:8080/api/news?page=${page}`).then((res) => {
                setNews(res.data)
                console.log(res.data)
            })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Layout>
            <Box py={8} w={'100%'} px={4}>
                <Container maxW={'100%'}>
                    <Text fontWeight={'bold'}>Welcome Back! {user?.username}</Text>
                    <Text>Create news and updates from here.</Text>

                    <Container maxW={'100%'} my={4} px={0} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontWeight={'bold'}>News</Text>
                        <Link href='/news/create'><Button colorScheme='blue'><FiPlus />Add New</Button></Link>
                    </Container>
                    <Container maxW={'100%'} border={'1px'} borderColor={'#f1f1f1'}>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Title</Th>
                                        <Th>Slug</Th>
                                        <Th>Featured</Th>
                                        <Th>Published</Th>
                                        <Th>Created At</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        news?.news.map((val, ind) => {
                                            return (
                                                <Tr key={ind}>
                                                    <Td><p className='title'>{val.title}</p></Td>
                                                    <Td>{val.slug}</Td>
                                                    <Td>{val.is_featured ? <Badge variant={'subtle'} colorScheme='green' rounded={'md'}>True</Badge> : <Badge variant={'subtle'} colorScheme='red' rounded={'md'}>False</Badge>}</Td>
                                                    <Td>{val.is_published ? <Badge variant={'subtle'} colorScheme='green' rounded={'md'}>True</Badge> : <Badge variant={'subtle'} colorScheme='red' rounded={'md'}>False</Badge>}</Td>
                                                    <Td>{new Date(val.date_created).toDateString()}, {new Date(val.date_created).toLocaleTimeString()}</Td>
                                                    <Td className='gap-1' display={'flex'}>
                                                        <Link href={`/news/update/${val.slug}`}><IconButton icon={<FiEdit />} /></Link>
                                                        <Link href={`/news/${val.slug}`}><IconButton icon={<FiEye />} /></Link>
                                                        <IconButton onClick={() => { deletePost(val.slug) }} colorScheme='red' icon={<FiTrash />} />
                                                    </Td>
                                                </Tr>
                                            )
                                        })
                                    }
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Td>
                                            <Box py={3}>
                                                <Stack direction={'row'} display={'flex'} alignItems={'end'}>
                                                    {
                                                        Array.from({ length: news?.totalPages }).map((val, ind) => {
                                                            return (
                                                                <Button key={ind} onClick={() => changePage(ind + 1)} size={'sm'}>{ind + 1}</Button>
                                                            )
                                                        })
                                                    }
                                                </Stack>
                                            </Box>
                                        </Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Container>
                </Container>
            </Box>
        </Layout>
    )
}

export default Dashboard