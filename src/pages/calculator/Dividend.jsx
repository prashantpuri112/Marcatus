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

  return (
    <Container maxW="container.md">
      <VStack spacing={4} pt={8}>
        <Heading as="h1">Dividend Calculator</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="share-quantity" isRequired>
            <FormLabel>Share Quantity:</FormLabel>
            <Input
              type="number"
              value={shareQuantity}
              onChange={(e) => setShareQuantity(e.target.value)}
            />
          </FormControl>
          <FormControl id="bonus-dividend">
            <FormLabel>Bonus Dividend (%):</FormLabel>
            <Input
              type="number"
              value={bonusDividend}
              onChange={(e) => setBonusDividend(e.target.value)}

            />
          </FormControl>
          <FormControl id="cash-dividend">
            <FormLabel>Cash Dividend (%):</FormLabel>
            <Input
              type="number"
              value={cashDividend}
              onChange={(e) => setCashDividend(e.target.value)}
            />
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
          <Button type="submit" colorScheme="blue">
            Calculate Dividend
          </Button>
        </form>
        <Box>
          <Heading as="h2" size="lg">
            Dividend Details:
          </Heading>
          <UnorderedList>
            {dividendDetails.map((item) => (
              <ListItem key={item.label}>
                {item.label}: {item.value.toFixed(2)}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </VStack>
    </Container>
  );
}

export default Dividend;        