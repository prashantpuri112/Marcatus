import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, FormControl, FormLabel, HStack, Link, Select, Table, TableCaption, TableContainer, Tag, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { toast } from 'react-toastify'

const StockComparison = () => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [sector, setSector] = useState('Commercial Bank')
  const [companyOne, setCompanyOne] = useState()
  const [companyTwo, setCompanyTwo] = useState()
  const [showTable, setShowTable] = useState(false)

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


  const compare = () => {
    if (!companyOne || !companyTwo) { toast.error('Please choose two companies to compare', { position: toast.POSITION.TOP_RIGHT }) }
    else { setShowTable(true) }
  }

  const getCompanyOneDetails = (company) => {
    console.log(company)
    const companies = data?.companies
    const companyDetails = companies.find(obj => obj.company_name === company)
    setCompanyOne(companyDetails)
  }
  const getCompanyTwoDetails = (company) => {
    console.log(company)
    const companies = data?.companies
    const companyDetails = companies.find(obj => obj.company_name === company)
    setCompanyTwo(companyDetails)
  }

  useEffect(() => {
    getData(sector, 1)
  }, [sector])

  return (
    <Box width={'100%'} bg={'gray.100'} py={8}>
      <Box maxW={'6xl'} mx={'auto'}>
        <Text px={1} fontWeight={'bold'}>Stock Comparison</Text>
        <Text px={1} fontSize={'xs'}>Compare two companies with their individual assets</Text>
        <Box mt={6} mb={5}>
          <Box display={'flex'}>
            <Box mt={3}>
              <Select placeholder='Select Sector' bg={'white'} defaultValue={'Commercial Bank'} onChange={(e) => setSector(e.target.value)}>
                {
                  sectors.map((sector, ind) => {
                    return (
                      <option key={ind} value={sector}>{sector}</option>
                    )
                  })
                }
              </Select>
            </Box>
          </Box>
          <Box display={'flex'} gap={'0.5rem'} flexWrap={'wrap'} alignItems={'center'}>
            <Box my={3}>
              <Select placeholder='Select Company' bg={'white'} defaultValue={'Commercial Bank'} onChange={(e) => getCompanyOneDetails(e.target.value)}>
                {
                  data?.companies.map((company, ind) => {
                    return (
                      <option key={ind} value={company.company_name}>{company.company_name} ({company.symbol})</option>
                    )
                  })
                }
              </Select>
            </Box>
            <Box my={3}>
              <Select placeholder='Select Company' bg={'white'} defaultValue={'Commercial Bank'} onChange={(e) => getCompanyTwoDetails(e.target.value)}>
                {
                  data?.companies.map((company, ind) => {
                    return (
                      <option key={ind} value={company.company_name}>{company.company_name} ({company.symbol})</option>
                    )
                  })
                }
              </Select>
            </Box>
          </Box>
          <Button colorScheme='blue' onClick={compare}>Compare</Button>
          {/* <Box display={'flex'} gap={'1rem'}>
            {
              companyOne ?
                <Box bg={'white'} w={'100%'} px={5} py={5} rounded={'md'}>
                  <Box my={3}>
                    <Text fontWeight={'bold'}>{companyOne.company_name}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Symbol: {companyOne.symbol}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Listed Share: {companyOne.listed_share}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Paid-up: {companyOne.paid_up}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Total Paid Up Capital: {companyOne.total_paid_up_capital}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Market Capitalization: {companyOne.market_capitalization}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Date of Operation: {new Date(companyOne.date_of_operation).toLocaleDateString()}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>LTP: {companyOne.ltp}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>As Of: {new Date(companyOne.as_of).toLocaleDateString()}</Text>
                  </Box>
                </Box>
                :
                <Box bg={'white'} w={'100%'} px={5} py={5} rounded={'md'}>
                  <Text fontSize={'xs'} color={'gray.500'}>Choose A Company</Text>
                </Box>
            }
            {
              companyTwo ?
                <Box bg={'white'} w={'100%'} px={5} py={5} rounded={'md'}>
                  <Box my={3}>
                    <Text fontWeight={'bold'}>{companyTwo.company_name}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Symbol: {companyTwo.symbol}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Listed Share: {companyTwo.listed_share}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Paid-up: {companyTwo.paid_up}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Total Paid Up Capital: {companyTwo.total_paid_up_capital}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Market Capitalization: {companyTwo.market_capitalization}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>Date of Operation: {new Date(companyTwo.date_of_operation).toLocaleDateString()}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>LTP: {companyTwo.ltp}</Text>
                  </Box>
                  <Box my={3}>
                    <Text>As Of: {new Date(companyTwo.as_of).toLocaleDateString()}</Text>
                  </Box>
                </Box> :
                <Box bg={'white'} w={'100%'} px={5} py={5} rounded={'md'}>
                  <Text fontSize={'xs'} color={'gray.500'}>Choose A Company</Text>
                </Box>
            }
          </Box> */}
          {
            showTable &&
            <TableContainer my={8} bg={'white'} border={'1px'} borderColor={'blackAlpha.300'} colorScheme='gray' rounded={'md'}>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th bg={'blue.500'} textColor={'white'}>Particlars</Th>
                    <Th bg={'blue.500'} textColor={'white'}>{companyOne?.company_name} ({companyOne.symbol})</Th>
                    <Th bg={'blue.500'} textColor={'white'}>{companyTwo?.company_name} ({companyTwo.symbol})</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Listed Share</Td>
                    <Td>{companyOne.listed_share}</Td>
                    <Td>{companyTwo.listed_share}</Td>
                  </Tr>
                  <Tr>
                    <Td>Paid-up</Td>
                    <Td>{companyOne.paid_up ? companyOne.paid_up : '-'}</Td>
                    <Td>{companyTwo.paid_up ? companyTwo.paid_up : '-'}</Td>
                  </Tr>
                  <Tr>
                    <Td>Total Paid Up Capital</Td>
                    <Td>{companyOne.total_paid_up_capital ? companyOne.total_paid_up_capital : '-'}</Td>
                    <Td>{companyTwo.total_paid_up_capital ? companyTwo.total_paid_up_capital : '-'}</Td>
                  </Tr>
                  <Tr>
                    <Td>EPS</Td>
                    <Td>{companyOne.eps ? companyOne.eps : '-'}</Td>
                    <Td>{companyTwo.eps ? companyTwo.eps : '-'}</Td>
                  </Tr>
                  <Tr>
                    <Td>Date of Operation</Td>
                    <Td>{new Date(companyOne.date_of_operation).toLocaleDateString()}</Td>
                    <Td>{new Date(companyTwo.date_of_operation).toLocaleDateString()}</Td>
                  </Tr>
                  <Tr>
                    <Td>PE Ratio</Td>
                    <Td>{companyOne.pe_ratio ? companyOne.pe_ratio : '-'}</Td>
                    <Td>{companyTwo.pe_ratio ? companyTwo.pe_ratio : '-'}</Td>
                  </Tr>
                  <Tr>
                    <Td>Book Value</Td>
                    <Td>{companyOne.book_value ? companyOne.book_value : '-'}</Td>
                    <Td>{companyTwo.book_value ? companyTwo.book_value : '-'}</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>

                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          }
        </Box>
      </Box >
    </Box>
  )
}

export default StockComparison