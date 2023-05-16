import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Box, Container, Heading, Image, Text } from '@chakra-ui/react'

const NewsDetail = () => {

    const [news, setNews] = useState()
    const [loading, setLoading] = useState(true)
    const slug = useParams().slug

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/api/news/' + slug).then((res) => {
                console.log(res.data)
                setNews(res.data)
                setLoading(false)
            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <Box>
            <Container maxW={'6xl'}>
                {
                    loading ?
                        <></> :
                        <Box w={'100%'} px={4} py={5}>
                            <Badge colorScheme='green' variant={'subtle'} py={1} px={1} rounded={'md'}>{news.category}</Badge>
                            <Text as='h4' fontSize={'2xl'} fontWeight={'bold'}>{news.title}</Text>
                            <Text size={'md'}>{news.subtitle}</Text>
                            <Text fontSize={'xs'} color={'gray.500'}>{new Date(news.date_created).toDateString()}</Text>
                            <Box px={0} my={4}>
                                <Text dangerouslySetInnerHTML={{ __html: news.content }}></Text>
                            </Box>
                            <Box>
                                <Image />
                            </Box>
                        </Box>
                }
            </Container>
        </Box>
    )
}

export default NewsDetail