import React, { useState } from 'react';
import {
  Text,
  HStack,
  Tag,
  Table,
  Tbody,
  Tr,
  Td,
  TableCaption,
  TableContainer,
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
  FormErrorMessage,
} from '@chakra-ui/react';

function RightShareAdj() {
  const [marketPrice, setMarketPrice] = useState('');
  const [rightSharePercent, setRightSharePercent] = useState('');
  const [paidUpValue, setPaidUpValue] = useState('100');
  const [result, setResult] = useState(null);

  const calculateRightShareAdj = () => {
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

  const clear = ()=> {
    setMarketPrice('')
    setRightSharePercent('')
    setResult('')
  }

  return (
    <Container maxW={'6xl'}>
      <Heading as="h1">Right Share Adjustment Calculator
      </Heading>
      <HStack gap={'1rem'} alignItems={'flex-start'} mt={'1rem'}>
        <VStack spacing={4} width={'100%'}>
          <FormControl id="marketPrice" isRequired isInvalid={marketPrice === ''}>
            <FormLabel>Market Price (Before Book Closure):</FormLabel>
            <Input
              type="number"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl id="rightSharePercent" isRequired isInvalid={rightSharePercent === ''}>
            <FormLabel>Percentage of Right Share:</FormLabel>
            <Input
              type="number"
              value={rightSharePercent}
              onChange={(e) => setRightSharePercent(e.target.value)}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl id="paidUpValue" isRequired>
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
            <Button onClick={clear}>
              Clear
            </Button>
            <Button onClick={calculateRightShareAdj} colorScheme="blue">
              Calculate
            </Button>
          </HStack>


        </VStack>
        <Box width={'100%'}>
          <Text fontSize="xl" fontWeight="bold" mb="4">
            Details:
          </Text>
          <TableContainer size={'sm'}>

            <Table size={'sm'} variant='striped'>

              <Tbody>

                <Tr>
                  <Td>Market Price (Before Book Closure): </Td>
                  <Td>
                    {result ? result.marketPrice : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    % of Right Share:
                  </Td>
                  <Td>
                    {result ? result.rightSharePercent : '-'}%
                  </Td>

                </Tr>
                <Tr>
                  <Td>
                    Paid-up Value Per Share:
                  </Td>
                  <Td>
                    {result ? result.paidUpValue : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    Market Price After Right Adjustment:
                  </Td>
                  <Td>
                    {result ? result.marketPriceAfterRightAdj : '-'}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </HStack>
    </Container >
  );
}

export default RightShareAdj;

