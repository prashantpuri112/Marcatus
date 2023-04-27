import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';

function BonusShareAdj() {
  const [marketPriceBefore, setMarketPriceBefore] = useState('');
  const [bonusPercentage, setBonusPercentage] = useState('');
  const [marketPriceAfter, setMarketPriceAfter] = useState('');

  const calculatePrice = () => {
    const priceBefore = parseFloat(marketPriceBefore);
    const bonusPercent = parseFloat(bonusPercentage);

    if (isNaN(priceBefore) || isNaN(bonusPercent)) {
      alert('Please enter valid numbers.');
      return;
    }

    const priceAfter = priceBefore / (1 + bonusPercent / 100);
    setMarketPriceAfter(priceAfter.toFixed(2));
  };

  return (
    <Flex direction="column" align="center" justify="center" p={4}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Market Price (Before Book Closure):</FormLabel>
          <Input type="number" value={marketPriceBefore} onChange={(e) => setMarketPriceBefore(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>% of Bonus Share:</FormLabel>
          <Input type="number" value={bonusPercentage} onChange={(e) => setBonusPercentage(e.target.value)} />
        </FormControl>

        <Button colorScheme="teal" onClick={calculatePrice}>Calculate</Button>

        {marketPriceAfter && (
          <Box mt={4}>
            <Text>Market Price (Before Book Closure): {parseFloat(marketPriceBefore).toFixed(2)}</Text>
            <Text>% of Bonus Share: {parseFloat(bonusPercentage).toFixed(2)}%</Text>
            <Text>Market Price after Right Adj: {marketPriceAfter}</Text>
          </Box>
        )}
      </VStack>
    </Flex>
  );
}

export default BonusShareAdj;
