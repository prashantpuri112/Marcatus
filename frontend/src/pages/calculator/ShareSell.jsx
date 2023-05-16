import React, { useState } from 'react';
import { Box, Container, Heading, FormControl, FormLabel, Input, Button, UnorderedList, ListItem, Select } from '@chakra-ui/react';
import { useForm } from "react-hook-form";

const ShareSellCalculator = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onChange' });
    const [result, setResult] = useState();

    const investorType = watch("investorType");

    const calculateBuyAmount = (shareQuantity, purchasePrice) => {
        const totalAmount = shareQuantity * purchasePrice;
        let commission;

        if (totalAmount <= 50000) {
            commission = Math.max(totalAmount * 0.004, 10);
        } else if (totalAmount <= 500000) {
            commission = totalAmount * 0.0037;
        } else if (totalAmount <= 2000000) {
            commission = totalAmount * 0.0034;
        } else if (totalAmount <= 10000000) {
            commission = totalAmount * 0.003;
        } else {
            commission = totalAmount * 0.0027;
        }

        const sebonFee = totalAmount * 0.00015;
        const dpCharge = 25;
        return totalAmount + commission + sebonFee + dpCharge;
    }

    const onSubmit = (data) => {
        const shareQuantity = parseFloat(data.shareQuantity);
        const purchasePrice = parseFloat(data.purchasePrice);
        const sellingPrice = parseFloat(data.sellingPrice);
        const investorType = data.investorType;
        const capitalGainTax = parseFloat(data.capitalGainTax);

        const totalAmount = shareQuantity * sellingPrice;
        let commission;
        if (totalAmount <= 50000) {
            commission = Math.max(totalAmount * 0.004, 10);
        } else if (totalAmount <= 500000) {
            commission = totalAmount * 0.0037;
        } else if (totalAmount <= 2000000) {
            commission = totalAmount * 0.0034;
        } else if (totalAmount <= 10000000) {
            commission = totalAmount * 0.003;
        } else {
            commission = totalAmount * 0.0027;
        }

        const sebonFee = totalAmount * 0.00015;
        const dpCharge = 25;
        const Tbuy = calculateBuyAmount(shareQuantity, purchasePrice);
        const gain = totalAmount - Tbuy - commission - sebonFee - dpCharge;
        const profit = gain - (gain * capitalGainTax);
        const totalReceivableAmount = totalAmount - commission - sebonFee - dpCharge - (gain * capitalGainTax);
        const nepseCommission = commission * 0.2;
        const sebonRegulatoryFee = commission * 0.006;

        setResult({
            investorType: investorType === 'individual' ? 'Individual' : 'Institutional',
            totalAmount,
            commission,
            sebonFee,
            dpCharge,
            totalReceivableAmount,
            capitalGainTax: gain * capitalGainTax,
            profit,
            nepseCommission,
            sebonRegulatoryFee
        });
    }

    return (
        <Container>
            <Heading as="h1" size="xl" mb="8">
                Share Sell Calculator
            </Heading>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.shareQuantity}>
                    <FormLabel>Share Quantity:</FormLabel>
                    <Input type="number" step="0.01" {...register("shareQuantity", { required: true })} />
                </FormControl>
                <FormControl isInvalid={errors.purchasePrice}>
                    <FormLabel>Purchase Price (Rs):</FormLabel>
                    <Input type="number" step="0.01" {...register("purchasePrice", { required: true })} />
                </FormControl>
                <FormControl isInvalid={errors.sellingPrice}>
                    <FormLabel>Selling Price (Rs):</FormLabel>
                    <Input type="number" step="0.01" {...register("sellingPrice", { required: true })} />
                </FormControl>
                <FormControl isInvalid={errors.investorType}>
                    <FormLabel>Investor Type:</FormLabel>
                    <Select {...register("investorType", { required: true })}>
                        <option value="individual">Individual</option>
                        <option value="institutional">Institutional</option>
                    </Select>
                </FormControl>
                <FormControl isInvalid={errors.capitalGainTax}>
                    <FormLabel>Capital Gain Tax:</FormLabel>
                    <Select {...register("capitalGainTax", { required: true })}>
                        {investorType === 'individual' ? (
                            <>
                                <option value="0.05">5%</option>
                                <option value="0.075">7.5%</option>
                            </>
                        ) : (
                            <option value="0.1">10%</option>
                        )}
                    </Select>
                </FormControl>
                <Button mt="4" colorScheme="teal" type="submit">
                    Calculate
                </Button>
            </Box>
            {result && (
                <Box mt="8">
                    <UnorderedList>
                        <ListItem>Investor Type: {result.investorType}</ListItem>
                        <ListItem>Total Amount: {result.totalAmount.toFixed(2)}</ListItem>
                        <ListItem>Commission: {result.commission.toFixed(2)}</ListItem>
                        <ListItem>Sebon Fee: {result.sebonFee.toFixed(2)}</ListItem>
                        <ListItem>DP Charge: {result.dpCharge.toFixed(2)}</ListItem>
                        <ListItem>Total Receivable Amount: {result.totalReceivableAmount.toFixed(2)}</ListItem>
                        <ListItem>Capital Gain Tax ({(result.capitalGainTax * 100).toFixed(2)}%): {result.capitalGainTax.toFixed(2)}</ListItem>
                        <ListItem>Profit/Loss (Rs): {result.profit.toFixed(2)}</ListItem>
                        <ListItem>* Commission Amount includes NEPSE Commission Rs.{result.nepseCommission.toFixed(2)} & SEBON Regularity Fee Rs.{result.sebonRegulatoryFee.toFixed(2)}</ListItem>
                    </UnorderedList>
                </Box>
            )}
        </Container>
    );
};

export default ShareSellCalculator;