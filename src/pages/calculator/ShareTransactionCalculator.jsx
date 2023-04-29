import React, { useState } from 'react';
import { Box, Container, Heading, FormControl, FormLabel, Input, Button, UnorderedList, ListItem, Select } from '@chakra-ui/react';
import { useForm } from "react-hook-form";

const ShareTransactionCalculator = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onChange' });
  const [result, setResult] = useState();

  const investorType = watch("investorType");
  const transactionType = watch("transactionType");

  const calculateAmount = (shareQuantity, price, type) => {
    const totalAmount = shareQuantity * price;
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

    if (type === 'buy') {
      return totalAmount + commission + sebonFee + dpCharge;
    } else { // 'sell'
      return totalAmount - commission - sebonFee - dpCharge;
    }
  }

  const onSubmit = (data) => {
    const shareQuantity = parseFloat(data.shareQuantity);
    const price = parseFloat(data.price);
    const capitalGainTax = parseFloat(data.capitalGainTax);

    if (transactionType === 'buy') {
      const totalPayableAmount = calculateAmount(shareQuantity, price, 'buy');
      const commission = totalPayableAmount - (shareQuantity * price);
      const nepseCommission = commission * 0.2;
      const sebonRegulatoryFee = commission * 0.006;

      setResult({
        transactionType,
        totalPayableAmount,
        costPricePerShare: totalPayableAmount / shareQuantity,
        nepseCommission,
        sebonRegulatoryFee
      });
    } else { // 'sell'
      const sellingPrice = parseFloat(data.sellingPrice);
      const totalBuyAmount = calculateAmount(shareQuantity, price, 'buy');
      const totalAmount = calculateAmount(shareQuantity, sellingPrice, 'sell');
      const commission = totalBuyAmount - totalAmount;
      const gain = totalAmount - totalBuyAmount - commission;
      const profit = gain - (gain * capitalGainTax);
      const totalReceivableAmount = totalAmount - (gain * capitalGainTax);
      const nepseCommission = commission * 0.2;
      const sebonRegulatoryFee = commission * 0.006;

      setResult({
        investorType: investorType === 'individual' ? 'Individual' : 'Institutional',
        totalAmount,
        commission,
        totalReceivableAmount,
        capitalGainTax: gain * capitalGainTax,
        profit,
        nepseCommission,
        sebonRegulatoryFee
      });
    }
  }

  return (
    <Container>
      <Heading as="h1" size="xl" mb="8">
        Share Transaction Calculator
      </Heading>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.transactionType}>
          <FormLabel>Transaction Type:</FormLabel>
          <Select {...register("transactionType", { required: true })}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={errors.shareQuantity}>
          <FormLabel>Share Quantity:</FormLabel>
          <Input type="number" step="0.01" {...register("shareQuantity", { required: true })} />
        </FormControl>
        <FormControl isInvalid={errors.price}>
          <FormLabel>Price (Rs):</FormLabel>
          <Input type="number" step="0.01" {...register("price", { required: true })} />
        </FormControl>
        {transactionType === 'sell' && (
          <>
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
          </>
        )}
        <Button mt="4" colorScheme="teal" type="submit">
          Calculate
        </Button>
      </Box>
      {result && (
        <Box mt="8">
          <UnorderedList>
            <ListItem>Transaction Type: {result.transactionType}</ListItem>
            {result.transactionType === 'buy' ? (
              <>
                <ListItem>Total Payable Amount (Rs): {result.totalPayableAmount.toFixed(2)}</ListItem>
                <ListItem>Cost Price Per Share (Rs): {result.costPricePerShare.toFixed(2)}</ListItem>
              </>
            ) : (
              <>
                <ListItem>Investor Type: {result.investorType}</ListItem>
                <ListItem>Total Amount (Rs): {result.totalAmount.toFixed(2)}</ListItem>
                <ListItem>Commission (Rs): {result.commission.toFixed(2)}</ListItem>
                <ListItem>Total Receivable Amount (Rs): {result.totalReceivableAmount.toFixed(2)}</ListItem>
                <ListItem>Capital Gain Tax (Rs): {result.capitalGainTax.toFixed(2)}</ListItem>
                <ListItem>Profit/Loss (Rs): {result.profit.toFixed(2)}</ListItem>
              </>
            )}
            <ListItem>* Commission Amount includes NEPSE Commission Rs.{result.nepseCommission.toFixed(2)} & SEBON Regularity Fee Rs.{result.sebonRegulatoryFee.toFixed(2)}</ListItem>
          </UnorderedList>
        </Box>
      )}
    </Container>
  );
};

export default ShareTransactionCalculator;

