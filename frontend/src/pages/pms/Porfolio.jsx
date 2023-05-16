import {
    Box, Container, Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Stack,
    Radio,
    Select,
    Link,
    IconButton,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiTrash } from 'react-icons/fi'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { calculateBuy, calculateProfit, calculateSell } from '../../utils/calculateBuy'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Porfolio = () => {
    const { user, loading } = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [stored, setStored] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const [individualPortfolio, setIndividualPortfolio] = useState()

    const [portfolioCompany, setportfolioCompany] = useState('all')

    const config = {
        headers:
            { "Authorization": `Bearer ${localStorage.getItem('stock_client_token')}` }
    }

    const [portfolioCompanies, setPortfolioCompanies] = useState()

    const calculateAll = async () => {
        const url = portfolioCompany === 'all' ? 'http://localhost:8080/api/individual-portfolio' : `http://localhost:8080/api/individual-portfolio?company=${portfolioCompany}`
        const res = await axios.get(url, config)
        console.log(res)
        setIndividualPortfolio(res.data)
    }

    useEffect(() => {
        calculateAll()
    }, [stored, deleted, portfolioCompany])

    const [myPortfolio, setMyPortfolio] = useState()

    const getPorfolios = () => {
        const url = 'http://localhost:8080/api/my-portfolio'
        axios.get(url, config)
            .then(res => {
                setMyPortfolio(res.data.portfolios)
                setPortfolioCompanies(res.data.portfolioCompanies)
            })
    }

    useEffect(() => {
        getPorfolios()
    }, [stored, deleted])

    const [sector, setSector] = useState('Commercial Bank')
    const [companies, setCompanies] = useState([])
    const [company, setCompany] = useState()
    const [noOfShares, setNoOfShares] = useState('')
    const [buyingPrice, setBuyingPrice] = useState('')
    const [buyDate, setBuyDate] = useState('')
    const [buyingType, setBuyingType] = useState('')

    const handleDateChange = (date) => {
        setBuyDate(date);
    };

    const currentDate = new Date()

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
                    setCompanies(res.data.companies)
                    setCompany(`${res.data.companies[0].symbol} ${res.data.companies[0].company_name}`)
                    setLoadingData(false)
                })
        } catch (err) {
            console.log(err)
            setLoadingData(false)
        }
    }

    useEffect(() => {
        getData(sector, 1)
    }, [sector, deleted, stored])

    const deletePortfolio = async (portId) => {
        console.log(portId)
        try {
            const res = await axios.delete(`http://localhost:8080/api/delete-portfolio?portId=${portId}`, config)
            toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
            setDeleted(!deleted)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.error, { position: toast.POSITION.TOP_RIGHT })
        }

    }

    const handleSubmit = async () => {

        try {
            const data = {
                sector: sector,
                company: company,
                no_of_shares: noOfShares,
                buying_price: buyingPrice,
                buy_date: buyDate,
                buying_type: buyingType
            }

            const res = await axios.post('http://localhost:8080/api/add-portfolio', data, config)
            toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
            onClose()
            setStored(!stored)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.error, { position: toast.POSITION.TOP_RIGHT })
        }

    }

    if (!loading) {
        if (!user) {
            return (
                <Box py={8} pb={10} maxW='6xl' mx='auto'>
                    <Text>Unauthorized Access</Text>
                    <Button><Link href='/login'>Click Here To Login</Link></Button>
                </Box>
            )
        }
    }

    return (
        <Box width={'100%'} backgroundColor={'gray.100'} p={'1rem'}>
            <Container px={8} maxW={'8xl'} mx={'auto'}>
                <Text fontSize={'sm'} fontWeight={'bold'}>My Portfolio</Text>

                <Box maxW={'50%'} bg={'white'} px={4} py={3} rounded={'md'} my={5} fontSize={'sm'}>
                    <Box my={3}>
                        <FormLabel fontSize={'xs'}>Companies</FormLabel>
                        <Select bg={'white'} onChange={(e) => setportfolioCompany(e.target.value)}>
                            <option value="" disabled>Select Company</option>
                            <option value="all" selected>All</option>
                            {
                                portfolioCompanies?.map((company, ind) => {
                                    return (
                                        <option key={ind} value={company.company}>{company.company}</option>
                                    )
                                })
                            }
                        </Select>
                    </Box>
                    <Box px={2}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text my={3}>Total Shares:</Text>
                            <Text fontWeight={'bold'}>{individualPortfolio?.totalShare}</Text>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text my={3}>Total Investments:</Text>
                            <Text fontWeight={'bold'} my={3}>{individualPortfolio?.totalInvestment}</Text>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text my={3}>Total Worth:</Text>
                            <Text fontWeight={'bold'} my={3}>{individualPortfolio?.totalWorth}</Text>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text my={3}>Profit/Loss:</Text>
                            <Text fontWeight={'bold'} my={3} textColor={individualPortfolio?.totalProfit > 0 ? 'green' : "red"}>{individualPortfolio?.totalProfit}</Text>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text my={3}>Net Profit/Loss:</Text>
                            <Text fontWeight={'bold'} my={3} textColor={individualPortfolio?.totalNetProfi > 0 ? 'green' : 'red'}>{individualPortfolio?.totalNetProfit}</Text>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text my={3}>Net Worth:</Text>
                            <Text fontWeight={'bold'} my={3}>{individualPortfolio?.totalNetWorth}</Text>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text my={3}>Today Profit/Loss:</Text>
                            <Text fontWeight={'bold'} my={3} textColor={individualPortfolio?.totalTodayProfitLoss > 0 ? 'green' : 'red'}>{individualPortfolio?.totalTodayProfitLoss}</Text>
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <Box display={'flex'} my={3}>
                        <Button ms={'auto'} colorScheme='blue' onClick={onOpen}><FiPlus /> Add New</Button>
                    </Box>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontSize={'sm'}>Add New Portfolio</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box my={3}>
                                    <FormLabel fontSize={'xs'}>Sector</FormLabel>
                                    <Select bg={'white'} defaultValue={'Commercial Bank'} onChange={(e) => setSector(e.target.value)}>
                                        <option value="" disabled>Select Sector</option>
                                        {
                                            sectors.map((sector, ind) => {
                                                return (
                                                    <option key={ind} value={sector}>{sector}</option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Box>
                                {
                                    companies.length > 0 &&
                                    <FormControl my={3}>
                                        <FormLabel fontSize={'xs'}>Company</FormLabel>
                                        <Select bg={'white'} defaultValue={company} onChange={(e) => setCompany(e.target.value)}>
                                            <option value="" disabled>Select Company</option>
                                            {
                                                companies?.map((company, ind) => {
                                                    return (
                                                        <option key={ind} value={`${company.symbol} ${company.company_name}`}>{company.company_name} ({company.symbol})</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                }
                                <FormControl my={3}>
                                    <FormLabel fontSize={'xs'}>No. of shares</FormLabel>
                                    <Input onChange={(e) => setNoOfShares(e.target.value)} type='number' fontSize={'sm'} placeholder='Enter number of shares' />
                                </FormControl>
                                <FormControl my={3}>
                                    <FormLabel fontSize={'xs'}>Buying Price</FormLabel>
                                    <Input onChange={(e) => setBuyingPrice(e.target.value)} type='number' fontSize={'sm'} placeholder='Enter buying price' />
                                </FormControl>
                                <FormControl my={3}>
                                    <FormLabel fontSize={'xs'}>Buy Date</FormLabel>
                                    {/* <Input onChange={(e) => setBuyDate(e.target.value)} type='date' fontSize={'sm'} max={'today'} placeholder='Enter buying price' /> */}
                                    <DatePicker
                                        selected={buyDate}
                                        onChange={handleDateChange}
                                        maxDate={new Date()}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize={'xs'}>Buying Type</FormLabel>
                                    <RadioGroup onChange={(val) => setBuyingType(val)} value={buyingType}>
                                        <Stack direction='row'>
                                            <Radio fontSize={'sm'} value='primary'>Primary</Radio>
                                            <Radio fontSize={'sm'} value='secondary'>Secondary</Radio>
                                            <Radio fontSize={'sm'} value='bonus'>Bonus</Radio>
                                            <Radio fontSize={'sm'} value='right'>Right</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>

                            </ModalBody>
                            <ModalFooter>
                                <Button size={'sm'} colorScheme='blue' onClick={handleSubmit}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <TableContainer bg={'white'} rounded={'md'} py={5}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Symbol</Th>
                                    <Th>Type</Th>
                                    <Th>Holding</Th>
                                    <Th>Share</Th>
                                    <Th>Buying</Th>
                                    <Th>LTP</Th>
                                    <Th>Diff</Th>
                                    <Th>Investment</Th>
                                    <Th>Profit</Th>
                                    <Th>Net Worth</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    myPortfolio?.map((val, ind) => {
                                        return (
                                            <Tr key={ind}>
                                                <Td>{val.s}</Td>
                                                <Td>{val.item.buying_type.toUpperCase()}</Td>
                                                <Td>{parseInt(Math.ceil(Math.abs(new Date(currentDate) - new Date(val.item.buy_date))) / (1000 * 60 * 60 * 24)) > 365 ? 'LT' : 'ST'}</Td>
                                                <Td>{val.item.no_of_shares}</Td>
                                                <Td>{parseFloat(val.item.buying_price.toFixed(2)).toLocaleString()}</Td>
                                                <Td>{parseFloat(val.lp.toFixed(2)).toLocaleString()}</Td>
                                                <Td>{parseFloat(val.c.toFixed(2)).toLocaleString()}</Td>
                                                <Td>
                                                    {
                                                        val.item.buying_type === 'secondary' ?
                                                            parseFloat(calculateBuy(val.item.no_of_shares, val.item.buying_price)).toLocaleString()
                                                            :
                                                            val.item.buying_type === 'primary' || val.item.buying_type === 'right' ?
                                                                parseFloat(val.item.no_of_shares * val.item.buying_price).toLocaleString()
                                                                :
                                                                0
                                                    }
                                                </Td>
                                                <Td>{parseFloat(calculateProfit(val.item.no_of_shares, val.item.buying_price, val.lp, val.item.buying_type)).toLocaleString()}</Td>
                                                <Td>{parseFloat(calculateSell(val.item.no_of_shares, val.item.buying_price, val.lp, parseInt(Math.ceil(Math.abs(new Date(currentDate) - new Date(val.item.buy_date))) / (1000 * 60 * 60 * 24)) > 365 ? 0.05 : 0.075)).toLocaleString()}</Td>
                                                <Td>
                                                    <IconButton onClick={() => { deletePortfolio(val.item._id) }} colorScheme='red' icon={<FiTrash />}></IconButton>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container >
        </Box >
    )

}

export default Porfolio