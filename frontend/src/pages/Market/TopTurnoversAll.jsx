import React from 'react'
import { TopTurnovers } from '../../components/TopTurnover'
import { Box, Text } from '@chakra-ui/react'
import { useLiveData } from '../../hooks/useLiveData';

const TopTurnoversAll = () => {

  const { data, isLoading } = useLiveData();

  return (
    <Box width={'100%'} p={'1rem'} backgroundColor={'gray.100'}>
      <Box maxW={'6xl'} mx={'auto'} bg={'white'} border={'1px'} borderColor={'gray.200'} rounded={'md'} px={4} py={4}>
        <Text fontWeight={'bold'}>Turnovers</Text>
        <TopTurnovers topTurnover={data?.turnover} moreFields={true} />
      </Box>
    </Box>
  )
}

export default TopTurnoversAll