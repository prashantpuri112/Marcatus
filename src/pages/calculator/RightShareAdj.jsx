import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";

function RightShareAdj() {
    const [marketPrice, setMarketPrice] = useState("");
    const [rightSharePercent, setRightSharePercent] = useState("");
    const [paidUpValue, setPaidUpValue] = useState("10");
    const [result, setResult] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Calculate market price after right adjustment
        const marketPriceNum = parseFloat(marketPrice);
        const rightSharePercentNum = parseFloat(rightSharePercent) / 100;
        const paidUpValueNum = parseInt(paidUpValue);
        const marketPriceAfterRightAdj = (marketPriceNum + (paidUpValueNum * rightSharePercentNum)) / (1 + rightSharePercentNum);

        // Display output
        setResult(
            <Box mt="4">
                <Text>Market Price (Before Book Closure): {parseInt(marketPrice).toFixed(2)}</Text>
                <Text>% of Right Share: {parseInt(rightSharePercent).toFixed(2)}%</Text>
                <Text>Paid-up Value Per Share: {parseInt(paidUpValue).toFixed(2)}</Text>
                <Text>Market Price After Right Adj: {marketPriceAfterRightAdj.toFixed(2)}</Text>
            </Box>
        );
    };

    return (
        <Box p="4">
            <form onSubmit={handleSubmit}>
                <FormControl id="marketPrice" isRequired>
                    <FormLabel>Market Price (Before Book Closure):</FormLabel>
                    <Input type="number" value={marketPrice} onChange={(event) => setMarketPrice(event.target.value)} />
                </FormControl>
                <FormControl id="rightSharePercent" isRequired>
                    <FormLabel>% of Right Share:</FormLabel>
                    <Input type="number" value={rightSharePercent} onChange={(event) => setRightSharePercent(event.target.value)} />
                </FormControl>
                <FormControl id="paidUpValue" isRequired>
                    <FormLabel>Paid-up Value Per Share:</FormLabel>
                    <Select value={paidUpValue} onChange={(event) => setPaidUpValue(event.target.value)}>
                        <option value="10">10</option>
                        <option value="100">100</option>
                    </Select>
                </FormControl>
                <Button mt="4" colorScheme="blue" type="submit">Calculate</Button>
            </form>
            {result}
        </Box>
    );
}

export default RightShareAdj;
