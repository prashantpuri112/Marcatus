import { Box, Button, HStack, Link, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React from 'react'
import { useLiveData } from '../hooks/useLiveData'

const TopSectors = ({ viewMore }) => {

    const { data, isLoading } = useLiveData()

    return (
        <Box bg={'white'} w={'100%'} py={4} px={4} rounded={'md'}>
            <Text fontWeight={'bold'}>Top Sectors</Text>
            <VStack
                width={[`100%`, `100%`, `auto`, `auto`]}
                paddingTop={`1rem`}
                maxW={[`350px`, `100%`]}
            >
                <TableContainer width={`100%`}>
                    <Table size={`sm`} variant={'simple'}>
                        {
                            viewMore &&
                            <TableCaption>
                                <Link href='/market/top-sectors'>
                                    <Button variant={'link'}>View More</Button>
                                </Link>
                            </TableCaption>
                        }
                        <Thead>
                            <Tr color={`blue.600`}>
                                <Th>SN</Th>
                                <Th>Sector</Th>
                                <Th>Turnovers</Th>
                                <Th>Quantity</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.sector?.detail.slice(0, viewMore ? 5 : -1).map((val, index) => (
                                <Tr color={`blue.700`} key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{val.s}</Td>
                                    <Td>{parseFloat(val.t).toLocaleString()}</Td>
                                    <Td>{(val.q).toLocaleString()}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </Box>
    )
}

export default TopSectors