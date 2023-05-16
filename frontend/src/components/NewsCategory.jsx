import { Box } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'

const NewsCategory = ({ category }) => {

    const [loading, setLoading] = useState()
    const [news, setNews] = useState()

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/api/news?category=${category}`).then((res) => {
                console.log(res.data)
            })
        } catch (err) {
            console.warn(err)
        }
    }, [])

    return (
        <Box className='' width={'100%'}>

        </Box>
    )
}

export default NewsCategory