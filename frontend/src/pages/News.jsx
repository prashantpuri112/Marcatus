import { Badge, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const News = () => {

    const [loading, setLoading] = useState()
    const [news, setNews] = useState(true)

    const category = useParams().category

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/api/news?category=${category}&is_published=true`).then((res) => {
                console.log(res.data)
                setNews(res.data)
                setLoading(false)
            })
        } catch (err) {
            console.warn(err)
        }
    }, [])

    return (
        <Box className='' backgroundColor={'gray.100'} width={'100%'} p={'1rem'}>
            <Box maxW={'8xl'} mx={'auto'}>
                <Text fontSize={'3xl'} fontWeight={'bold'}>{category.charAt(0).toUpperCase() + category.replace('-', " ").slice(1)}</Text>
                <SimpleGrid columns={[1, 2, 4]} spacingX={4} spacingY={4}>
                    {!loading ?
                        news.news?.length === 0 ?
                            <Box w={'100%'} display={'flex'} height={'50ch'}>
                                <Text>No news available</Text>
                            </Box> :
                            news.news?.map((news, ind) => {
                                return (
                                    <Card rounded={'md'} key={ind}>
                                        <CardBody>
                                            {
                                                news.image &&
                                                <Image
                                                    height={'23ch'}
                                                    objectFit={'cover'}
                                                    src={`http://localhost:8080/${news.image}`}
                                                    alt=''
                                                    borderRadius='lg'
                                                />
                                            }

                                            <Stack mt='6'>
                                                <Box>
                                                    <Badge colorScheme='green' variant={'subtle'} fontSize={'0.6rem'} py={1} px={1} rounded={'md'}>{news.category}</Badge>
                                                </Box>
                                                <Heading size='md'>{news.title}</Heading>
                                                <Text>
                                                    {news.subtitle}
                                                </Text>
                                                <Text fontSize={'xs'} color={'green'}>
                                                    {new Date(news.date_created).toDateString()}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                        <CardFooter py={0} pb={4}>
                                            <ButtonGroup spacing='2'>
                                                <Link href={`/news/${news.slug}`}>
                                                    <Button variant='link' colorScheme='blue'>
                                                        Read More
                                                    </Button>
                                                </Link>
                                            </ButtonGroup>
                                        </CardFooter>
                                    </Card>
                                )
                            })
                        :
                        <Skeleton>
                            <div>contents wrapped</div>
                            <div>won't be visible</div>
                        </Skeleton>
                    }
                </SimpleGrid>
            </Box>
        </Box>
    )
}

export default News