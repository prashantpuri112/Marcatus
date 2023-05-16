import React from 'react'
import { Box } from '@chakra-ui/react'
import TopBroker from './TopBroker'

const TopBrokersAll = () => {
    return (
        <Box bg={'gray.100'} w={'100%'} py={8}>
            <Box maxW={'6xl'} mx={'auto'} >
                <TopBroker />
            </Box>
        </Box>
    )
}

export default TopBrokersAll