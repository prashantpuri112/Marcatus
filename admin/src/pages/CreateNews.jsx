import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, IconButton, Image, Input, Select, Switch, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiChevronRight, FiImage } from 'react-icons/fi'
import { FileUploader } from "react-drag-drop-files";
import JoditEditor from "jodit-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const CreateNews = () => {

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [slug, setSlug] = useState('')
    const [category, setCategory] = useState('stock')
    const [image, setImage] = useState()
    const [content, setContent] = useState('')
    const [is_published, setIsPublished] = useState(false)
    const [is_featured, setIsFeatured] = useState(false)

    const [loadingData, setLoadingData] = useState(true)

    const navigate = useNavigate()

    // Update the news post
    const newsSlug = useParams().newsSlug
    useEffect(() => {
        try {
            if (newsSlug) {
                axios.get('http://localhost:8080/api/news/' + newsSlug).then((res) => {
                    const news = res.data
                    setTitle(news.title)
                    setSlug(news.slug)
                    setSubtitle(news.subtitle)
                    setCategory(news.category)
                    setContent(news.content)
                    setIsFeatured(news.is_featured)
                    setIsPublished(news.is_published)
                    console.log(news.is_featured)
                    const image = { url: `http://localhost:8080/${news.image}` }
                    setImage(image)
                    setLoadingData(false)
                })
            } else {
                setLoadingData(false)
            }
        } catch (err) {
            console.log(err)
        }
    }, [newsSlug])

    const [loading, setLoading] = useState(false)

    const handleFileChange = (file) => {
        file.url = URL.createObjectURL(file)
        setImage(file);
    };

    const handleSubmit = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('subtitle', subtitle)
        formData.append('slug', slug)
        formData.append('category', category)
        formData.append('image', image)
        formData.append('content', content)
        formData.append('is_featured', is_featured)
        formData.append('is_published', is_published)

        try {
            const url = newsSlug ? `http://localhost:8080/api/updateNews/${newsSlug}` : 'http://localhost:8080/api/createNews'
            if (newsSlug) {
                const res = await axios.put(url, formData)
                toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                navigate('/news/update/'+slug)
                setLoading(false)
            } else {
                const res = await axios.post(url, formData)
                toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                setLoading(false)
            }

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.error, { position: toast.POSITION.TOP_RIGHT })
            setLoading(false)
        }
    }

    return (
        <Container maxW={'6xl'} py={18} size={'md'}>
            <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                <IconButton onClick={() => navigate('/')} icon={<FiArrowLeft />} />
                <Heading as={'h5'}>{newsSlug ? 'Update News' : 'Create News'}</Heading>
            </Box>
            <Container maxW={'100%'} shadow={'md'} rounded={'md'} py={5} my={6} border={'1px'} borderColor={'#f1f1f1'}>
                <Breadcrumb separator={<FiChevronRight />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>News</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='/news/create'>{newsSlug ? 'Update News' : "Create News"}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Box className='gap-3' display={'flex'} flexDirection={'column'} my={4}>
                    <FormControl isInvalid={title === ''}>
                        <FormLabel>Title</FormLabel>
                        <Input onChange={(e) => { setTitle(e.target.value) }} type='email' defaultValue={title} />
                        <FormErrorMessage>Title is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={slug === ''}>
                        <FormLabel>Slug</FormLabel>
                        <Input onChange={(e) => { setSlug(e.target.value) }} type='email' defaultValue={slug} />
                        <FormHelperText>Slug must be unique.</FormHelperText>
                        <FormErrorMessage>Title is required.</FormErrorMessage>
                    </FormControl>
                    <Box className='gap-3' display={'flex'}>
                        <FormControl>
                            <FormLabel>Subtitle</FormLabel>
                            <Input onChange={(e) => { setSubtitle(e.target.value) }} type='email' defaultValue={subtitle} />
                        </FormControl>
                        {
                            loadingData ?
                                <>Loading</> :
                                <FormControl isInvalid={category === ''}>
                                    <FormLabel>Category</FormLabel>
                                    <Select onChange={(e) => setCategory(e.target.value)} defaultValue={category}>
                                        <option value="" disabled>Select Option</option>
                                        <option value='stock'>Stock</option>
                                        <option value='insurance'>Insurance</option>
                                        <option value='technical-analysis'>Technical Analysis</option>
                                        <option value='opinion-and-analysis'>Opinion and Analysis</option>
                                        <option value='bank'>Bank</option>
                                        <option value='international'>International</option>
                                        <option value='trending'>Trending</option>
                                        <option value='hydropower'>Hydropower</option>
                                    </Select>
                                </FormControl>
                        }
                    </Box>
                    <Box>
                        <FormLabel>Image Preview</FormLabel>
                        {loadingData ?
                            <></> :
                            <Box bg={'#bfbfbf'} width={'17ch'} height={'15ch'} display={'flex'} alignItems={'center'} justifyContent={'center'} rounded={'md'} overflow={'hidden'}>
                                {
                                    image ?
                                        <Image src={image.url} alt='preview' />
                                        :
                                        <FiImage style={{ fontSize: '3rem' }} color='#828282' />
                                }
                            </Box>
                        }
                    </Box>
                    <Box>
                        <FileUploader
                            multiple={false}
                            handleChange={handleFileChange}
                            name="file"
                            types={["JPG", "JPEG", "PNG", "GIF", "WEBP", "AVIF"]}
                        />
                    </Box>
                    <Box>
                        <JoditEditor value={content} onChange={(e) => setContent(e)} />
                    </Box>
                </Box>
                <Box>
                    {
                        loadingData ?
                            <></> :
                            <Box>
                                <FormControl>
                                    <FormLabel>Featured</FormLabel>
                                    <Switch onChange={(e) => setIsFeatured(e.target.checked)} defaultChecked={is_featured} />


                                </FormControl>
                                <FormControl>
                                    <FormLabel mt={8}>Published</FormLabel>
                                    <Switch onChange={(e) => setIsPublished(e.target.checked)} defaultChecked={is_published} />
                                </FormControl>
                            </Box>
                    }
                </Box>
                <Box mt={8}>
                    <Button onClick={handleSubmit} display={'flex'} ms={'auto'} color={'blue'} isLoading={loading}>{newsSlug ? 'Update' : 'Create'}</Button>
                </Box>
            </Container>
        </Container>
    )
}

export default CreateNews