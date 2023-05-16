import { Box, Button, HStack, Link, Table, TableCaption, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CurrencyExchange = ({ size }) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:8080/api/forex').then((res) => {
            if (size) {
                console.log(size)
                const payload = res.data
                const rates = payload.rates.slice(0, 5)
                payload.rates = rates
                setData(payload)
            } else {
                setData(res.data)
            }
        })
    }, [])

    return (
        data ?
            <Box px={3} py={3}>
                <Text fontWeight={'bold'}>Currency Exchange Rates</Text>
                <VStack
                    width={[`100%`, `100%`, `auto`, `auto`]}
                    paddingTop={`1rem`}
                    maxW={[`350px`, `100%`]}
                >
                    <HStack justifyContent={`flex-start`} width={`100%`}>
                        <Tag colorScheme={`blue`} marginBottom={`1rem`}>
                            {data?.date}
                        </Tag>
                    </HStack>
                    <TableContainer width={`100%`}>
                        <Table size={`sm`} variant={'simple'}>
                            {
                                size &&
                                <TableCaption>
                                    <Link href='/economy/forex'>
                                        <Button variant={'link'}>View More</Button>
                                    </Link>
                                </TableCaption>
                            }
                            <Thead>
                                <Tr color={`blue.600`}>
                                    <Th>SN</Th>
                                    <Th>Currency</Th>
                                    <Th>Unit</Th>
                                    <Th>Buy</Th>
                                    <Th>Sell</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.rates?.map((val, index) => (
                                    <Tr color={`blue.700`} key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{val.currency.name} ({val.currency.iso3})</Td>
                                        <Td>{val.currency.unit}</Td>
                                        <Td>{val.buy}</Td>
                                        <Td>{val.sell}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>
            </Box> :
            <Box py={7}>
                <Text textAlign={'center'}>No data available</Text>
            </Box>
    )
}

export default CurrencyExchange