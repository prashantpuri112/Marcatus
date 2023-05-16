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
    UnorderedList,
    ListItem,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Tr,
    Td,
    Text,
    FormErrorMessage,
} from '@chakra-ui/react';

function BonusShareAdj() {
    const [marketPriceBefore, setMarketPriceBefore] = useState('');
    const [bonusPercentage, setBonusPercentage] = useState('');
    const [result, setResult] = useState(null);

    const calculatePrice = () => {
        const marketPriceBeforeValue = parseFloat(marketPriceBefore);
        const bonusPercentageValue = parseFloat(bonusPercentage);

        if (isNaN(marketPriceBeforeValue) || isNaN(bonusPercentageValue)) {
            alert('Please enter valid input values.');
            return;
        }

        const marketPriceAfter = marketPriceBeforeValue / (1 + (bonusPercentageValue / 100));

        setResult({
            userInputMarketPrice: marketPriceBeforeValue.toFixed(2),
            userInputBonusPercentage: bonusPercentageValue.toFixed(2),
            marketPriceAfterAdjustment: marketPriceAfter.toFixed(2),
        });
    };

    const clear = () => {
        setResult('')
        setBonusPercentage('')
        setMarketPriceBefore('')
    }

    return (
        <Container maxW="6xl">
            <Heading as="h1">Bonus Share Adjustment Calculator</Heading>
            <HStack gap={'1rem'} alignItems={'start'} mt={'1rem'}>
                <VStack width={'100%'} spacing={4} pt={8}>
                    <FormControl id="marketPriceBefore" isRequired isInvalid={marketPriceBefore === ''}>
                        <FormLabel>Market Price (Before Book Closure):</FormLabel>
                        <Input
                            type="text"
                            value={marketPriceBefore}
                            onChange={(e) => setMarketPriceBefore(e.target.value)}
                        />
                        <FormErrorMessage>This field is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl id="bonusPercentage" isRequired isInvalid={bonusPercentage === ''}>
                        <FormLabel>% of Bonus Share:</FormLabel>
                        <Input
                            type="text"
                            value={bonusPercentage}
                            onChange={(e) => setBonusPercentage(e.target.value)}
                        />
                        <FormErrorMessage>This field is required.</FormErrorMessage>
                    </FormControl>
                    <HStack>
                        <Button onClick={clear}>
                            Clear
                        </Button>
                        <Button onClick={calculatePrice} colorScheme="blue">
                            Calculate
                        </Button>
                    </HStack>
                    {/* {result && (
                        <Box>
                            <Heading as="h2" size="lg">
                                Details:
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    Market Price (Before Book Closure): {result.userInputMarketPrice}
                                </ListItem>
                                <ListItem>% of Bonus Share: {result.userInputBonusPercentage}</ListItem>
                                <ListItem>Market Price after Right Adj: {result.marketPriceAfterAdjustment}</ListItem>
                            </UnorderedList>
                        </Box>
                    )} */}
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
                                        {result ? result.userInputMarketPrice : '-'}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        % of Bonus Share:
                                    </Td>
                                    <Td>
                                        {result ? result.userInputBonusPercentage : '-'}%
                                    </Td>

                                </Tr>
                                <Tr>
                                    <Td>
                                        Market Price After Right Adjustment:
                                    </Td>
                                    <Td>
                                        {result ? result.marketPriceAfterAdjustment : '-'}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </HStack>
        </Container>
    );
}

export default BonusShareAdj;
