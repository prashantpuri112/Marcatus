import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    VStack,
    UnorderedList,
    ListItem,
    HStack,
    TableContainer,
    Tbody,
    Tr,
    Table,
    Td,
    Text,
    FormErrorMessage,
} from '@chakra-ui/react';

function Dividend() {
    const [shareQuantity, setShareQuantity] = useState('');
    const [bonusDividend, setBonusDividend] = useState('');
    const [cashDividend, setCashDividend] = useState('');
    const [paidUpValue, setPaidUpValue] = useState('100');
    const [dividendDetails, setDividendDetails] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const shareQuantityValue = parseInt(shareQuantity);
        const bonusDividendPercentage = parseFloat(bonusDividend);
        const cashDividendPercentage = parseFloat(cashDividend);
        const paidUpValueValue = parseInt(paidUpValue);

        if (isNaN(shareQuantityValue) || shareQuantityValue <= 0) {
            alert('Invalid Share Quantity input. Please enter a positive number.');
            return;
        }
        if (isNaN(bonusDividendPercentage) && isNaN(cashDividendPercentage)) {
            alert('Please enter either % of Bonus Dividend or % of Cash Dividend');
            return;
        }
        if (isNaN(paidUpValueValue) || (paidUpValueValue !== 10 && paidUpValueValue !== 100)) {
            alert('Invalid Paid-up Value Per Share. Please choose from the given options');
            return;
        }

        const cashAmount = shareQuantityValue * cashDividendPercentage;
        const receivableBonusQuantity = shareQuantityValue * (bonusDividendPercentage / 100);
        const bonusShareTax = receivableBonusQuantity * paidUpValueValue * 0.05;
        const cashAmountTax = cashAmount * 0.05;
        const totalPayableTax = bonusShareTax + cashAmountTax;

        setDividendDetails([
            { label: 'Cash Amount', value: cashAmount },
            { label: 'Bonus Share Tax (5%)', value: bonusShareTax },
            { label: 'Cash Amount Tax (5%)', value: cashAmountTax },
            { label: 'Total Payable Tax', value: totalPayableTax },
            { label: 'Receivable Bonus Quantity', value: receivableBonusQuantity },
        ]);
    };

    const clear = () => {
        setShareQuantity('')
        setBonusDividend('')
        setCashDividend('')
    }

    return (
        <Container maxW="4xl">
            <VStack spacing={4} pt={8} w={'100%'}>
                <Heading me={'auto'} as="h1">Dividend Calculator</Heading>
                <HStack w={'100%'} alignItems={'start'}>
                    <Box w={'100%'} as='form' onSubmit={handleSubmit}>
                        <FormControl id="share-quantity" isRequired isInvalid={shareQuantity === ''}>
                            <FormLabel>Share Quantity:</FormLabel>
                            <Input
                                type="number"
                                value={shareQuantity}
                                onChange={(e) => setShareQuantity(e.target.value)}
                            />
                            <FormErrorMessage>This field is required.</FormErrorMessage>
                        </FormControl>
                        <FormControl id="bonus-dividend" isInvalid={bonusDividend === ''}>
                            <FormLabel>Bonus Dividend (%):</FormLabel>
                            <Input
                                type="number"
                                value={bonusDividend}
                                onChange={(e) => setBonusDividend(e.target.value)}

                            />
                            <FormErrorMessage>This field is required.</FormErrorMessage>
                        </FormControl>
                        <FormControl id="cash-dividend" isInvalid={cashDividend === ''}>
                            <FormLabel>Cash Dividend (%):</FormLabel>
                            <Input
                                type="number"
                                value={cashDividend}
                                onChange={(e) => setCashDividend(e.target.value)}
                            />
                            <FormErrorMessage>This field is required.</FormErrorMessage>
                        </FormControl>
                        <FormControl id="paid-up-value" isRequired>
                            <FormLabel>Paid-up Value Per Share:</FormLabel>
                            <Select
                                value={paidUpValue}
                                onChange={(e) => setPaidUpValue(e.target.value)}
                            >
                                <option value="100">100</option>
                                <option value="10">10</option>
                            </Select>
                        </FormControl>
                        <HStack>
                            <Button onClick={clear} my={4}>
                                Reset
                            </Button>
                            <Button type="submit" my={4} colorScheme="blue">
                                Calculate Dividend
                            </Button>
                        </HStack>
                    </Box>
                    <Box w={'100%'}>
                        <Text size="md" fontWeight={'bold'}>
                            Dividend Details
                        </Text>
                        <TableContainer>
                            <Table size={'sm'} variant='striped'>
                                <Tbody>
                                    {dividendDetails?.map((item) => (
                                        <Tr key={item.label}>
                                            <Td>{item.label}</Td>
                                            <Td>{item.value.toFixed(2)}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </HStack>
            </VStack>
        </Container>
    );
}

export default Dividend;        