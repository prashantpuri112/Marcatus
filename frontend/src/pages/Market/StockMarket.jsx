import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, FormControl, FormLabel, HStack, Link, Select, Table, TableCaption, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
const StockMarket = () => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [sector, setSector] = useState('Commercial Bank')

    const sectors = [
        'Commercial Bank',
        'Corporate Debentures',
        'Development Bank',
        'Finance',
        'Hotel & Tourism',
        'Hydropower',
        'Investment',
        'Life Insurance',
        'Manufacturing and Products',
        'Microfinance',
        'Mutual Fund',
        'Non-Life Insurance',
        'Others',
        'Trading'
    ]

    const getData = async (sector, page) => {
        try {
            axios.get(`http://localhost:8080/api/stock-data?sector=${sector}&page=${page}`)
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData(sector, 1)
    }, [sector])

    return (
        <Box width={'100%'} bg={'gray.100'} py={8}>
            <Box maxW={'6xl'} mx={'auto'}>
                <Text px={1} fontWeight={'bold'}>Stock Market</Text>
                <Box display={'flex'} alignItems={'center'}>
                    <Box my={3}>
                        <Select placeholder='Select option' bg={'white'} defaultValue={'Commercial Bank'} onChange={(e) => setSector(e.target.value)}>
                            {
                                sectors.map((sector, ind) => {
                                    return (
                                        <option key={ind} value={sector}>{sector}</option>
                                    )
                                })
                            }
                        </Select>
                    </Box>
                    <Box ms={'auto'}>
                        <HStack>
                            <Button onClick={() => getData(sector, data?.prevPage)} bg='white' size={'sm'}><FiChevronLeft /></Button>
                            <Button onClick={() => getData(sector, data?.nextPage)} bg='white' size={'sm'}><FiChevronRight /></Button>
                        </HStack>
                    </Box>
                </Box>
                <TableContainer width={`100%`} bg={'white'} border={'1px'} borderColor={'gray.300'} rounded={'md'}>
                    <Table size={`sm`} variant={'simple'}>
                        <Thead>
                            <Tr color={`blue.600`}>
                                <Th py={4}>SN</Th>
                                <Th py={4}>Symbol</Th>
                                <Th py={4}>Listed Share</Th>
                                <Th py={4}>Paid-up</Th>
                                <Th py={4}>Total Paid Up Capital</Th>
                                <Th py={4}>Date of Operation</Th>
                                <Th py={4}>EPS</Th>
                                <Th py={4}>PE Ratio</Th>
                                <Th py={4} isNumeric>Book Value</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.stocks?.map((val, index) => (
                                <Tr color={`blue.700`} key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{val.symbol ? val.symbol : '-'}</Td>
                                    <Td>{val.listed_share ? val.listed_share : '-'}</Td>
                                    <Td>{val.paid_up ? val.paid_up : '-'}</Td>
                                    <Td>{val.total_paid_up_capital ? val.total_paid_up_capital : '-'}</Td>
                                    <Td>{val.date_of_operation ? new Date(val.date_of_operation).toLocaleDateString() : '-'}</Td>
                                    <Td>{val.eps ? val.eps : '-'}</Td>
                                    <Td>{val.pe_ratio ? val.pe_ratio : '-'}</Td>
                                    <Td isNumeric>{val.book_value ? val.book_value : '-'}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box >
        </Box>
    )
}

export default StockMarket