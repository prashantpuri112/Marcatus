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

    return (
        <Container maxW="container.md">
            <VStack spacing={4} pt={8}>
                <Heading as="h1">Bonus Share Adjustment Calculator</Heading>
                <FormControl id="marketPriceBefore" isRequired>
                    <FormLabel>Market Price (Before Book Closure):</FormLabel>
                    <Input
                        type="text"
                        value={marketPriceBefore}
                        onChange={(e) => setMarketPriceBefore(e.target.value)}
                    />
                </FormControl>
                <FormControl id="bonusPercentage" isRequired>
                    <FormLabel>% of Bonus Share:</FormLabel>
                    <Input
                        type="text"
                        value={bonusPercentage}
                        onChange={(e) => setBonusPercentage(e.target.value)}
                    />
                </FormControl>
                <Button onClick={calculatePrice} colorScheme="blue">
                    Calculate
                </Button>
                {result && (
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
                )}
            </VStack>
        </Container>
    );
}

export default BonusShareAdj;
