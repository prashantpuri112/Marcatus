import React from 'react'
import TopSectors from '../../components/TopSectors'
import { Box } from '@chakra-ui/react'

const TopSectorsAll = () => {
    return (
        <Box bg={'gray.100'} w={'100%'} py={8}>
            <Box maxW={'6xl'} mx={'auto'} >
                <TopSectors />
            </Box>
        </Box>
    )
}

export default TopSectorsAll