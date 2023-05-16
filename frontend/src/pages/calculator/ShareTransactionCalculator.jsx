import { Box, Button, Tag, FormControl, FormLabel, HStack, Heading, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Tr, VStack, useToast, FormErrorMessage, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

const NewShareTransactions = () => {

    // Share Buy
    const [transactionType, setTransactionType] = useState('buy');
    const [shareQuantity, setShareQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');

    const [result, setResult] = useState(null);

    const toast = useToast();

    const calculate = () => {

        const totalAmount = shareQuantity * purchasePrice;
        let comission = 0;

        if (totalAmount <= 50000) {
            comission = Math.max(10, totalAmount * 0.004);
        } else if (totalAmount <= 500000) {
            comission = totalAmount * 0.0037;
        } else if (totalAmount <= 2000000) {
            comission = totalAmount * 0.0034;
        } else if (totalAmount <= 10000000) {
            comission = totalAmount * 0.003;
        } else {
            comission = totalAmount * 0.0027;
        }

        const sebonFee = totalAmount * 0.00015;
        const dpCharge = 25;
        const totalPayableAmount = totalAmount + comission + sebonFee + dpCharge;
        const nepseComission = comission * 0.2;
        const sebonRegulatoryFee = comission * 0.006;
        const costPricePerShare = totalPayableAmount / shareQuantity;

        setResult({
            totalAmount,
            comission,
            sebonFee,
            dpCharge,
            totalPayableAmount,
            costPricePerShare,
            nepseComission,
            sebonRegulatoryFee
        });
    };

    const [sellingPrice, setSellingPrice] = useState('');
    const [investorType, setInvestorType] = useState("individual");
    const [capitalGainTax, setCapitalGainTax] = useState(0.05);
    const [capitalGainTaxOptions, setCapitalGainTaxOptions] = useState([{ value: 0.05, label: "5%" }]);
    const [output, setOutput] = useState("");

    useEffect(() => {
        updateCapitalGainTaxOptions();
    }, [investorType]);

    const updateCapitalGainTaxOptions = () => {
        if (investorType === "individual") {
            setCapitalGainTaxOptions([
                { value: 0.05, label: "5%" },
                { value: 0.075, label: "7.5%" }
            ]);
        } else {
            setCapitalGainTaxOptions([{ value: 0.1, label: "10%" }]);
        }
    };

    const calculateBuyAmount = () => {
        const totalAmount = shareQuantity * purchasePrice;
        const commission = calculateCommission(totalAmount);
        const sebonFee = totalAmount * 0.00015;
        const dpCharge = 25;
        return totalAmount + commission + sebonFee + dpCharge;
    };

    const calculateCommission = (totalAmount) => {
        if (totalAmount <= 50000) {
            return Math.max(totalAmount * 0.004, 10);
        } else if (totalAmount <= 500000) {
            return totalAmount * 0.0037;
        } else if (totalAmount <= 2000000) {
            return totalAmount * 0.0034;
        } else if (totalAmount <= 10000000) {
            return totalAmount * 0.003;
        } else {
            return totalAmount * 0.0027;
        }
    };

    const calculateSell = () => {
        const totalAmount = shareQuantity * sellingPrice;
        const commission = calculateCommission(totalAmount);
        const sebonFee = totalAmount * 0.00015;
        const dpCharge = 25;

        const Tbuy = calculateBuyAmount();
        const gain = totalAmount - Tbuy - commission - sebonFee - dpCharge;

        let profit;
        let tax;
        console.log(Tbuy > totalAmount)
        if (Tbuy > totalAmount) {
            profit = gain;
            tax = 0;
        } else {
            profit = gain - (gain * capitalGainTax);
            tax = gain * capitalGainTax;
        }
        const totalReceivableAmount = totalAmount - commission - sebonFee - dpCharge - tax;
        const nepseCommission = commission * 0.2;
        const sebonRegulatoryFee = commission * 0.006;

        setResult({
            investorType: investorType === 'individual' ? 'Individual' : 'Institutional',
            totalAmount,
            commission,
            sebonFee,
            dpCharge,
            totalReceivableAmount,
            capitalGainTax: tax,
            profit,
            nepseCommission,
            sebonRegulatoryFee
        });
    };

    const clear = () => {
        setPurchasePrice('')
        setShareQuantity('')
        setSellingPrice('')
        setResult('')
    }

    return (
        <Box p={'1rem'} maxWidth={'6xl'} mx={'auto'}>
            <Heading as="h1" size="xl" mb="8">
                Share Transaction Calculator
            </Heading>
            <HStack alignItems={'start'}>
                {
                    transactionType === 'buy' ?
                        <VStack width={'100%'} as="form" spacing={4}>
                            <FormControl id="transactionType">
                                <FormLabel>Transaction Type:</FormLabel>
                                <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                                    <option value="buy">Buy</option>
                                    <option value="sell">Sell</option>
                                </Select>
                            </FormControl>
                            <FormControl id="shareQuantity" isInvalid={shareQuantity === ''}>
                                <FormLabel>Share Quantity:</FormLabel>
                                <Input type="number" value={shareQuantity} onChange={(e) => setShareQuantity(e.target.value)} required />
                                <FormErrorMessage>This field is required.</FormErrorMessage>
                            </FormControl>
                            <FormControl id="purchasePrice" isInvalid={purchasePrice === ''}>
                                <FormLabel>Purchase Price (Rs):</FormLabel>
                                <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} required />
                                <FormErrorMessage>This field is required.</FormErrorMessage>
                            </FormControl>
                            <HStack my={4}>
                                <Button onClick={() => {
                                    clear()
                                }}>
                                    Clear
                                </Button>
                                <Button colorScheme="blue" onClick={calculate}>Calculate</Button>
                            </HStack>
                        </VStack> :
                        <Box w="100%" m="auto">
                            <FormControl id="transactionType">
                                <FormLabel>Transaction Type:</FormLabel>
                                <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                                    <option value="buy">Buy</option>
                                    <option value="sell">Sell</option>
                                </Select>
                            </FormControl>
                            <Box mb="5">
                                <FormControl isInvalid={shareQuantity === ''}>
                                    <Text mb="2">Share Quantity:</Text>
                                    <Input type="number" value={shareQuantity} onChange={(e) => setShareQuantity(parseInt(e.target.value))} />
                                </FormControl>
                            </Box>
                            <Box mb="5">
                                <FormControl isInvalid={purchasePrice === ''}>
                                    <Text mb="2">Purchase Price (Rs):</Text>
                                    <Input type="number" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(parseFloat(e.target.value))} />
                                </FormControl>
                            </Box>
                            <Box mb="5">
                                <FormControl isInvalid={sellingPrice === ''}>
                                    <Text mb="2">Selling Price (Rs):</Text>
                                    <Input type="number" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(parseFloat(e.target.value))} />
                                </FormControl>
                            </Box>
                            <Box mb="5">
                                <Text mb="2">Investor Type:</Text>
                                <Select onChange={(e) => setInvestorType(e.target.value)}>
                                    <option value="individual">Individual</option>
                                    <option value="institutional">Institutional</option>
                                </Select>
                            </Box>
                            <Box mb="5">
                                <Text mb="2">Capital Gain Tax:</Text>
                                <Select onChange={(e) => setCapitalGainTax(parseFloat(e.target.value))}>
                                    {capitalGainTaxOptions.map((option, index) => (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    ))}
                                </Select>
                            </Box>
                            <HStack>
                                <Button onClick={() => {
                                    clear()
                                }}>
                                    Clear
                                </Button>
                                <Button colorScheme="blue" onClick={calculateSell}>
                                    Calculate
                                </Button>
                            </HStack>
                        </Box>
                }
                <Box>
                    <Text size="md" fontWeight={'bold'}>
                        Transaction Details
                    </Text>
                    <TableContainer width={'100%'} size={'sm'}>

                        <Table size={'sm'} variant='striped'>
                            <TableCaption>
                                * Commission Amount includes NEPSE Commission Rs.{result ? result?.nepseCommission?.toFixed(2) : '-'} & SEBON Regularity Fee Rs.{result ? result.sebonRegulatoryFee?.toFixed(2) : '-'}
                            </TableCaption>

                            {transactionType === 'sell' ? (
                                <Tbody>

                                    <Tr>
                                        <Td>Transaction Type</Td>
                                        <Td><Tag colorScheme={'green'}>{transactionType}</Tag></Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Investor Type:</Td>
                                        <Td>{result ? result?.investorType : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Total Amount (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.totalAmount?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Commission (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.commission?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Sebon Fee (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.sebonFee?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>DP Charge (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.dpCharge?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Total Receivable Amount (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.totalReceivableAmount?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Capital Gain Tax (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.capitalGainTax?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Profit/Loss (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.profit?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                </Tbody>

                            ) : (
                                <Tbody>
                                    <Tr>
                                        <Td>Transaction Type</Td>
                                        <Td><Tag colorScheme={'green'}>{transactionType}</Tag></Td>
                                    </Tr>

                                    <Tr>
                                        <Td>Total Amount (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.totalAmount?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>

                                    <Tr>
                                        <Td>* Commision</Td>
                                        <Td>{result ? parseFloat(result?.comission?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Seabon Fee</Td>
                                        <Td>{result ? parseFloat(result?.sebonFee?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>DP Charge</Td>
                                        <Td>{result ? parseFloat(result?.dpCharge?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Price Per Share</Td>
                                        <Td>{result ? parseFloat(result?.costPricePerShare?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Total Payable Amount (Rs)</Td>
                                        <Td>{result ? parseFloat(result?.totalPayableAmount?.toFixed(2)).toLocaleString() : '-'}</Td>
                                    </Tr>
                                </Tbody>
                            )}
                        </Table>
                    </TableContainer>
                </Box>
            </HStack>
        </Box>
    )
}

export default NewShareTransactions