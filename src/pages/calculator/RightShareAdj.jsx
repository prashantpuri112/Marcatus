import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack,
    Select,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react';

function RightShareAdj() {
    const [marketPrice, setMarketPrice] = useState('');
    const [rightSharePercent, setRightSharePercent] = useState('');
    const [paidUpValue, setPaidUpValue] = useState('10');
    const [result, setResult] = useState(null);

    const calculateRightShareAdj = () => {
        if (marketPrice === '' || rightSharePercent === '') {
            alert('Please fill in all fields.');
            return;
        }

        const marketPriceValue = parseFloat(marketPrice);
        const rightSharePercentValue = parseFloat(rightSharePercent) / 100;
        const paidUpValueValue = parseInt(paidUpValue);

        const marketPriceAfterRightAdj = (marketPriceValue + (paidUpValueValue * rightSharePercentValue)) / (1 + rightSharePercentValue);

        setResult({
            marketPrice: parseFloat(marketPriceValue).toFixed(2),
            rightSharePercent: parseFloat(rightSharePercentValue * 100).toFixed(2),
            paidUpValue: parseFloat(paidUpValueValue).toFixed(2),
            marketPriceAfterRightAdj: parseFloat(marketPriceAfterRightAdj).toFixed(2),
        });
    };

    return (
        <Container maxW="container.md">
            <VStack spacing={4} pt={8}>
                <Heading as="h1">Right Share Adjustment Calculator
                </Heading>
                <FormControl id="marketPrice" isRequired>
                    <FormLabel>Market Price (Before Book Closure):</FormLabel>
                    <Input
                        type="number"
                        value={marketPrice}
                        onChange={(e) => setMarketPrice(e.target.value)}
                    />
                </FormControl>
                <FormControl id="rightSharePercent" isRequired>
                    <FormLabel>Percentage of Right Share:</FormLabel>
                    <Input
                        type="number"
                        value={rightSharePercent}
                        onChange={(e) => setRightSharePercent(e.target.value)}
                    />
                </FormControl>
                <FormControl id="paidUpValue" isRequired>
                    <FormLabel>Paid-up Value Per Share:</FormLabel>
                    <Select
                        value={paidUpValue}
                        onChange={(e) => setPaidUpValue(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="100">100</option>
                    </Select>
                </FormControl>
                <Button onClick={calculateRightShareAdj} colorScheme="blue">
                    Calculate
                </Button>
                {result && (
                    <Box>
                        <Heading as="h2" size="lg">
                            Details:
                        </Heading>
                        <UnorderedList>
                            <ListItem>
                                Market Price (Before Book Closure): {result.marketPrice}
                            </ListItem>
                            <ListItem>% of Right Share: {result.rightSharePercent}%</ListItem>
                            <ListItem>Paid-up Value Per Share: {result.paidUpValue}</ListItem>
                            <ListItem>Market Price After Right Adjustment: {result.marketPriceAfterRightAdj}</ListItem>
                        </UnorderedList>
                    </Box>
                )}
            </VStack>
        </Container >
    );
}

export default RightShareAdj;

