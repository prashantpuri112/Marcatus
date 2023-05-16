import React from 'react'
import CurrencyExchange from '../../components/CurrencyExchange'
import { Box } from '@chakra-ui/react'

const Forex = () => {

    return (

        <Box width={'100%'} p={'1rem'} backgroundColor={'gray.100'}>
            <Box maxW={'6xl'} mx={'auto'} bg={'white'} border={'1px'} borderColor={'gray.200'} rounded={'md'}>
                <CurrencyExchange />
            </Box>
        </Box>
    )
}

export default Forex