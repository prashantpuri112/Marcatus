import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    ListItem,
    Select,
    UnorderedList,
    VStack,
    useToast
} from '@chakra-ui/react';

const ShareBuy = () => {
    const [transactionType, setTransactionType] = useState('buy');
    const [shareQuantity, setShareQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [result, setResult] = useState(null);

    const toast = useToast();

    const calculate = () => {
        if (!shareQuantity || !purchasePrice) {
            toast({
                title: "Missing Input",
                description: "Please fill all fields",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

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

    return (
        <Container>
            <Heading as="h1" mb={4}>Share Buy and Sell Calculator</Heading>
            <VStack as="form" spacing={4}>
                <FormControl id="transactionType">
                    <FormLabel>Transaction Type:</FormLabel>
                    <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </Select>
                </FormControl>
                <FormControl id="shareQuantity">
                    <FormLabel>Share Quantity:</FormLabel>
                    <Input type="number" value={shareQuantity} onChange={(e) => setShareQuantity(e.target.value)} required />
                </FormControl>
                <FormControl id="purchasePrice">
                    <FormLabel>Purchase Price (Rs):</FormLabel>
                    <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} required />
                </FormControl>
                <Button colorScheme="blue" onClick={calculate}>Calculate</Button>
            </VStack>
            {result && (
                <Box mt={4}>
                    <Heading as="h2" mb={2}>Results:</Heading>
                    <UnorderedList>
                        <ListItem > Total Amount (Rs): {result.totalAmount.toFixed(2)}</ListItem>
                        <ListItem>Commission (Rs): {result.comission.toFixed(2)}</ListItem>
                        <ListItem>SEBON Fee (Rs): {result.sebonFee.toFixed(2)}</ListItem>
                        <ListItem>DP Charge (Rs): {result.dpCharge.toFixed(2)}</ListItem>
                        <ListItem>Total Payable Amount (Rs): {result.totalPayableAmount.toFixed(2)}</ListItem>
                        <ListItem>Cost Price Per Share (Rs): {result.costPricePerShare.toFixed(2)}</ListItem>
                        <ListItem>* Commission Amount includes NEPSE Commission Rs {result.nepseComission.toFixed(2)} & SEBON Regulatory Fee Rs {result.sebonRegulatoryFee.toFixed(2)}</ListItem>
                    </UnorderedList>
                </Box>
            )}
        </Container>
    );
};

export default ShareBuy;
